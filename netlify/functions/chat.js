// Netlify serverless function for AI chat
exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const body = JSON.parse(event.body);
    const { message, model, hasImages, isVisionModel } = body;

    // For now, return a simple response
    // In production, this would make actual API calls to AI providers
    const response = {
      response: "AI chat functionality is not fully configured on Netlify yet. Please use the Vercel deployment for full AI functionality.",
      model: model || 'gpt-oss-20b'
    };

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(response)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
