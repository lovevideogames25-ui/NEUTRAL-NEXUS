const https = require('https');
const http = require('http');

// Simple in-memory cache (Vercel serverless functions are stateless, so this is per-invocation)
const cache = new Map();
const CACHE_TTL = 300; // 5 minutes

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { url } = req.query;

  if (!url) {
    return res.status(400).send('URL parameter is required');
  }

  // Decode URL recursively
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

  // Skip if already a proxy URL
  if (decodedUrl.includes('/proxy?url=') || decodedUrl.includes('/resource?url=')) {
    return res.status(400).send('URL is already a proxy URL');
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

      const req = protocol.request(options, (response) => {
        let body = '';
        response.on('data', (chunk) => body += chunk);
        response.on('end', () => resolve({ status: response.statusCode, headers: response.headers, body }));
      });

      req.on('error', reject);
      req.end();
    });

    res.status(data.status);
    res.setHeader('Content-Type', data.headers['content-type'] || 'text/html');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.send(data.body);
  } catch (error) {
    res.status(500).send(`Proxy error: ${error.message}`);
  }
}
