const https = require('https');
const http = require('http');

exports.handler = async (event, context) => {
  // Handle CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: ''
    };
  }

  const { url } = event.queryStringParameters || {};

  if (!url) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: 'URL parameter is required'
    };
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
      if (decodeCount > 5) break;
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
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: 'URL is already a proxy URL'
    };
  }

  try {
    const protocol = decodedUrl.startsWith('https') ? https : http;
    const urlObj = new URL(decodedUrl);

    const data = await new Promise((resolve, reject) => {
      const options = {
        hostname: urlObj.hostname,
        port: urlObj.port || (protocol === https ? 443 : 80),
        path: urlObj.pathname + urlObj.search,
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
          'Accept-Encoding': 'gzip, deflate, br',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Sec-Fetch-Dest': 'document',
          'Sec-Fetch-Mode': 'navigate',
          'Sec-Fetch-Site': 'none',
          'Sec-Fetch-User': '?1',
          'Upgrade-Insecure-Requests': '1'
        },
        rejectUnauthorized: false,
        timeout: 30000
      };

      const req = protocol.request(options, (res) => {
        let body = '';
        
        // Handle redirects
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const redirectUrl = new URL(res.headers.location, decodedUrl).toString();
          return resolve(exports.handler({ ...event, queryStringParameters: { url: redirectUrl } }, context));
        }
        
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body }));
      });

      req.on('error', reject);
      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });
      req.end();
    });

    // Copy all relevant headers but override some for proxy functionality
    const headers = {};
    
    // Copy safe headers
    const safeHeaders = ['content-type', 'cache-control', 'expires', 'last-modified', 'etag'];
    safeHeaders.forEach(header => {
      if (data.headers[header]) {
        headers[header] = data.headers[header];
      }
    });
    
    // Add proxy-specific headers
    headers['Access-Control-Allow-Origin'] = '*';
    headers['Access-Control-Allow-Methods'] = 'GET, OPTIONS, POST, PUT, DELETE';
    headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, X-Requested-With';
    headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
    headers['X-Proxy-By'] = 'NEUTRAL-NEXUS';

    // Rewrite content to fix resource URLs
    let rewrittenBody = data.body;
    
    // Only rewrite HTML content
    if (headers['content-type'] && headers['content-type'].includes('text/html')) {
      const baseUrl = new URL(decodedUrl).origin;
      
      // Get the proxy origin from the event
      const host = event.headers.host || 'localhost:8080';
      const protocol = event.headers['x-forwarded-proto'] || 'http';
      const proxyOrigin = `${protocol}://${host}`;
      
      // Rewrite all URLs to go through proxy
      rewrittenBody = rewrittenBody.replace(
        /(href|src|action|data-src|data-href|data-url|content|url)\s*=\s*["']([^"']+)["']/g,
        (match, attr, url) => {
          // Skip data URLs, fragments, mailto, tel, javascript, and already proxied URLs
          if (url.startsWith('data:') || url.startsWith('#') || url.startsWith('mailto:') || 
              url.startsWith('tel:') || url.startsWith('javascript:') || url.includes('/proxy?url=')) {
            return match;
          }
          
          // Convert relative URLs to absolute
          let absoluteUrl = url;
          if (!url.startsWith('http://') && !url.startsWith('https://')) {
            absoluteUrl = new URL(url, baseUrl).toString();
          }
          
          // Only proxy external URLs (not same origin)
          if (absoluteUrl.startsWith(baseUrl)) {
            return match; // Keep same-origin URLs as-is
          }
          
          return `${attr}="${proxyOrigin}${proxyEndpoint}?url=${encodeURIComponent(absoluteUrl)}"`;
        }
      );
      
      // Rewrite CSS url() references
      rewrittenBody = rewrittenBody.replace(
        /url\(\s*["']?([^"')]+)["']?\s*\)/g,
        (match, url) => {
          // Skip data URLs and already proxied URLs
          if (url.startsWith('data:') || url.includes('/proxy?url=')) {
            return match;
          }
          
          // Convert relative URLs to absolute
          let absoluteUrl = url;
          if (!url.startsWith('http://') && !url.startsWith('https://')) {
            absoluteUrl = new URL(url, baseUrl).toString();
          }
          
          // Only proxy external URLs
          if (absoluteUrl.startsWith(baseUrl)) {
            return match;
          }
          
          return `url("${proxyOrigin}${proxyEndpoint}?url=${encodeURIComponent(absoluteUrl)}")`;
        }
      );
      
      // Add a script to handle dynamic requests
      rewrittenBody = rewrittenBody.replace(
        /<\/head>/,
        `<script>
          (function() {
            const originalFetch = window.fetch;
            const originalXHROpen = XMLHttpRequest.prototype.open;
            const host = "${proxyOrigin}";
            const proxyEndpoint = "${proxyEndpoint}";
            
            // Intercept fetch requests
            window.fetch = function(url, options) {
              if (url && !url.startsWith('data:') && !url.startsWith('#') && !url.includes('/proxy?url=')) {
                const absoluteUrl = url.startsWith('http') ? url : new URL(url, window.location.href).href;
                if (!absoluteUrl.startsWith("${baseUrl}")) {
                  url = host + proxyEndpoint + "?url=" + encodeURIComponent(absoluteUrl);
                }
              }
              return originalFetch.call(this, url, options);
            };
            
            // Intercept XMLHttpRequest
            XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
              if (url && !url.startsWith('data:') && !url.startsWith('#') && !url.includes('/proxy?url=')) {
                const absoluteUrl = url.startsWith('http') ? url : new URL(url, window.location.href).href;
                if (!absoluteUrl.startsWith("${baseUrl}")) {
                  url = host + proxyEndpoint + "?url=" + encodeURIComponent(absoluteUrl);
                }
              }
              return originalXHROpen.call(this, method, url, async, user, password);
            };
          })();
        </script></head>`
      );
    }

    return {
      statusCode: data.status,
      headers: headers,
      body: rewrittenBody
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: `Proxy error: ${error.message}`
    };
  }
};
