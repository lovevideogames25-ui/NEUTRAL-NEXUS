const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// HTTPS agent to handle SSL
const httpsAgent = new https.Agent({
  rejectUnauthorized: false
});

app.use(express.static('.'));

// Proxy endpoint
app.get('/proxy', async (req, res) => {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).send('URL parameter is required');
    }

    // Decode URL recursively to handle multiple encoding
    let decodedUrl = url;
    let decodeCount = 0;
    while (decodedUrl.includes('%2F') || decodedUrl.includes('%3A') || decodedUrl.includes('%3F') || decodedUrl.includes('%3D')) {
      try {
        const decoded = decodeURIComponent(decodedUrl);
        if (decoded === decodedUrl) break;
        decodedUrl = decoded;
        decodeCount++;
        if (decodeCount > 5) break; // Prevent infinite loops
      } catch (e) {
        break;
      }
    }

    // Ensure URL has a protocol
    if (!decodedUrl.startsWith('http://') && !decodedUrl.startsWith('https://')) {
      decodedUrl = 'https://' + decodedUrl;
    }

    // Skip if URL is already a proxy URL
    if (decodedUrl.includes('/proxy?url=') || decodedUrl.includes('/resource?url=')) {
      console.log('Skipping already proxied URL:', decodedUrl);
      return res.status(400).send('URL is already a proxy URL');
    }

    console.log(`Proxying: ${decodedUrl}`);

    const response = await axios.get(decodedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Cache-Control': 'max-age=0'
      },
      responseType: 'arraybuffer',
      timeout: 30000,
      httpsAgent: httpsAgent
    });

    // Strip security headers
    delete response.headers['content-security-policy'];
    delete response.headers['x-frame-options'];
    delete response.headers['x-content-type-options'];
    delete response.headers['x-xss-protection'];

    const contentType = response.headers['content-type'] || 'text/html';

    if (contentType.includes('text/html')) {
      let html = response.data.toString('utf-8');
      const $ = cheerio.load(html);

      // Remove base tag
      $('base').remove();

      // Remove CSP meta tags
      $('meta[http-equiv="Content-Security-Policy"]').remove();
      $('meta[http-equiv="X-Content-Security-Policy"]').remove();

      // Add meta tag with original URL
      $('head').append(`<meta name="proxy-original-url" content="${decodedUrl}">`);
      
      // Add meta tag to prevent caching
      $('head').append(`<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">`);
      $('head').append(`<meta http-equiv="Pragma" content="no-cache">`);
      $('head').append(`<meta http-equiv="Expires" content="0">`);

      // Rewrite inline JavaScript to replace relative URLs with absolute URLs
      $('script').each((i, elem) => {
        const scriptContent = $(elem).html();
        if (scriptContent) {
          const originalUrlObj = new URL(decodedUrl);
          const origin = originalUrlObj.origin;
          // Replace relative URLs in JavaScript code
          const rewritten = scriptContent.replace(/(['"])(\/[^'"]*?)\1/g, (match, quote, url) => {
            if (url.startsWith('//') || url.startsWith('/')) {
              return quote + origin + url + quote;
            }
            return match;
          });
          $(elem).html(rewritten);
        }
      });

      // Rewrite all links to proxy URLs
      $('a').each((i, elem) => {
        const href = $(elem).attr('href');
        if (href && !href.startsWith('#') && !href.startsWith('javascript:') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
          try {
            let absoluteUrl = href;
            if (!href.startsWith('http')) {
              absoluteUrl = new URL(href, decodedUrl).href;
            }
            // Skip if already a proxy URL
            if (!absoluteUrl.includes('/proxy?url=') && !absoluteUrl.includes('/resource?url=')) {
              $(elem).attr('href', '/proxy?url=' + encodeURIComponent(absoluteUrl));
            }
          } catch (e) {}
        }
      });

      $('img').each((i, elem) => {
        const src = $(elem).attr('src');
        if (src) {
          try {
            const absoluteUrl = src.startsWith('http') ? src : new URL(src, decodedUrl).href;
            $(elem).attr('src', '/resource?url=' + encodeURIComponent(absoluteUrl));
          } catch (e) {}
        }
      });

      $('script').each((i, elem) => {
        const src = $(elem).attr('src');
        if (src) {
          try {
            const absoluteUrl = src.startsWith('http') ? src : new URL(src, decodedUrl).href;
            $(elem).attr('src', '/resource?url=' + encodeURIComponent(absoluteUrl));
          } catch (e) {}
        }
      });

      $('link[rel="stylesheet"]').each((i, elem) => {
        const href = $(elem).attr('href');
        if (href) {
          try {
            const absoluteUrl = href.startsWith('http') ? href : new URL(href, decodedUrl).href;
            $(elem).attr('href', '/resource?url=' + encodeURIComponent(absoluteUrl));
          } catch (e) {}
        }
      });

      // Rewrite form actions to proxy URLs
      $('form').each((i, elem) => {
        const action = $(elem).attr('action');
        $(elem).attr('data-original-url', decodedUrl);
        
        let proxyAction;
        if (!action || action === '') {
          proxyAction = decodedUrl;
        } else if (!action.startsWith('http')) {
          try {
            proxyAction = new URL(action, decodedUrl).href;
          } catch (e) {
            proxyAction = decodedUrl;
          }
        } else {
          proxyAction = action;
        }
        
        console.log('Form action:', action, 'Proxy action:', proxyAction);
        
        // Don't rewrite if already a proxy URL
        if (!proxyAction.includes('/proxy?url=') && !proxyAction.includes('/resource?url=')) {
          $(elem).attr('action', '/proxy?url=' + encodeURIComponent(proxyAction));
          console.log('Rewrote form action to:', '/proxy?url=' + encodeURIComponent(proxyAction));
        }
      });

      // Inject JavaScript interception at the end of body
      const interceptionScript = `
        <script>
          console.log('Proxy JavaScript loaded');
          
          (function() {
            const PROXY_BASE = window.location.origin;
            const ORIGINAL_URL = '${decodedUrl}';

            console.log('Creating browser controls UI');
            const controls = document.createElement('div');
            controls.id = 'browser-controls';
            controls.style.cssText = \`
              position: fixed;
              bottom: 20px;
              left: 50%;
              transform: translateX(-50%);
              background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
              border: 2px solid #667eea;
              border-radius: 15px;
              padding: 15px 25px;
              display: flex;
              align-items: center;
              gap: 12px;
              z-index: 999999;
              font-family: Arial, sans-serif;
              box-shadow: 0 10px 40px rgba(102, 126, 234, 0.4), 0 0 20px rgba(102, 126, 234, 0.2);
              backdrop-filter: blur(10px);
              min-width: 600px;
            \`;

            // Add WORK IN PROGRESS label
            const wipLabel = document.createElement('span');
            wipLabel.textContent = 'WORK IN PROGRESS';
            wipLabel.style.cssText = \`
              background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
              color: white;
              padding: 5px 12px;
              border-radius: 20px;
              font-size: 11px;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 1px;
              margin-right: 10px;
            \`;
            controls.appendChild(wipLabel);

            // URL display
            const urlDisplay = document.createElement('input');
            urlDisplay.type = 'text';
            urlDisplay.value = window.location.href;
            urlDisplay.style.cssText = \`
              flex: 1;
              background: rgba(255,255,255,0.1);
              border: 1px solid rgba(102,126,234,0.3);
              border-radius: 5px;
              padding: 8px 12px;
              color: white;
              font-size: 14px;
              outline: none;
            \`;
            
            // Update URL display on navigation
            const updateUrlDisplay = () => {
              const currentUrlParams = new URLSearchParams(window.location.search);
              const currentProxiedUrl = currentUrlParams.get('url');
              if (currentProxiedUrl) {
                try {
                  urlDisplay.value = decodeURIComponent(currentProxiedUrl);
                } catch (e) {
                  urlDisplay.value = window.location.href;
                }
              } else {
                urlDisplay.value = window.location.href;
              }
            };
            
            updateUrlDisplay();
            window.addEventListener('popstate', updateUrlDisplay);
            
            urlDisplay.addEventListener('keypress', (e) => {
              if (e.key === 'Enter') {
                let url = urlDisplay.value;
                if (!url.startsWith('http')) {
                  url = 'https://' + url;
                }
                window.location.href = PROXY_BASE + '/proxy?url=' + encodeURIComponent(url);
              }
            });

            // Button style
            const btnStyle = \`
              background: linear-gradient(135deg, #667eea 0%, #f093fb 100%);
              border: none;
              border-radius: 8px;
              padding: 10px 18px;
              color: white;
              font-size: 13px;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.2s ease;
              white-space: nowrap;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            \`;

            // Hover effect for buttons
            const btnHoverStyle = \`
              background: linear-gradient(135deg, #7690eb 0%, #f0a4fc 100%);
              transform: translateY(-2px);
              box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
            \`;

            // Back button
            const backBtn = document.createElement('button');
            backBtn.innerHTML = '← Back';
            backBtn.style.cssText = btnStyle;
            backBtn.onmouseover = () => backBtn.style.cssText = btnStyle + btnHoverStyle;
            backBtn.onmouseout = () => backBtn.style.cssText = btnStyle;
            backBtn.onclick = () => window.history.back();

            // Forward button
            const forwardBtn = document.createElement('button');
            forwardBtn.innerHTML = 'Forward →';
            forwardBtn.style.cssText = btnStyle;
            forwardBtn.onmouseover = () => forwardBtn.style.cssText = btnStyle + btnHoverStyle;
            forwardBtn.onmouseout = () => forwardBtn.style.cssText = btnStyle;
            forwardBtn.onclick = () => window.history.forward();

            // Refresh button
            const refreshBtn = document.createElement('button');
            refreshBtn.innerHTML = '↻ Refresh';
            refreshBtn.style.cssText = btnStyle;
            refreshBtn.onmouseover = () => refreshBtn.style.cssText = btnStyle + btnHoverStyle;
            refreshBtn.onmouseout = () => refreshBtn.style.cssText = btnStyle;
            refreshBtn.onclick = () => window.location.reload();

            // Home button
            const homeBtn = document.createElement('button');
            homeBtn.innerHTML = '⌂ Home';
            homeBtn.style.cssText = btnStyle;
            homeBtn.onmouseover = () => homeBtn.style.cssText = btnStyle + btnHoverStyle;
            homeBtn.onmouseout = () => homeBtn.style.cssText = btnStyle;
            homeBtn.onclick = () => window.location.href = PROXY_BASE + '/proxy?url=' + encodeURIComponent('https://search.brave.com');

            controls.appendChild(backBtn);
            controls.appendChild(forwardBtn);
            controls.appendChild(refreshBtn);
            controls.appendChild(urlDisplay);
            controls.appendChild(homeBtn);

            document.body.appendChild(controls);
            console.log('Browser controls appended to body');

            // Add padding to body to prevent content from being hidden
            document.body.style.paddingBottom = '100px';
            console.log('Browser controls initialized successfully');

            // Override window.location to catch JavaScript navigation
            const originalLocation = window.location;
            const locationProxy = new Proxy(originalLocation, {
              set: function(target, prop, value) {
                if (prop === 'href' && typeof value === 'string') {
                  // Skip if already a proxy URL
                  if (value.includes('/proxy?url=') || value.includes('/resource?url=')) {
                    return Reflect.set(target, prop, value);
                  }
                  // Skip if it's a javascript: or mailto: link
                  if (value.startsWith('javascript:') || value.startsWith('mailto:') || value.startsWith('tel:')) {
                    return Reflect.set(target, prop, value);
                  }
                  // Proxy the navigation
                  console.log('Intercepting window.location.href set to:', value);
                  const proxyUrl = PROXY_BASE + '/proxy?url=' + encodeURIComponent(value);
                  console.log('Redirecting to:', proxyUrl);
                  window.location.href = proxyUrl;
                  return true;
                }
                return Reflect.set(target, prop, value);
              }
            });
            
            // Override location.assign
            const originalAssign = window.location.assign.bind(window.location);
            window.location.assign = function(url) {
              if (typeof url === 'string' && !url.includes('/proxy?url=') && !url.includes('/resource?url=')) {
                if (!url.startsWith('javascript:') && !url.startsWith('mailto:') && !url.startsWith('tel:')) {
                  console.log('Intercepting location.assign to:', url);
                  const proxyUrl = PROXY_BASE + '/proxy?url=' + encodeURIComponent(url);
                  console.log('Redirecting to:', proxyUrl);
                  window.location.href = proxyUrl;
                  return;
                }
              }
              return originalAssign(url);
            };
            
            // Override location.replace
            const originalReplace = window.location.replace.bind(window.location);
            window.location.replace = function(url) {
              if (typeof url === 'string' && !url.includes('/proxy?url=') && !url.includes('/resource?url=')) {
                if (!url.startsWith('javascript:') && !url.startsWith('mailto:') && !url.startsWith('tel:')) {
                  console.log('Intercepting location.replace to:', url);
                  const proxyUrl = PROXY_BASE + '/proxy?url=' + encodeURIComponent(url);
                  console.log('Redirecting to:', proxyUrl);
                  window.location.href = proxyUrl;
                  return;
                }
              }
              return originalReplace(url);
            };
            
            // Override History API
            const originalPushState = history.pushState.bind(history);
            history.pushState = function(state, title, url) {
              if (url && typeof url === 'string' && !url.includes('/proxy?url=') && !url.includes('/resource?url=')) {
                if (!url.startsWith('javascript:') && !url.startsWith('mailto:') && !url.startsWith('tel:')) {
                  console.log('Intercepting history.pushState to:', url);
                  const proxyUrl = PROXY_BASE + '/proxy?url=' + encodeURIComponent(url);
                  console.log('Redirecting to:', proxyUrl);
                  window.location.href = proxyUrl;
                  return;
                }
              }
              return originalPushState(state, title, url);
            };
            
            // Continuous monitoring to catch any escaped navigation
            setInterval(() => {
              const currentUrl = window.location.href;
              if (!currentUrl.includes('/proxy?url=') && !currentUrl.includes('/resource?url=')) {
                if (!currentUrl.startsWith('javascript:') && !currentUrl.startsWith('mailto:') && !currentUrl.startsWith('tel:')) {
                  console.log('Detected escaped navigation to:', currentUrl);
                  const proxyUrl = PROXY_BASE + '/proxy?url=' + encodeURIComponent(currentUrl);
                  console.log('Redirecting to:', proxyUrl);
                  window.location.href = proxyUrl;
                }
              }
            }, 100);

            // Override fetch
            const originalFetch = window.fetch;
            window.fetch = function(input, init) {
              let url = input;
              if (typeof input === 'string') {
                url = input;
              } else if (input instanceof Request) {
                url = input.url;
              } else if (input && input.url) {
                url = input.url;
              } else {
                return originalFetch(input, init);
              }

              console.log('Fetch called with URL:', url);

              // Handle relative URLs - resolve against ORIGINAL_URL, not current page
              if (url && typeof url === 'string' && !url.startsWith('http://') && !url.startsWith('https://')) {
                try {
                  url = new URL(url, ORIGINAL_URL).href;
                  console.log('Resolved relative URL to:', url);
                } catch (e) {
                  console.log('Failed to resolve URL:', e);
                }
              }

              // Proxy same-origin requests
              if (url && typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://'))) {
                try {
                  const urlObj = new URL(url);
                  const originalUrlObj = new URL(ORIGINAL_URL);
                  console.log('Fetch URL origin:', urlObj.origin, 'Original origin:', originalUrlObj.origin);
                  
                  if (urlObj.origin === originalUrlObj.origin) {
                    if (url.includes('/resource?url=') || url.includes('/proxy?url=')) {
                      console.log('URL is already proxied, skipping');
                      return originalFetch(input, init);
                    }
                    const proxyUrl = PROXY_BASE + '/resource?url=' + encodeURIComponent(url);
                    console.log('Proxied fetch URL:', proxyUrl);
                    if (typeof input === 'string') {
                      return originalFetch(proxyUrl, init);
                    } else if (input instanceof Request) {
                      const newRequest = new Request(proxyUrl, input);
                      return originalFetch(newRequest, init);
                    } else {
                      return originalFetch(proxyUrl, init);
                    }
                  }
                } catch (e) {
                  console.log('Error in fetch interception:', e);
                }
              }
              return originalFetch(input, init);
            };

            // Override XMLHttpRequest
            const originalOpen = XMLHttpRequest.prototype.open;
            XMLHttpRequest.prototype.open = function(method, url) {
              if (url && typeof url === 'string' && !url.startsWith('http://') && !url.startsWith('https://')) {
                url = new URL(url, ORIGINAL_URL).href;
              }

              if (url && typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://'))) {
                try {
                  const urlObj = new URL(url);
                  const originalUrlObj = new URL(ORIGINAL_URL);
                  if (urlObj.origin === originalUrlObj.origin) {
                    if (url.includes('/resource?url=') || url.includes('/proxy?url=')) {
                      return originalOpen.call(this, method, url);
                    }
                    url = PROXY_BASE + '/resource?url=' + encodeURIComponent(url);
                  }
                } catch (e) {}
              }
              return originalOpen.call(this, method, url);
            };

            // Intercept link clicks
            document.addEventListener('click', function(e) {
              const link = e.target.closest('a');
              if (link && link.href) {
                e.preventDefault();
                let targetUrl = link.href;
                console.log('Link clicked:', targetUrl);
                
                // Skip if already a proxy URL
                if (targetUrl.includes('/proxy?url=') || targetUrl.includes('/resource?url=')) {
                  console.log('Already a proxy URL, opening directly');
                  window.location.href = targetUrl;
                  return;
                }
                
                // Skip if it's a javascript: or mailto: link
                if (targetUrl.startsWith('javascript:') || targetUrl.startsWith('mailto:') || targetUrl.startsWith('tel:')) {
                  console.log('Special link, opening directly');
                  window.location.href = targetUrl;
                  return;
                }
                
                // Resolve relative URLs against current page
                if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
                  try {
                    const currentUrlParams = new URLSearchParams(window.location.search);
                    const currentProxiedUrl = currentUrlParams.get('url');
                    if (currentProxiedUrl) {
                      try {
                        const currentOriginalUrl = decodeURIComponent(currentProxiedUrl);
                        targetUrl = new URL(targetUrl, currentOriginalUrl).href;
                        console.log('Resolved to:', targetUrl);
                      } catch (e) {
                        targetUrl = new URL(targetUrl, ORIGINAL_URL).href;
                        console.log('Resolved to (using ORIGINAL_URL):', targetUrl);
                      }
                    } else {
                      targetUrl = new URL(targetUrl, ORIGINAL_URL).href;
                      console.log('Resolved to (using ORIGINAL_URL):', targetUrl);
                    }
                  } catch (e) {
                    console.log('Failed to resolve URL:', e);
                  }
                }
                
                // Always proxy the navigation
                console.log('Proxying navigation to:', targetUrl);
                window.location.href = PROXY_BASE + '/proxy?url=' + encodeURIComponent(targetUrl);
              }
            });

            // Intercept form submissions
            document.addEventListener('submit', function(e) {
              const form = e.target;
              console.log('Form submitted:', form.tagName, form.action);
              
              if (form.tagName === 'FORM') {
                // Get current page's original URL from current proxy URL
                let currentOriginalUrl = ORIGINAL_URL;
                const currentUrlParams = new URLSearchParams(window.location.search);
                const currentProxiedUrl = currentUrlParams.get('url');
                if (currentProxiedUrl) {
                  try {
                    currentOriginalUrl = decodeURIComponent(currentProxiedUrl);
                  } catch (e) {}
                }
                
                console.log('Current original URL:', currentOriginalUrl);
                console.log('window.location.href:', window.location.href);
                
                // Only intercept forms from the proxied site
                if (currentOriginalUrl && !currentOriginalUrl.includes(window.location.origin)) {
                  console.log('Intercepting form submission');
                  e.preventDefault();
                  
                  const formData = new FormData(form);
                  const params = new URLSearchParams(formData);
                  let action = form.action;
                  
                  console.log('Form action before resolution:', action);
                  
                  // Resolve action against current original URL
                  if (!action || action === '' || action === window.location.href || action.includes('localhost:3000')) {
                    action = currentOriginalUrl;
                    console.log('Using current original URL as action');
                  } else if (!action.startsWith('http')) {
                    try {
                      action = new URL(action, currentOriginalUrl).href;
                      console.log('Resolved action:', action);
                    } catch (e) {
                      action = currentOriginalUrl;
                      console.log('Failed to resolve, using current original URL');
                    }
                  }
                  
                  // Don't proxy if action is already a proxy URL
                  if (action.includes('/proxy?url=') || action.includes('/resource?url=')) {
                    console.log('Action is already a proxy URL, skipping');
                    return;
                  }
                  
                  // Construct the full URL
                  const fullUrl = action + (action.includes('?') ? '&' : '?') + params.toString();
                  
                  console.log('Form submission:', fullUrl);
                  
                  // Navigate to the proxy URL
                  window.location.href = PROXY_BASE + '/proxy?url=' + encodeURIComponent(fullUrl);
                } else {
                  console.log('Not intercepting form - currentOriginalUrl is:', currentOriginalUrl);
                }
              }
            });
          })();
        </script>
      `;
      $('body').append(interceptionScript);

      res.set('Content-Type', 'text/html; charset=utf-8');
      res.set('Access-Control-Allow-Origin', '*');
      res.send($.html());
    } else {
      res.set('Content-Type', contentType);
      res.set('Access-Control-Allow-Origin', '*');
      res.send(response.data);
    }
  } catch (error) {
    console.error('Proxy error:', error.message);
    res.status(500).send(`Proxy error: ${error.message}`);
  }
});

// Resource proxy endpoint
app.get('/resource', async (req, res) => {
  try {
    let { url } = req.query;

    if (!url) {
      return res.status(400).send('URL parameter is required');
    }

    // Decode URL recursively to handle multiple encoding
    while (url.includes('%2F') || url.includes('%3A') || url.includes('%3F') || url.includes('%3D')) {
      try {
        const decoded = decodeURIComponent(url);
        if (decoded === url) break;
        url = decoded;
      } catch (e) {
        break;
      }
    }

    // Skip if still a proxy URL
    if (url.includes('/resource?url=') || url.includes('/proxy?url=')) {
      return res.status(400).send('URL is already a proxy URL');
    }

    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Referer': url
      },
      responseType: 'arraybuffer',
      timeout: 30000,
      httpsAgent: httpsAgent
    });

    // Strip security headers
    delete response.headers['content-security-policy'];
    delete response.headers['x-frame-options'];
    delete response.headers['x-content-type-options'];
    delete response.headers['x-xss-protection'];

    const contentType = response.headers['content-type'] || 'application/octet-stream';

    // Rewrite CSS URLs to proxy URLs
    if (contentType.includes('text/css')) {
      let css = response.data.toString('utf-8');
      css = css.replace(/url\(['"]?([^'")]+)['"]?\)/g, (match, resourceUrl) => {
        if (resourceUrl.startsWith('data:')) {
          return match;
        }
        try {
          const absoluteUrl = resourceUrl.startsWith('http') ? resourceUrl : new URL(resourceUrl, url).href;
          return `url("/resource?url=${encodeURIComponent(absoluteUrl)}")`;
        } catch (e) {
          return match;
        }
      });
      res.set('Content-Type', contentType);
      res.set('Access-Control-Allow-Origin', '*');
      res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.send(css);
    } else {
      res.set('Content-Type', contentType);
      res.set('Access-Control-Allow-Origin', '*');
      res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.send(response.data);
    }
  } catch (error) {
    console.error('Resource error:', error.message);
    res.status(500).send(`Resource error: ${error.message}`);
  }
});

// Handle /search requests and redirect to proxy
app.get('/search', (req, res) => {
  const query = req.query.q || '';
  const source = req.query.source || 'web';
  const proxyUrl = `http://localhost:3000/proxy?url=https://search.brave.com/search?q=${encodeURIComponent(query)}&source=${source}`;
  console.log('Redirecting /search to:', proxyUrl);
  res.redirect(proxyUrl);
});

// YouTube Data API endpoint - free music with full playback via video embeds
app.get('/api/youtube/tracks', async (req, res) => {
  console.log('🎵 YouTube API endpoint called:', req.url);
  try {
    const envPath = path.join(__dirname, '.env');
    const envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';
    const envVars = {};
    
    if (envContent) {
      envContent.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0) {
          envVars[key.trim()] = valueParts.join('=').trim();
        }
      });
    }
    
    const apiKey = envVars.YOUTUBE_API_KEY;
    const apiKey2 = envVars.YOUTUBE_API_KEY_2;
    
    console.log('🎵 YouTube API key exists:', !!apiKey);
    
    if (!apiKey || apiKey === 'your_youtube_api_key_here') {
      console.log('🎵 YouTube API key not configured');
      return res.status(400).json({ error: 'YouTube API key not configured' });
    }
    
    // Get search query from request or use default
    const searchQuery = req.query.q || 'topic';
    console.log('🎵 Search query:', searchQuery);
    
    // Try first API key
    let searchResponse = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchQuery)}&type=video&videoCategoryId=10&maxResults=50&key=${apiKey}`);
    let searchData = await searchResponse.json();
    
    console.log('🎵 YouTube API response status:', searchResponse.status);
    
    // If first key has quota exceeded, try second key
    if (searchData.error && searchData.error.code === 403 && apiKey2 && apiKey2 !== 'your_youtube_api_key_2_here') {
      console.log('🔄 YouTube API key 1 quota exceeded, trying key 2...');
      searchResponse = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchQuery)}&type=video&videoCategoryId=10&maxResults=50&key=${apiKey2}`);
      searchData = await searchResponse.json();
    }
    
    // Check if API returned an error (e.g., quota exceeded)
    if (searchData.error) {
      console.error('🛑ERROR: YouTube API error:', searchData.error);
      if (searchData.error.code === 403) {
        return res.status(429).json({ 
          error: 'YouTube API quota exceeded. Please try again later or use a different API key.',
          quotaExceeded: true
        });
      }
      return res.status(500).json({ error: searchData.error.message || 'YouTube API error' });
    }
    
    // Check if API returned valid data
    if (!searchData.items || !Array.isArray(searchData.items)) {
      console.error('🛑ERROR: YouTube API returned invalid response:', searchData);
      return res.status(500).json({ error: 'Invalid API response from YouTube' });
    }
    
    console.log('🎵 Total items:', searchData.items.length);
    
    // Log first few channel titles for debugging
    console.log('🎵 Sample channel titles:', searchData.items.slice(0, 5).map(item => item.snippet.channelTitle));
    
    // Filter to only show - Topic channels (official music distribution)
    const topicTracks = searchData.items.filter(item => 
      item.snippet.channelTitle && item.snippet.channelTitle.includes('- Topic')
    );
    
    console.log('🎵 Topic tracks after filter:', topicTracks.length);
    
    // If no - Topic tracks found, return empty array
    if (topicTracks.length === 0) {
      console.log('🎵 No - Topic tracks found, returning empty array');
      return res.json({ tracks: [] });
    }
    
    const tracks = topicTracks.map(item => ({
      id: item.id.videoId,
      title: item.snippet.title,
      artist: item.snippet.channelTitle.replace(' - Topic', ''),
      album: 'Official Audio',
      imageUrl: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
      previewUrl: null, // YouTube uses embeds, not audio URLs
      spotifyUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`
    }));
    
    console.log('🎵 Returning tracks:', tracks.length);
    res.json({ tracks });
    
  } catch (error) {
    console.error('🛑ERROR: YouTube tracks error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// TMDB API endpoint - fetch popular and new movies
app.get('/api/tmdb/movies', async (req, res) => {
  console.log('🎬 TMDB API endpoint called:', req.url);
  try {
    const envPath = path.join(__dirname, '.env');
    const envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';
    const envVars = {};
    
    if (envContent) {
      envContent.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0) {
          envVars[key.trim()] = valueParts.join('=').trim();
        }
      });
    }
    
    const apiKey = envVars.THE_MOVIE_DATABASE_API;
    
    console.log('🎬 TMDB API key exists:', !!apiKey);
    
    if (!apiKey || apiKey === 'your_tmdb_api_key_here') {
      console.log('🎬 TMDB API key not configured');
      return res.status(400).json({ error: 'TMDB API key not configured' });
    }
    
    const type = req.query.type || 'popular'; // popular, now_playing, top_rated
    const searchQuery = req.query.q || '';
    
    console.log('🎬 Movie type:', type);
    console.log('🎬 Search query:', searchQuery);
    
    let apiUrl;
    if (searchQuery) {
      apiUrl = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchQuery)}&api_key=${apiKey}`;
    } else if (type === 'now_playing') {
      apiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;
    } else if (type === 'top_rated') {
      apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`;
    } else {
      apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
    }
    
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    console.log('🎬 TMDB API response status:', response.status);
    
    if (data.error) {
      console.error('🛑ERROR: TMDB API error:', data.error);
      return res.status(500).json({ error: data.error.message || 'TMDB API error' });
    }
    
    const movies = data.results.map(item => ({
      id: item.id,
      title: item.title,
      releaseDate: item.release_date,
      rating: item.vote_average,
      posterPath: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : null,
      overview: item.overview
    }));
    
    res.json({ movies });
  } catch (error) {
    console.error('🛑ERROR: TMDB API fetch error:', error);
    res.status(500).json({ error: error.message });
  }
});

// TMDB TV API endpoint - fetch popular TV shows
app.get('/api/tmdb/tv', async (req, res) => {
  console.log('📺 TMDB TV API endpoint called:', req.url);
  try {
    const envPath = path.join(__dirname, '.env');
    const envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';
    const envVars = {};
    
    if (envContent) {
      envContent.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0) {
          envVars[key.trim()] = valueParts.join('=').trim();
        }
      });
    }
    
    const apiKey = envVars.THE_MOVIE_DATABASE_API;
    
    console.log('📺 TMDB API key exists:', !!apiKey);
    
    if (!apiKey || apiKey === 'your_tmdb_api_key_here') {
      console.log('📺 TMDB API key not configured');
      return res.status(400).json({ error: 'TMDB API key not configured' });
    }
    
    const type = req.query.type || 'popular'; // popular, top_rated, airing_today
    const searchQuery = req.query.q || '';
    
    console.log('📺 TV type:', type);
    console.log('📺 Search query:', searchQuery);
    
    let apiUrl;
    if (searchQuery) {
      apiUrl = `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(searchQuery)}&api_key=${apiKey}`;
    } else if (type === 'top_rated') {
      apiUrl = `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}`;
    } else if (type === 'airing_today') {
      apiUrl = `https://api.themoviedb.org/3/tv/airing_today?api_key=${apiKey}`;
    } else {
      apiUrl = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`;
    }
    
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    console.log('📺 TMDB TV API response status:', response.status);
    
    if (data.error) {
      console.error('🛑ERROR: TMDB TV API error:', data.error);
      return res.status(500).json({ error: data.error.message || 'TMDB TV API error' });
    }
    
    const shows = data.results.map(item => ({
      id: item.id,
      title: item.name,
      releaseDate: item.first_air_date,
      rating: item.vote_average,
      posterPath: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : null,
      overview: item.overview
    }));
    
    res.json({ shows });
  } catch (error) {
    console.error('🛑ERROR: TMDB TV API fetch error:', error);
    res.status(500).json({ error: error.message });
  }
});

// TMDB TV Details API endpoint - fetch seasons and episodes for a TV show
app.get('/api/tmdb/tv/details', async (req, res) => {
  console.log('📺 TMDB TV Details API endpoint called:', req.url);
  try {
    const envPath = path.join(__dirname, '.env');
    const envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';
    const envVars = {};
    
    if (envContent) {
      envContent.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0) {
          envVars[key.trim()] = valueParts.join('=').trim();
        }
      });
    }
    
    const apiKey = envVars.THE_MOVIE_DATABASE_API;
    
    console.log('📺 TMDB API key exists:', !!apiKey);
    
    if (!apiKey || apiKey === 'your_tmdb_api_key_here') {
      console.log('📺 TMDB API key not configured');
      return res.status(400).json({ error: 'TMDB API key not configured' });
    }
    
    const tvId = req.query.id;
    
    if (!tvId) {
      return res.status(400).json({ error: 'TV ID is required' });
    }
    
    console.log('📺 TV ID:', tvId);
    
    const apiUrl = `https://api.themoviedb.org/3/tv/${tvId}?api_key=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    console.log('📺 TMDB TV Details API response status:', response.status);
    
    if (data.error) {
      console.error('🛑ERROR: TMDB TV Details API error:', data.error);
      return res.status(500).json({ error: data.error.message || 'TMDB TV Details API error' });
    }
    
    const seasons = data.seasons ? data.seasons.map(season => ({
      season_number: season.season_number,
      name: season.name,
      episode_count: season.episode_count,
      overview: season.overview
    })) : [];
    
    res.json({ seasons });
  } catch (error) {
    console.error('🛑ERROR: TMDB TV Details API fetch error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Generic catch-all route
app.get('*', async (req, res) => {
  try {
    const originalUrl = req.query.origin || req.headers.referer;
    
    if (!originalUrl) {
      console.log('No origin found for:', req.path);
      return res.status(404).send('No origin found');
    }

    // Extract origin from referer if needed
    let baseUrl = originalUrl;
    if (originalUrl.includes('/proxy?url=')) {
      const urlMatch = originalUrl.match(/url=([^&]+)/);
      if (urlMatch) {
        try {
          baseUrl = decodeURIComponent(urlMatch[1]);
        } catch (e) {
          console.log('Failed to decode URL:', urlMatch[1]);
          return res.status(400).send('Invalid URL encoding');
        }
      }
    }

    // Check meta tag in proxied page
    const metaUrlMatch = originalUrl.match(/proxy-original-url" content="([^"]+)"/);
    if (metaUrlMatch) {
      baseUrl = metaUrlMatch[1];
    }

    // Ensure baseUrl is a valid URL
    if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
      baseUrl = 'https://' + baseUrl;
    }

    const targetUrl = new URL(req.path, baseUrl).href;
    console.log('Generic catch-all proxying:', targetUrl);

    const response = await axios.get(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      responseType: 'arraybuffer',
      timeout: 30000,
      httpsAgent: httpsAgent
    });

    const contentType = response.headers['content-type'] || 'application/octet-stream';
    res.set('Content-Type', contentType);
    res.set('Access-Control-Allow-Origin', '*');
    res.send(response.data);
  } catch (error) {
    console.error('Catch-all error:', error.message);
    console.error('Request path:', req.path);
    console.error('Referer:', req.headers.referer);
    res.status(404).send('Resource not found');
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
  console.log(`Proxy: http://localhost:${PORT}/proxy?url=<URL>`);
  console.log(`Resource: http://localhost:${PORT}/resource?url=<URL>`);
});
