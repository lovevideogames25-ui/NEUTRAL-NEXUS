// Vercel serverless function for AI chat API
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, model } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Get API keys from environment variables
    const apiKeys = {
      API: process.env.API,
      API2: process.env.API2,
      API3: process.env.API3,
      API4: process.env.API4
    };

    // Check if we have any API keys
    const hasApiKeys = Object.values(apiKeys).some(key => key);
    if (!hasApiKeys) {
      return res.status(500).json({ 
        error: 'No API keys configured. Please set environment variables in Vercel dashboard.',
        setup: 'Run vercel_deployment.bat to configure environment variables'
      });
    }

    // Try OpenRouter first
    if (apiKeys.API) {
      try {
        const response = await callOpenRouter(message, model, apiKeys.API);
        return res.status(200).json(response);
      } catch (error) {
        console.log('OpenRouter failed:', error.message);
      }
    }

    // Try HuggingFace
    if (apiKeys.API2) {
      try {
        const response = await callHuggingFace(message, model, apiKeys.API2);
        return res.status(200).json(response);
      } catch (error) {
        console.log('HuggingFace failed:', error.message);
      }
    }

    // Try Replicate
    if (apiKeys.API3) {
      try {
        const response = await callReplicate(message, model, apiKeys.API3);
        return res.status(200).json(response);
      } catch (error) {
        console.log('Replicate failed:', error.message);
      }
    }

    // Try LockLLM
    if (apiKeys.API4) {
      try {
        const response = await callLockLLM(message, model, apiKeys.API4);
        return res.status(200).json(response);
      } catch (error) {
        console.log('LockLLM failed:', error.message);
      }
    }

    return res.status(500).json({ 
      error: 'All AI services failed',
      message: 'Please check your API keys and try again'
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message
    });
  }
}

async function callOpenRouter(message, model, apiKey) {
  const modelMap = {
    'auto': 'openai/gpt-oss-20b:free',
    'gpt-oss-20b': 'openai/gpt-oss-20b:free',
    'gpt-oss-120b': 'openai/gpt-oss-120b:groq',
    'gemma-3-4b': 'google/gemma-3-4b-it:free',
    'gemma-3-12b': 'google/gemma-3-12b-it:free',
    'gemma-3-27b': 'google/gemma-3-27b-it:free',
    'claude-opus-4': 'anthropic/claude-opus-4'
  };

  const selectedModel = modelMap[model] || modelMap['auto'];

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://ultimateunblocker.vercel.app',
      'X-Title': 'ULTIMATEUNBLOCKER'
    },
    body: JSON.stringify({
      model: selectedModel,
      messages: [
        {
          role: 'system',
          content: 'You are an expert AI assistant. Provide clear, accurate, and comprehensive answers.'
        },
        {
          role: 'user',
          content: message
        }
      ],
      max_tokens: 1000,
      temperature: 0.7
    })
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`OpenRouter Error: ${response.status} - ${errorData}`);
  }

  const data = await response.json();
  const aiMessage = data.choices?.[0]?.message?.content || '';
  
  return { response: aiMessage, api: 'OpenRouter' };
}

async function callHuggingFace(message, model, apiKey) {
  const modelMap = {
    'auto': 'google/gemma-3-27b-it',
    'gpt-oss-20b': 'google/gemma-3-27b-it',
    'gpt-oss-120b': 'google/gemma-3-27b-it',
    'gemma-3-4b': 'google/gemma-3-4b-it',
    'gemma-3-12b': 'google/gemma-3-12b-it',
    'gemma-3-27b': 'google/gemma-3-27b-it'
  };

  const selectedModel = modelMap[model] || modelMap['auto'];

  const response = await fetch('https://router.huggingface.co/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: selectedModel,
      messages: [
        {
          role: 'user',
          content: message
        }
      ],
      max_tokens: 1000,
      temperature: 0.7
    })
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`HuggingFace Error: ${response.status} - ${errorData}`);
  }

  const data = await response.json();
  const aiMessage = data.choices?.[0]?.message?.content || '';
  
  return { response: aiMessage, api: 'HuggingFace' };
}

async function callReplicate(message, model, apiKey) {
  const modelMap = {
    'auto': 'google-deepmind/gemma-3-27b-it:c0f0aebe8e578c15a7531e08a62cf01206f5870e9d0a67804b8152822db58c54',
    'gpt-oss-20b': 'openai/gpt-oss-20b',
    'gpt-oss-120b': 'openai/gpt-oss-120b',
    'gemma-3-4b': 'google-deepmind/gemma-3-4b-it:00139d2960396352b671f7b5c2ece5313bf6d45fe0a052efe14f023d2a81e196',
    'gemma-3-12b': 'google-deepmind/gemma-3-12b-it:5a0df3fa58c87fbd925469a673fdb16f3dd08e6f4e2f1a010970f07b7067a81c',
    'gemma-3-27b': 'google-deepmind/gemma-3-27b-it:c0f0aebe8e578c15a7531e08a62cf01206f5870e9d0a67804b8152822db58c54'
  };

  const selectedModel = modelMap[model] || modelMap['auto'];

  const response = await fetch('https://api.replicate.com/v1/predictions', {
    method: 'POST',
    headers: {
      'Authorization': `Token ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      version: selectedModel,
      input: {
        prompt: message,
        max_tokens: 1000,
        temperature: 0.7
      }
    })
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Replicate Error: ${response.status} - ${errorData}`);
  }

  const data = await response.json();
  
  // Handle Replicate response format
  let aiMessage = '';
  if (data.output) {
    aiMessage = Array.isArray(data.output) ? data.output.join('') : data.output;
  }

  if (!aiMessage) {
    throw new Error('Replicate API returned empty response');
  }
  
  return { response: aiMessage, api: 'Replicate' };
}

async function callLockLLM(message, model, apiKey) {
  const modelMap = {
    'auto': 'openai/gpt-oss-20b:free',
    'gpt-oss-20b': 'openai/gpt-oss-20b:free',
    'gpt-oss-120b': 'openai/gpt-oss-120b:groq',
    'gemma-3-4b': 'google/gemma-3-4b-it:free',
    'gemma-3-12b': 'google/gemma-3-12b-it:free',
    'gemma-3-27b': 'google/gemma-3-27b-it:free',
    'claude-opus-4': 'anthropic/claude-opus-4'
  };

  const selectedModel = modelMap[model] || modelMap['auto'];

  const response = await fetch('https://api.lockllm.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: selectedModel,
      messages: [
        {
          role: 'system',
          content: 'You are an expert AI assistant. Provide clear, accurate, and comprehensive answers.'
        },
        {
          role: 'user',
          content: message
        }
      ],
      max_tokens: 1000,
      temperature: 0.7
    })
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`LockLLM Error: ${response.status} - ${errorData}`);
  }

  const data = await response.json();
  const aiMessage = data.choices?.[0]?.message?.content || '';
  
  return { response: aiMessage, api: 'LockLLM' };
}
