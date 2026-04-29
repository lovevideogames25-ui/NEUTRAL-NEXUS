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
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        },
        rejectUnauthorized: false
      };

      const req = protocol.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body }));
      });

      req.on('error', reject);
      req.end();
    });

    return {
      statusCode: data.status,
      headers: {
        'Content-Type': data.headers['content-type'] || 'text/html',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      },
      body: data.body
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
