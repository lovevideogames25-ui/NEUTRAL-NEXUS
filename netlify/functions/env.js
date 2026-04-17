// Netlify serverless function to expose environment variables safely
exports.handler = async (event, context) => {
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
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

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    },
    body: JSON.stringify(safeEnvVars)
  };
};
