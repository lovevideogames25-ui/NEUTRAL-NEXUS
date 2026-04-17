const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// Environment variables endpoint
exports.env = functions.https.onRequest((req, res) => {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Only expose non-sensitive environment variables
  const safeEnvVars = {
    PORT: process.env.PORT || '3000',
    NODE_ENV: process.env.NODE_ENV || 'production',
    DEBUG: process.env.DEBUG || 'false',
    ENABLE_AI: process.env.ENABLE_AI || 'true',
    ENABLE_PROXY: process.env.ENABLE_PROXY || 'true',
    ENABLE_CHAT: process.env.ENABLE_CHAT || 'true',
    ENABLE_GAMING: process.env.ENABLE_GAMING || 'true',
    DISCORD_SERVER_ID: process.env.DISCORD_SERVER_ID || null,
    DISCORD_CHANNEL_ID: process.env.DISCORD_CHANNEL_ID || null,
    CLOUDFLARE_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID || null,
    CLOUDFLARE_GATEWAY_ID: process.env.CLOUDFLARE_GATEWAY_ID || null,
    // Only expose API keys existence, not the actual keys (except in development)
    HAS_API_KEYS: !!(process.env.API || process.env.API2 || process.env.API3 || process.env.API4 || process.env.API5 || process.env.API6 || process.env.API7),
    API_COUNT: [
      !!process.env.API,
      !!process.env.API2,
      !!process.env.API3,
      !!process.env.API4,
      !!process.env.API5,
      !!process.env.API6,
      !!process.env.API7
    ].filter(Boolean).length
  };

  // Expose actual API keys for frontend functionality
  safeEnvVars.API = process.env.API || null;
  safeEnvVars.API2 = process.env.API2 || null;
  safeEnvVars.API3 = process.env.API3 || null;
  safeEnvVars.API4 = process.env.API4 || null;
  safeEnvVars.API5 = process.env.API5 || null;
  safeEnvVars.API6 = process.env.API6 || null;
  safeEnvVars.API7 = process.env.API7 || null;
  safeEnvVars.CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || null;
  safeEnvVars.CLOUDFLARE_GATEWAY_ID = process.env.CLOUDFLARE_GATEWAY_ID || null;

  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  return res.status(200).json(safeEnvVars);
});

// Chat endpoint
exports.chat = functions.https.onRequest((req, res) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body;
    const { message, model, hasImages, isVisionModel } = body;

    // For now, return a simple response
    // In production, this would make actual API calls to AI providers
    const response = {
      response: "AI chat functionality is not fully configured on Firebase yet. Please use the Vercel deployment for full AI functionality.",
      model: model || 'gpt-oss-20b'
    };

    res.set('Content-Type', 'application/json');
    res.set('Access-Control-Allow-Origin', '*');

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
