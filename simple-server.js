const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const { spawn } = require('child_process');

const app = express();
const PORT = 3000;

// Enable CORS
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'file://'],
  credentials: true
}));

// Serve static files
app.use(express.static(__dirname));

// Global error detection middleware
app.use((err, req, res, next) => {
  console.error('🛑ERROR:', err.message);
  console.error('🛑ERROR Stack trace:', err.stack);
  res.status(500).json({ error: 'Internal server error: ' + err.message });
});

// API endpoint to serve environment variables
app.get('/api/env', (req, res) => {
  try {
    console.log('🔑 Loading environment variables from .env and .env.local files');
    
    // Load .env file first
    const envPath = path.join(__dirname, '.env');
    const envVars = {};
    
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      envContent.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0) {
          envVars[key.trim()] = valueParts.join('=').trim();
        }
      });
      console.log('✅ .env file loaded');
    } else {
      console.log('⚠️ .env file not found');
    }
    
    // Load .env.local file (takes precedence for OIDC token)
    const envLocalPath = path.join(__dirname, '.env.local');
    if (fs.existsSync(envLocalPath)) {
      const envLocalContent = fs.readFileSync(envLocalPath, 'utf8');
      envLocalContent.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0) {
          envVars[key.trim()] = valueParts.join('=').trim();
        }
      });
      console.log('✅ .env.local file loaded (contains OIDC token)');
    } else {
      console.log('⚠️ .env.local file not found - OIDC token may be missing');
    }
    
    // Return safe environment variables (don't expose actual API keys in detail)
    const safeEnvVars = {
      PORT: envVars.PORT || '3000',
      NODE_ENV: envVars.NODE_ENV || 'development',
      DEBUG: envVars.DEBUG || 'false',
      ENABLE_AI: envVars.ENABLE_AI || 'true',
      ENABLE_PROXY: envVars.ENABLE_PROXY || 'true',
      ENABLE_CHAT: envVars.ENABLE_CHAT || 'true',
      ENABLE_GAMING: envVars.ENABLE_GAMING || 'true',
      DISCORD_SERVER_ID: envVars.DISCORD_SERVER_ID || null,
      DISCORD_CHANNEL_ID: envVars.DISCORD_CHANNEL_ID || null,
      // Only expose API keys existence, not the actual keys
      HAS_API_KEYS: !!(envVars.API || envVars.API2 || envVars.API3 || envVars.API4 || envVars.API5 || envVars.API6),
      API_COUNT: [
        !!envVars.API,
        !!envVars.API2,
        !!envVars.API3,
        !!envVars.API4,
        !!envVars.API5,
        !!envVars.API6
      ].filter(Boolean).length
    };
    
    // Add API keys for local development (server can safely expose them to localhost)
    if (req.hostname === 'localhost' || req.hostname === '127.0.0.1') {
      safeEnvVars.API = envVars.API || null;
      safeEnvVars.API2 = envVars.API2 || null;
      safeEnvVars.API3 = envVars.API3 || null;
      safeEnvVars.API4 = envVars.API4 || null;
      safeEnvVars.API5 = envVars.API5 || null;
      safeEnvVars.API6 = envVars.API6 || null;
      safeEnvVars.API7 = envVars.API7 || null;
      safeEnvVars.API8 = envVars.API8 || null;
      safeEnvVars.SPOTIFY_CLIENT_ID = envVars.SPOTIFY_CLIENT_ID || null;
      safeEnvVars.SPOTIFY_CLIENT_SECRET = envVars.SPOTIFY_CLIENT_SECRET || null;
      safeEnvVars.JAMENDO_CLIENT_ID = envVars.JAMENDO_CLIENT_ID || null;
      safeEnvVars.YOUTUBE_API_KEY = envVars.YOUTUBE_API_KEY || null;
      safeEnvVars.MERRIAM_WEBSTER_API_KEY = envVars.MERRIAM_WEBSTER_API_KEY || null;
      safeEnvVars.CLOUDFLARE_ACCOUNT_ID = envVars.CLOUDFLARE_ACCOUNT_ID || null;
      safeEnvVars.CLOUDFLARE_GATEWAY_ID = envVars.CLOUDFLARE_GATEWAY_ID || null;
    }
    
    console.log('✅ Environment variables loaded successfully');
    console.log('🔐 API keys status:', {
      API: safeEnvVars.API ? 'SET' : 'NOT SET',
      API2: safeEnvVars.API2 ? 'SET' : 'NOT SET',
      API3: safeEnvVars.API3 ? 'SET' : 'NOT SET',
      API4: safeEnvVars.API4 ? 'SET' : 'NOT SET',
      API5: safeEnvVars.API5 ? 'SET' : 'NOT SET',
      API6: safeEnvVars.API6 ? 'SET' : 'NOT SET',
      API7: safeEnvVars.API7 ? 'SET' : 'NOT SET',
      API8: safeEnvVars.API8 ? 'SET' : 'NOT SET',
      HAS_API_KEYS: safeEnvVars.HAS_API_KEYS,
      API_COUNT: safeEnvVars.API_COUNT
    });
    
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    res.json(safeEnvVars);
  } catch (error) {
    console.error('🛑ERROR: Failed to load .env:', error.message);
    res.status(500).json({ error: 'Failed to load environment variables' });
  }
});

// Chat API endpoint
app.post('/api/chat', express.json(), async (req, res) => {
  try {
    console.log('🔍 /api/chat endpoint called');
    const { message, model } = req.body;
    console.log('💬 Chat request received:', { message, model });
    
    // Load API keys from .env
    const envPath = path.join(__dirname, '.env');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const envVars = {};
    
    envContent.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        envVars[key.trim()] = valueParts.join('=').trim();
      }
    });
    
    const openRouterKey = envVars.API;
    const hfToken = envVars.API2;
    const replicateToken = envVars.API3;
    const lockllmToken = envVars.API4;
    
    let aiMessage = '';
    let apiUsed = '';
    
    // Try OpenRouter first with model selection
    if (openRouterKey) {
      try {
        console.log('🔄 Trying OpenRouter API...');
        
        // Map model names to OpenRouter model IDs
        const modelMap = {
          'gpt-oss-20b': 'openai/gpt-oss-20b:free',
          'gpt-oss-120b': 'openai/gpt-oss-120b:free',
          'gemma-3-4b': 'google/gemma-3-4b-it:free',
          'gemma-3-12b': 'google/gemma-3-12b-it:free',
          'gemma-3-27b': 'google/gemma-3-27b-it:free',
          'auto': 'google/gemma-3-27b-it:free' // AUTO defaults to GEMMA-3-27B
        };
        
        // Handle AUTO model selection
        let selectedModel = modelMap[model] || 'openai/gpt-oss-20b:free';
        if (model === 'auto') {
          // For AUTO, prioritize GEMMA-3-27B
          selectedModel = 'google/gemma-3-27b-it:free';
          console.log('🤖 AUTO mode: Defaulting to GEMMA-3-27B for optimal performance');
        }
        console.log(`🎯 Using model: ${selectedModel} for request: ${model}`);
        
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openRouterKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'http://localhost:3000',
            'X-Title': 'Neural Nexus AI'
          },
          body: JSON.stringify({
            model: selectedModel,
            messages: [
              {
                role: 'user',
                content: message
              }
            ],
            max_tokens: model === 'gpt-oss-120b' ? 2000 : 1000,
            temperature: 0.7,
            stream: false
          })
        });
        
        if (!response.ok) {
          throw new Error('OPENROUTER_FAILED'); // Trigger fallback for any error
        }
        
        const data = await response.json();
        aiMessage = data.choices?.[0]?.message?.content || data.choices?.[0]?.text || '';
        if (!aiMessage) {
          console.log('🔍 OpenRouter response structure:', JSON.stringify(data, null, 2));
        }
        apiUsed = 'OpenRouter';
        console.log('✅ OpenRouter API successful');
        
      } catch (error) {
        console.log('❌ OpenRouter failed:', error.message);
        // Continue to Replicate fallback for any error
        console.log('🔄 Falling back to Replicate API...');
      }
    }
    
    // Fallback to Replicate if OpenRouter failed
    if (!aiMessage && replicateToken) {
      try {
        console.log('🔄 Trying Replicate API...');
        
        // Map model names to Replicate model IDs
        const replicateModelMap = {
          'gpt-oss-20b': 'openai/gpt-oss-20b',
          'gpt-oss-120b': 'openai/gpt-oss-120b',
          'gemma-3-4b': 'google-deepmind/gemma-3-4b-it:00139d2960396352b671f7b5c2ece5313bf6d45fe0a052efe14f023d2a81e196',
          'gemma-3-12b': 'google-deepmind/gemma-3-12b-it:free',
          'gemma-3-27b': 'google-deepmind/gemma-3-27b-it:free',
          'auto': 'google-deepmind/gemma-3-27b-it:free' // AUTO defaults to GEMMA-3-27B
        };
        
        // Handle AUTO model selection
        let selectedReplicateModel = replicateModelMap[model] || 'openai/gpt-oss-20b';
        if (model === 'auto') {
          // For AUTO, prioritize GEMMA-3-27B
          selectedReplicateModel = 'google-deepmind/gemma-3-27b-it:free';
          console.log('🤖 AUTO mode: Defaulting to GEMMA-3-27B for optimal performance');
        }
        console.log(`🎯 Using Replicate model: ${selectedReplicateModel} for request: ${model}`);
        
        // Import Replicate
        const { Replicate } = require('replicate');
        const replicate = new Replicate({
          auth: replicateToken
        });
        
        // Handle different input formats for different models
        let input;
        
        if (model === 'gemma-3-4b') {
          // GEMMA-3-4B with vision support
          input = {
            prompt: message,
            max_tokens: 2000,
            temperature: 0.7
          };
          
          // Check if message contains image URL for vision processing
          if (message.includes('http') && (message.includes('.jpg') || message.includes('.png') || message.includes('.webp'))) {
            // Extract image URL from message
            const imageUrlMatch = message.match(/(https?:\/\/[^\s]+\.(jpg|jpeg|png|webp))/i);
            if (imageUrlMatch) {
              input.image = imageUrlMatch[1];
              input.prompt = message.replace(imageUrlMatch[1], '').trim() || "Describe this image in detail";
              console.log('🖼️ Processing image with GEMMA-3-4B vision model');
            }
          }
        } else {
          // Other models use standard format
          input = {
            prompt: message,
            max_tokens: model === 'gpt-oss-120b' ? 2000 : 1024,
            temperature: 0.7
          };
        }
        
        // Run the model with streaming support
        let fullResponse = '';
        
        if (model === 'gpt-oss-120b') {
          // Use streaming for GPT-OSS-120b
          for await (const event of replicate.stream(selectedReplicateModel, { input })) {
            fullResponse += event.toString();
          }
          aiMessage = fullResponse;
        } else {
          // Use regular run for other models
          const output = await replicate.run(selectedReplicateModel, { input });
          aiMessage = typeof output === 'string' ? output : output.join('');
        }
        
        apiUsed = 'Replicate';
        console.log('✅ Replicate API successful');
        
      } catch (error) {
        console.log('❌ Replicate failed:', error.message);
        // Continue to HuggingFace fallback
        console.log('🔄 Falling back to HuggingFace API...');
      }
    }
    
    // Fallback to HuggingFace if OpenRouter and Replicate failed
    if (!aiMessage && hfToken) {
      try {
        console.log('🔄 Trying HuggingFace API...');
        
        // Map model names to HuggingFace model IDs
        const hfModelMap = {
          'gpt-oss-20b': 'openai/gpt-oss-20b',
          'gpt-oss-120b': 'openai/gpt-oss-120b',
          'gemma-3-4b': 'google/gemma-3-4b-it',
          'gemma-3-12b': 'google/gemma-3-12b-it:featherless-ai',
          'gemma-3-27b': 'google/gemma-3-27b-it:featherless-ai'
        };
        
        const selectedHFModel = hfModelMap[model] || 'openai/gpt-oss-20b';
        console.log(`🎯 Using HuggingFace model: ${selectedHFModel} for request: ${model}`);
        
        const response = await fetch('https://router.huggingface.co/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${hfToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: selectedHFModel,
            messages: [
              {
                role: 'user',
                content: message
              }
            ],
            max_tokens: model === 'gpt-oss-120b' ? 2000 : 1000,
            temperature: 0.7,
            stream: false
          })
        });
        
        if (!response.ok) {
          const errorText = await response.text()
          if (response.status === 401) {
            throw new Error('Invalid HuggingFace token. Please check your token.')
          } else if (response.status === 429) {
            throw new Error('HuggingFace rate limit exceeded. Please try again later.')
          } else {
            throw new Error(`HuggingFace Error: ${response.status} - ${errorText}`)
          }
        }
        
        const data = await response.json()
        aiMessage = data.choices?.[0]?.message?.content || data.choices?.[0]?.text || ''
        
        if (!aiMessage) {
          console.log('🔍 HuggingFace response structure:', JSON.stringify(data, null, 2))
        }
        
        apiUsed = 'HuggingFace'
        console.log('✅ HuggingFace API successful')
        
      } catch (error) {
        console.log('❌ HuggingFace failed:', error.message)
        // Continue to LockLLM fallback
        console.log('🔄 Falling back to LockLLM API...');
      }
    }
    
    // Final fallback to LockLLM if all others failed
    if (!aiMessage && lockllmToken) {
      try {
        console.log('🔄 Trying LockLLM API...');
        
        // Map model names to LockLLM model IDs
        const lockllmModelMap = {
          'gpt-oss-20b': 'openai/gpt-oss-20b:free',
          'gpt-oss-120b': 'openai/gpt-oss-120b:free',
          'gemma-3-4b': 'google/gemma-3-4b-it:free',
          'gemma-3-12b': 'google/gemma-3-12b-it:free',
          'gemma-3-27b': 'google/gemma-3-27b-it:free',
          'llama-3.2-3b': 'meta-llama/llama-3.2-3b-instruct:free',
          'llama-3.3-70b': 'meta-llama/llama-3.3-70b-instruct:free'
        };
        
        const selectedLockllmModel = lockllmModelMap[model] || 'openai/gpt-oss-20b:free';
        console.log(`🎯 Using LockLLM model: ${selectedLockllmModel} for request: ${model}`);
        
        const response = await fetch('https://api.lockllm.com/v1/proxy/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${lockllmToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: selectedLockllmModel,
            messages: [
              {
                role: 'user',
                content: message
              }
            ],
            max_tokens: model === 'gpt-oss-120b' ? 2000 : 1000,
            temperature: 0.7,
            stream: false
          })
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          if (response.status === 401) {
            throw new Error('Invalid LockLLM API token. Please check your token.')
          } else if (response.status === 429) {
            throw new Error('LockLLM rate limit exceeded. Please try again later.')
          } else {
            throw new Error(`LockLLM Error: ${response.status} - ${errorText}`)
          }
        }
        
        const data = await response.json();
        aiMessage = data.choices?.[0]?.message?.content || data.choices?.[0]?.text || '';
        
        if (!aiMessage) {
          console.log('🔍 LockLLM response structure:', JSON.stringify(data, null, 2));
        }
        
        apiUsed = 'LockLLM';
        console.log('✅ LockLLM API successful');
        
      } catch (error) {
        console.log('❌ LockLLM failed:', error.message);
        throw new Error('ALL_APIS_FAILED');
      }
    }
    
    if (!aiMessage) {
      throw new Error('ALL_APIS_FAILED');
    }
    
    // Clean up the response
    aiMessage = aiMessage
      .replace(/^["']|["']$/g, '')
      .replace(/\\n/g, '\n')
      .replace(/\\"/g, '"')
      .replace(/\\'/g, "'")
      .trim();
    
    console.log(`✅ Real AI response received from ${apiUsed}:`, aiMessage);
    
    res.json({
      response: aiMessage,
      model: model,
      api: apiUsed,
      timestamp: new Date().toISOString(),
      success: true
    });
    
  } catch (error) {
    console.error('🛑ERROR: Chat API error:', error.message);
    console.error('🛑ERROR: Full error details:', error);
    res.status(500).json({ error: 'Failed to process message: ' + error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// CORS Proxy endpoints for Replicate and LockLLM
app.use(express.json({ limit: '10mb' }));

// Proxy endpoint for Replicate API
app.post('/api/replicate', async (req, res) => {
  try {
    const { token, version, input } = req.body;
    
    console.log('🔄 Proxying Replicate API request...');
    
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        version: version,
        input: input
      })
    });
    
    const data = await response.json();
    console.log('✅ Replicate proxy response received');
    res.json(data);
    
  } catch (error) {
    console.error('🛑ERROR: Replicate proxy error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Proxy endpoint for LockLLM API
app.post('/api/lockllm', async (req, res) => {
  try {
    const { token, model, messages, max_tokens, temperature } = req.body;
    
    console.log('🔄 Proxying LockLLM API request...');
    
    const response = await fetch('https://api.lockllm.com/v1/proxy/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        max_tokens: max_tokens,
        temperature: temperature,
        stream: false
      })
    });
    
    const data = await response.json();
    console.log('✅ LockLLM proxy response received');
    res.json(data);
    
  } catch (error) {
    console.error('🛑ERROR: LockLLM proxy error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Proxy endpoint for Vercel AI Gateway API
app.post('/api/vercelai', async (req, res) => {
  try {
    const { model, messages, max_tokens, temperature } = req.body;
    
    console.log('🔄 Proxying Vercel AI Gateway API request...');
    
    // Load OIDC token from .env.local file
    const envLocalPath = path.join(__dirname, '.env.local');
    let oidcToken = null;
    
    if (fs.existsSync(envLocalPath)) {
      const envLocalContent = fs.readFileSync(envLocalPath, 'utf8');
      envLocalContent.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=');
        if (key && key.trim() === 'VERCEL_OIDC_TOKEN' && valueParts.length > 0) {
          oidcToken = valueParts.join('=').trim().replace(/"/g, '');
        }
      });
    }
    
    if (!oidcToken) {
      console.log('❌ VERCEL_OIDC_TOKEN not found in .env.local');
      return res.status(401).json({ 
        error: 'VERCEL_OIDC_TOKEN not found. Please run "vercel env pull" to refresh the token.' 
      });
    }
    
    console.log('✅ Using OIDC token for Vercel AI Gateway authentication');
    
    const response = await fetch('https://ai-gateway.vercel.sh/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${oidcToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        max_tokens: max_tokens,
        temperature: temperature,
        stream: false
      })
    });
    
    const data = await response.json();
    console.log('✅ Vercel AI Gateway proxy response received');
    res.json(data);
    
  } catch (error) {
    console.error('🛑ERROR: Vercel AI Gateway proxy error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Proxy endpoint for Groq API
app.post('/api/groq', async (req, res) => {
  try {
    const { token, model, messages, max_tokens, temperature } = req.body;
    
    console.log('🔄 Proxying Groq API request...');
    
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        max_tokens: max_tokens,
        temperature: temperature,
        stream: false
      })
    });
    
    const data = await response.json();
    console.log('✅ Groq proxy response received');
    res.json(data);
    
  } catch (error) {
    console.error('🛑ERROR: Groq proxy error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Proxy endpoint for HuggingFace API
app.post('/api/huggingface', async (req, res) => {
  try {
    const { token, model, messages, max_tokens, temperature } = req.body;
    
    console.log('🔄 Proxying HuggingFace API request...');
    
    const response = await fetch('https://router.huggingface.co/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        max_tokens: max_tokens,
        temperature: temperature,
        stream: false
      })
    });
    
    const data = await response.json();
    console.log('✅ HuggingFace proxy response received');
    res.json(data);
    
  } catch (error) {
    console.error('🛑ERROR: HuggingFace proxy error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Proxy endpoint for Cloudflare Workers AI API
app.post('/api/cloudflare', async (req, res) => {
  try {
    const { token, account_id, gateway_id, model, messages, max_tokens, temperature } = req.body;
    
    console.log('🔄 Proxying Cloudflare Workers AI API request...');
    
    const response = await fetch(`https://gateway.ai.cloudflare.com/v1/${account_id}/${gateway_id}/compat/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        max_tokens: max_tokens,
        temperature: temperature,
        stream: false
      })
    });
    
    const data = await response.json();
    console.log('✅ Cloudflare Workers AI proxy response received');
    res.json(data);
    
  } catch (error) {
    console.error('🛑ERROR: Cloudflare Workers AI proxy error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Spotify token endpoint
app.post('/api/spotify/token', async (req, res) => {
  try {
    const envPath = path.join(__dirname, '.env');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const envVars = {};
    
    envContent.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        envVars[key.trim()] = valueParts.join('=').trim();
      }
    });
    
    const clientId = envVars.SPOTIFY_CLIENT_ID;
    const clientSecret = envVars.SPOTIFY_CLIENT_SECRET;
    
    if (!clientId || !clientSecret) {
      return res.status(400).json({ error: 'Spotify credentials not configured' });
    }
    
    const authString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${authString}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
    });
    
    const data = await response.json();
    res.json(data);
    
  } catch (error) {
    console.error('🛑ERROR: Spotify token error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// YouTube Data API endpoint - free music with full playback via video embeds
app.get('/api/spotify/tracks', async (req, res) => {
  try {
    const envPath = path.join(__dirname, '.env');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const envVars = {};
    
    envContent.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        envVars[key.trim()] = valueParts.join('=').trim();
      }
    });
    
    const apiKey = envVars.YOUTUBE_API_KEY;
    const apiKey2 = envVars.YOUTUBE_API_KEY_2;
    
    if (!apiKey || apiKey === 'your_youtube_api_key_here') {
      return res.status(400).json({ error: 'YouTube API key not configured' });
    }
    
    // Get search query from request or use default
    const searchQuery = req.query.q || 'popular music 2024';
    
    // Try first API key
    let searchResponse = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchQuery)}&type=video&videoCategoryId=10&maxResults=50&key=${apiKey}`);
    let searchData = await searchResponse.json();
    
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
    
    // Filter to only show - Topic channels (official music distribution)
    const topicTracks = searchData.items.filter(item => 
      item.snippet.channelTitle && item.snippet.channelTitle.includes('- Topic')
    );
    
    const tracks = topicTracks.map(item => ({
      id: item.id.videoId,
      title: item.snippet.title,
      artist: item.snippet.channelTitle.replace(' - Topic', ''),
      album: 'Official Audio',
      imageUrl: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
      previewUrl: null, // YouTube uses embeds, not audio URLs
      spotifyUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`
    }));
    
    res.json({ tracks });
    
  } catch (error) {
    console.error('🛑ERROR: YouTube tracks error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Proxy endpoint for local AI server (port 5000)
app.use('/ai', async (req, res, next) => {
  try {
    const aiServerUrl = 'http://localhost:5000';
    const targetPath = req.url.replace('/ai', '') || '';
    const targetUrl = `${aiServerUrl}${targetPath}`;
    
    console.log(`🔄 Proxying request to local AI server: ${req.method} ${targetUrl}`);
    
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'Content-Type': req.headers['content-type'] || 'application/json',
      },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined
    });
    
    const data = await response.json();
    console.log('✅ Local AI server proxy response received');
    res.json(data);
    
  } catch (error) {
    console.error('🛑ERROR: Local AI server proxy error:', error.message);
    res.status(500).json({ error: 'Failed to connect to local AI server on port 5000' });
  }
});

// Proxy status endpoint
app.get('/api/proxy-status', (req, res) => {
  res.json({ 
    status: 'running',
    timestamp: new Date().toISOString(),
    endpoints: ['/api/replicate', '/api/lockllm', '/api/vercelai', '/api/groq', '/api/huggingface', '/api/cloudflare', '/ai/*'],
    server: 'ULTIMATEUNBLOCKER All-in-One Server'
  });
});

// Start AI server on port 5000
let aiServerProcess = null;

function startAIServer() {
  const aiServerPath = path.join(__dirname, 'ai-model', 'ultimate_ai_model.py');
  
  if (fs.existsSync(aiServerPath)) {
    console.log('🤖 Starting local AI server on port 5000...');
    try {
      aiServerProcess = spawn('python', [aiServerPath], {
        cwd: path.join(__dirname, 'ai-model'),
        shell: true
      });
      
      aiServerProcess.stdout.on('data', (data) => {
        console.log(`[AI Server] ${data}`);
      });
      
      aiServerProcess.stderr.on('data', (data) => {
        console.error(`[AI Server Error] ${data}`);
      });
      
      aiServerProcess.on('error', (error) => {
        console.error('🛑ERROR: Failed to start AI server:', error.message);
      });
      
      aiServerProcess.on('close', (code) => {
        console.log(`[AI Server] Process exited with code ${code}`);
        if (code !== 0) {
          console.error('🛑ERROR: AI server exited with non-zero code');
        }
      });
      
      // Wait a bit for AI server to start
      setTimeout(() => {
        console.log('✅ AI server should be running on port 5000');
      }, 2000);
    } catch (error) {
      console.error('🛑ERROR: Exception while starting AI server:', error.message);
    }
  } else {
    console.log('⚠️ AI server file not found, skipping AI server startup');
  }
}

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log('🚀 ULTIMATEUNBLOCKER All-in-One Server Started!');
  console.log(`📍 Local: http://localhost:${PORT}`);
  console.log(`🔑 API endpoint: http://localhost:${PORT}/api/env`);
  console.log(`💬 Chat endpoint: http://localhost:${PORT}/api/chat`);
  console.log(`🛡️ CORS Proxy endpoints:`);
  console.log(`   - http://localhost:${PORT}/api/replicate`);
  console.log(`   - http://localhost:${PORT}/api/lockllm`);
  console.log(`   - http://localhost:${PORT}/api/vercelai`);
  console.log(`   - http://localhost:${PORT}/api/groq`);
  console.log(`   - http://localhost:${PORT}/api/huggingface`);
  console.log(`   - http://localhost:${PORT}/api/cloudflare`);
  console.log(`   - http://localhost:${PORT}/ai/* (local AI server on port 5000)`);
  console.log(`📊 Status endpoints:`);
  console.log(`   - http://localhost:${PORT}/api/health`);
  console.log(`   - http://localhost:${PORT}/api/proxy-status`);
  console.log('✅ Ready for AI chat with secure API key loading!');
  console.log('🔄 API Fallback Chain: OpenRouter → Replicate → HuggingFace → LockLLM → VercelAI → Groq → Cloudflare → GoogleAIStudio');
  console.log('🤖 Local AI Server Proxy: Port 5000 proxied through /ai/*');
  console.log('🔒 CORS-safe proxy enabled - no external CORS issues!');
  
  // Start AI server
  startAIServer();
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down servers...');
  if (aiServerProcess) {
    aiServerProcess.kill();
    console.log('✅ AI server stopped');
  }
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down servers (SIGTERM)...');
  if (aiServerProcess) {
    aiServerProcess.kill();
    console.log('✅ AI server stopped');
  }
  process.exit(0);
});

// Handle nodemon restart
process.on('SIGUSR2', () => {
  console.log('\n🔄 Nodemon restart detected, cleaning up AI server...');
  if (aiServerProcess) {
    aiServerProcess.kill();
    console.log('✅ AI server stopped for restart');
  }
});
