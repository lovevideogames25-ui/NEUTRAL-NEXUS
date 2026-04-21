// Ultimate AI Section JavaScript
class UltimateAI {
  constructor() {
    this.currentModel = 'Gemini-2.5-Flash';
    this.chatHistory = [];
    this.isTyping = false;
    this.attachedImages = [];
    this.settings = {
      temperature: 0.7,
      maxTokens: 1000,
      codeHighlighting: true,
      markdownSupport: true,
      autoSave: false,
      primaryAPI: 'auto'
    };
    
    this.initialize();
  }
  
  initialize() {
    console.log('Ultimate AI Assistant initializing...');
    this.setupEventListeners();
    this.loadSettings();
    this.setupModelSelection();
    this.setupChatInterface();
    this.setupSettings();
    this.setupToolbar();
  }
  
  setupEventListeners() {
    // Close button
    const aiCloseBtn = document.getElementById('aiCloseBtn');
    if (aiCloseBtn) {
      aiCloseBtn.addEventListener('click', () => this.closeAI());
    }
    
    // Model selection - new structure
    document.querySelectorAll('.model-item').forEach(item => {
      item.addEventListener('click', (e) => {
        document.querySelectorAll('.model-item').forEach(i => i.classList.remove('selected'));
        item.classList.add('selected');
        this.currentModel = item.getAttribute('data-model');
        console.log('Selected model:', this.currentModel);
      });
    });
    
    // Category tabs
    document.querySelectorAll('.category-tab').forEach(tab => {
      tab.addEventListener('click', (e) => this.filterModels(e.target.dataset.category));
    });

    // Model tabs
    document.querySelectorAll('.model-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        document.querySelectorAll('.model-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.filterModelsByTab(e.target.dataset.tab);
      });
    });
    
    // Quick action buttons
    document.querySelectorAll('.quick-action-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const prompt = e.target.dataset.prompt;
        if (prompt) {
          document.getElementById('ultimateAIInput').value = prompt;
          this.sendMessage();
        }
      });
    });
    
    // Send button
    const sendBtn = document.getElementById('ultimateAISendBtn');
    if (sendBtn) {
      sendBtn.addEventListener('click', () => this.sendMessage());
    }
    
    // Input field
    const input = document.getElementById('ultimateAIInput');
    if (input) {
      input.addEventListener('input', () => {
        sendBtn.disabled = input.value.trim() === '';
      });
      
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.sendMessage();
        }
      });
      
      input.addEventListener('input', () => this.updateCharCount());
    }
    
    // Chat actions
    document.getElementById('newChatBtn')?.addEventListener('click', () => this.newChat());
    document.getElementById('clearChatBtn')?.addEventListener('click', () => this.clearChat());
    document.getElementById('exportChatBtn')?.addEventListener('click', () => this.exportChat());
    document.getElementById('settingsBtn')?.addEventListener('click', () => this.loadChat());
    
    // Image upload
    const cameraBtn = document.getElementById('ultimateAICameraBtn');
    const imageUpload = document.getElementById('imageUpload');
    if (cameraBtn && imageUpload) {
      cameraBtn.addEventListener('click', () => {
        if (this.currentModel === 'DeepSeek-V3.2') {
          alert('MODEL NOT SUPPORTED FOR PICTURES');
          return;
        }
        imageUpload.click();
      });
      imageUpload.addEventListener('change', (e) => this.handleImageUpload(e));
    }
    
    // Settings
    document.getElementById('closeSettingsBtn')?.addEventListener('click', () => this.hideSettings());
    document.getElementById('temperatureSlider')?.addEventListener('input', (e) => {
      this.settings.temperature = parseFloat(e.target.value);
      document.getElementById('temperatureValue').textContent = e.target.value;
    });
    document.getElementById('maxTokensSelect')?.addEventListener('change', (e) => {
      this.settings.maxTokens = parseInt(e.target.value);
    });
    document.getElementById('codeHighlighting')?.addEventListener('change', (e) => {
      this.settings.codeHighlighting = e.target.checked;
    });
    document.getElementById('markdownSupport')?.addEventListener('change', (e) => {
      this.settings.markdownSupport = e.target.checked;
    });
    document.getElementById('autoSave')?.addEventListener('change', (e) => {
      this.settings.autoSave = e.target.checked;
    });
    document.getElementById('primaryAPISelect')?.addEventListener('change', (e) => {
      this.settings.primaryAPI = e.target.value;
    });
  }
  
  setupModelSelection() {
    // Model card clicks
    document.querySelectorAll('.model-card').forEach(card => {
      card.addEventListener('click', () => {
        const model = card.dataset.model;
        this.selectModel(model);
      });
    });
    
    // Auto-select featured model
    const featuredModel = document.querySelector('.model-card.featured');
    if (featuredModel) {
      this.selectModel(featuredModel.dataset.model);
    }
  }
  
  selectModel(model) {
    this.currentModel = model;
    
    // Update UI
    document.querySelectorAll('.model-card').forEach(card => {
      card.classList.remove('selected');
    });
    
    const selectedCard = document.querySelector(`[data-model="${model}"]`);
    if (selectedCard) {
      selectedCard.classList.add('selected');
    }

    // Disable camera button for DeepSeek-V3.2
    const cameraBtn = document.getElementById('ultimateAICameraBtn');
    if (cameraBtn) {
      if (model === 'DeepSeek-V3.2') {
        cameraBtn.style.opacity = '0.5';
        cameraBtn.style.pointerEvents = 'none';
      } else {
        cameraBtn.style.opacity = '1';
        cameraBtn.style.pointerEvents = 'auto';
      }
    }
    
    // Update current model display
    const modelDetails = this.getModelDetails(model);
    const modelAvatar = document.querySelector('.model-avatar');
    const modelName = document.querySelector('.model-details h4');
    const modelDesc = document.querySelector('.model-details p');
    
    if (modelAvatar) modelAvatar.textContent = modelDetails.icon;
    if (modelName) modelName.textContent = modelDetails.name;
    if (modelDesc) modelDesc.textContent = modelDetails.description;
    
    console.log(`Selected model: ${model}`);
  }
  
  getModelDetails(model) {
    const models = {
      'gpt-oss-20b': {
        icon: 'GPT',
        name: 'GPT-OSS',
        description: 'Fast open-source model with reasoning capabilities',
        api: 'openrouter'
      },
      'gpt-oss-120b': {
        icon: 'GPT',
        name: 'GPT-OSS (smart)',
        description: 'Advanced open-source model with enhanced intelligence',
        api: 'openrouter'
      },
      'gemma-3-4b-fast': {
        icon: 'G',
        name: 'GEMMA-3 (fast)',
        description: 'Fast and efficient Google model for quick responses',
        api: 'openrouter'
      },
      'gemma-3-12b-normal': {
        icon: 'G',
        name: 'GEMMA-3 (normal)',
        description: 'Balanced Google model for general-purpose tasks',
        api: 'openrouter'
      },
      'gemini-3-flash': {
        icon: 'G3',
        name: 'Gemini-3-flash',
        description: 'Google\'s latest fast model with high-level thinking capabilities',
        api: 'googleai'
      },
      'gpt-4o-mini': {
        icon: 'G4',
        name: 'GPT-4o-mini',
        description: 'OpenAI\'s efficient model with GitHub AI inference',
        api: 'github'
      },
      'mistral-small-3-1': {
        icon: 'M',
        name: 'Mistral-Small-3.1',
        description: 'Mistral\'s efficient model with GitHub AI inference',
        api: 'github'
      },
      'gemma-4': {
        icon: 'G4',
        name: 'Gemma-4',
        description: 'Google\'s advanced model with HuggingFace inference',
        api: 'huggingface'
      },
      'ultimate-ai-v1-alpha': { 
        icon: 'UA', 
        name: 'ULTIMATE-AI-V1-2-ALPHA', 
        description: 'COMPLETE COMPREHENSIVE knowledge about EVERYTHINGGGGGGGGGGGGGG',
        api: 'local'
      }
    };
    
    return models[model] || models['gpt-oss-20b'];
  }
  
  setupChatInterface() {
    // Initialize chat container
    this.updateCharCount();
  }
  
  setupSettings() {
    // Settings panel handled in setupEventListeners
  }
  
  setupToolbar() {
    // Toolbar buttons
    document.getElementById('attachFileBtn')?.addEventListener('click', () => this.attachFile());
    document.getElementById('voiceInputBtn')?.addEventListener('click', () => this.startVoiceInput());
    document.getElementById('codeBlockBtn')?.addEventListener('click', () => this.insertCodeBlock());
    document.getElementById('formatBtn')?.addEventListener('click', () => this.formatText());
  }
  
  closeAI() {
    // Close the AI page and go back to home
    window.location.href = 'index.html';
  }
  
  filterModels(category) {
    // Update active tab
    document.querySelectorAll('.category-tab').forEach(tab => {
      tab.classList.remove('active');
    });
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
    
    // Filter model cards
    const modelItems = document.querySelectorAll('.model-item');
    modelItems.forEach(item => {
      if (category === 'all' || item.dataset.category === category) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }

  filterModelsByTab(tab) {
    const modelList = document.getElementById('modelList');
    const modelItems = document.querySelectorAll('.model-item');

    if (tab === 'popular') {
      modelItems.forEach(item => {
        const popularModels = ['Gemini-2.5-Flash', 'gpt-4o-mini', 'Qwen3.5-Plus'];
        if (popularModels.includes(item.dataset.model)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    } else {
      modelItems.forEach(item => {
        item.style.display = 'block';
      });
    }
  }
  
  async callLocalAI(message) {
    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message
        })
      });
      
      if (!response.ok) {
        throw new Error(`Local AI server error: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
      
    } catch (error) {
      console.error('Error calling local AI:', error);
      
      if (response && response.ok) {
        try {
          const data = await response.json();
          return data;
        } catch (e) {
          console.error('Error parsing response:', e);
        }
      }
      
      // Fallback response if local server is not running
      return {
        model: 'ULTIMATE-AI-V1-ALPHA',
        version: '1.0.0-alpha',
        response: 'I\'m not able to answer problems yet but I\'m working on it. (Local AI server may not be running)',
        timestamp: new Date().toISOString(),
        status: 'fallback'
      };
    }
  }

  async callGitHubAI(message) {
    try {
      // Check if API7 is available
      if (!window.ENV || !window.ENV.API7) {
        throw new Error('API7 (GitHub token) not found in environment variables. Please configure API7 in your .env file.');
      }

      const token = window.ENV.API7;
      
      console.log('Calling GitHub AI with token:', token.substring(0, 10) + '...');
      console.log('Token length:', token.length);
      console.log('Attached images:', this.attachedImages.length);

      // Map selected model to GitHub AI model
      const modelMap = {
        'Gemini-2.5-Flash': 'google/gemini-2.5-flash',
        'Mistral-Small-4': 'mistralai/mistral-small-2603',
        'gemma-4-31b-it': 'google/gemma-4-31b-it',
        'llama-4-scout': 'meta-llama/llama-4-scout',
        'Qwen3.5-Plus': 'qwen/qwen3.5-plus-02-15',
        'DeepSeek-V3.2': 'deepseek/deepseek-v3.2'
      };
      const githubModel = modelMap[this.currentModel] || this.currentModel;
      console.log('Using GitHub AI model:', githubModel);

      // Build messages with vision support
      let userContent = message;
      
      if (this.attachedImages.length > 0) {
        userContent = [
          { type: 'text', text: message },
          ...this.attachedImages.map(img => ({
            type: 'image_url',
            image_url: { url: img.data }
          }))
        ];
      }

      // Use GitHub AI inference endpoint
      const response = await fetch('https://models.github.ai/inference/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'X-GitHub-Api-Version': '2024-08-01'
        },
        body: JSON.stringify({
          model: githubModel,
          messages: [
            { role: 'user', content: userContent }
          ],
          temperature: this.settings.temperature,
          max_tokens: this.settings.maxTokens,
          top_p: 1
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('GitHub AI API error response:', errorText);
        
        if (response.status === 401) {
          throw new Error('401 Unauthorized - Your GitHub token (API7) may not have the correct permissions. Go to GitHub Settings > Developer Settings > Personal Access Tokens > Tokens (classic) and ensure the token has the "models" scope enabled for GitHub AI Models.');
        }
        
        throw new Error(`GitHub AI API error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      
      return {
        model: this.currentModel,
        response: data.choices[0].message.content,
        timestamp: new Date().toISOString(),
        status: 'success'
      };
      
    } catch (error) {
      console.error('Error calling GitHub AI:', error);
      throw error;
    }
  }

  async callHuggingFaceAI(message) {
    try {
      // Check if API2 is available
      if (!window.ENV || !window.ENV.API2) {
        throw new Error('API2 (HuggingFace token) not found in environment variables. Please configure API2 in your .env file.');
      }

      const token = window.ENV.API2;
      
      console.log('Calling HuggingFace AI with token:', token.substring(0, 10) + '...');
      console.log('Token length:', token.length);
      console.log('Attached images:', this.attachedImages.length);

      // Build messages with vision support
      let userContent = message;
      
      if (this.attachedImages.length > 0) {
        userContent = [
          { type: 'text', text: message },
          ...this.attachedImages.map(img => ({
            type: 'image_url',
            image_url: { url: img.data }
          }))
        ];
      }

      // Use HuggingFace inference endpoint
      const response = await fetch('https://router.huggingface.co/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          model: 'google/gemma-4-31B-it:novita',
          messages: [
            { role: 'user', content: userContent }
          ],
          temperature: this.settings.temperature,
          max_tokens: this.settings.maxTokens,
          top_p: 1
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('HuggingFace AI API error response:', errorText);
        
        if (response.status === 401) {
          throw new Error('401 Unauthorized - Your HuggingFace token (API2) may not be valid.');
        }
        
        throw new Error(`HuggingFace AI API error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      
      return {
        model: this.currentModel,
        response: data.choices[0].message.content,
        timestamp: new Date().toISOString(),
        status: 'success'
      };
      
    } catch (error) {
      console.error('Error calling HuggingFace AI:', error);
      
      return {
        model: this.currentModel,
        response: `HuggingFace AI Error: ${error.message}`,
        timestamp: new Date().toISOString(),
        status: 'error'
      };
    }
  }
  
  async sendMessage() {
    const input = document.getElementById('ultimateAIInput');
    const message = input.value.trim();
    
    if (!message || this.isTyping) return;
    
    // Add user message with images
    this.addMessage(message, 'user', this.attachedImages);
    input.value = '';
    this.updateCharCount();
    
    // Show typing indicator
    this.showTypingIndicator();
    this.isTyping = true;
    
    try {
      const response = await this.callWithFallback(message);
      this.addMessage(response.response || response, 'ai');
    } catch (error) {
      this.addMessage(`Error: ${error.message}`, 'error');
    } finally {
      this.hideTypingIndicator();
      this.isTyping = false;
      
      // Clear attached images after sending
      this.attachedImages = [];
      this.clearImagePreviews();
      
      // Auto-save if enabled
      if (this.settings.autoSave) {
        this.saveChat();
      }
    }
  }

  async callWithFallback(message) {
    const apis = [
      { name: 'API1', key: 'API', call: () => this.callAPI1(message) },
      { name: 'API2', key: 'API2', call: () => this.callAPI2(message) },
      { name: 'API3', key: 'API3', call: () => this.callAPI3(message) },
      { name: 'API4', key: 'API4', call: () => this.callAPI4(message) },
      { name: 'API5', key: 'API5', call: () => this.callAPI5(message) },
      { name: 'API6', key: 'API6', call: () => this.callAPI6(message) },
      { name: 'API7', key: 'API7', call: () => this.callAPI7(message) },
      { name: 'API8', key: 'API8', call: () => this.callAPI8(message) }
    ];

    // Try all APIs in the fallback chain
    for (const api of apis) {
      try {
        if (window.ENV && window.ENV[api.key]) {
          console.log(`Trying ${api.name}...`);
          const result = await api.call();
          if (result && result.response) {
            console.log(`Success with ${api.name}`);
            return result;
          }
        }
      } catch (error) {
        console.log(`${api.name} failed: ${error.message}`);
        continue;
      }
    }

    // If all APIs failed, try the existing system
    try {
      window.selectedAIModel = this.currentModel;
      return await window.tryDirectAPI(message, false, false);
    } catch (error) {
      console.log('All APIs failed');
      return {
        model: this.currentModel,
        response: 'All APIs failed. Please check your API keys.',
        timestamp: new Date().toISOString(),
        status: 'error'
      };
    }
  }

  async callAPI1(message) {
    // OpenRouter
    const token = window.ENV.API;
    
    // Map selected model to OpenRouter model
    const modelMap = {
      'Gemini-2.5-Flash': 'google/gemini-2.5-flash',
      'Mistral-Small-4': 'mistralai/mistral-small-2603',
      'gemma-4-31b-it': 'google/gemma-4-31b-it',
      'llama-4-scout': 'meta-llama/llama-4-scout',
      'Qwen3.5-Plus': 'qwen/qwen3.5-plus-02-15',
      'DeepSeek-V3.2': 'deepseek/deepseek-v3.2'
    };
    const openRouterModel = modelMap[this.currentModel] || this.currentModel;
    
    // Build messages with vision support
    let userContent = message;
    if (this.attachedImages.length > 0) {
      userContent = [
        { type: 'text', text: message },
        ...this.attachedImages.map(img => ({
          type: 'image_url',
          image_url: { url: img.data }
        }))
      ];
    }
    
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: openRouterModel,
        messages: [{ role: 'user', content: userContent }],
        temperature: this.settings.temperature,
        max_tokens: this.settings.maxTokens
      })
    });
    const data = await response.json();
    return { model: this.currentModel, response: data.choices[0].message.content, status: 'success' };
  }

  async callAPI2(message) {
    // HuggingFace
    const token = window.ENV.API2;
    
    // Map selected model to HuggingFace model
    const modelMap = {
      'Gemini-2.5-Flash': 'google/gemini-2.5-flash',
      'Mistral-Small-4': 'mistralai/mistral-small-2603',
      'gemma-4-31b-it': 'google/gemma-4-31b-it',
      'llama-4-scout': 'meta-llama/llama-4-scout',
      'Qwen3.5-Plus': 'qwen/qwen3.5-plus-02-15',
      'DeepSeek-V3.2': 'deepseek/deepseek-v3.2'
    };
    const huggingFaceModel = modelMap[this.currentModel] || this.currentModel;
    
    // Build messages with vision support
    let userContent = message;
    if (this.attachedImages.length > 0) {
      userContent = [
        { type: 'text', text: message },
        ...this.attachedImages.map(img => ({
          type: 'image_url',
          image_url: { url: img.data }
        }))
      ];
    }
    
    const response = await fetch('https://router.huggingface.co/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: huggingFaceModel,
        messages: [{ role: 'user', content: userContent }],
        temperature: this.settings.temperature,
        max_tokens: this.settings.maxTokens
      })
    });
    const data = await response.json();
    return { model: this.currentModel, response: data.choices[0].message.content, status: 'success' };
  }

  async callAPI3(message) {
    // Replicate
    const token = window.ENV.API3;
    
    // Map selected model to Replicate model
    const modelMap = {
      'Gemini-2.5-Flash': 'google/gemini-2.5-flash',
      'Mistral-Small-4': 'mistralai/mistral-small-2603',
      'gemma-4-31b-it': 'google/gemma-4-31b-it',
      'llama-4-scout': 'meta-llama/llama-4-scout',
      'Qwen3.5-Plus': 'qwen/qwen3.5-plus-02-15',
      'DeepSeek-V3.2': 'deepseek/deepseek-v3.2'
    };
    const replicateModel = modelMap[this.currentModel] || this.currentModel;
    
    // Build input with vision support
    let input = { prompt: message };
    if (this.attachedImages.length > 0) {
      input.image = this.attachedImages[0].data;
    }
    
    const response = await fetch('https://corsproxy.io/?' + encodeURIComponent('https://api.replicate.com/v1/predictions'), {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify({
        version: replicateModel,
        input: input
      })
    });
    const data = await response.json();
    return { model: this.currentModel, response: data.output, status: 'success' };
  }

  async callAPI4(message) {
    // LockLLM
    const token = window.ENV.API4;
    
    // Map selected model to LockLLM model
    const modelMap = {
      'Gemini-2.5-Flash': 'google/gemini-2.5-flash',
      'Mistral-Small-4': 'mistralai/mistral-small-2603',
      'gemma-4-31b-it': 'google/gemma-4-31b-it',
      'llama-4-scout': 'meta-llama/llama-4-scout',
      'Qwen3.5-Plus': 'qwen/qwen3.5-plus-02-15',
      'DeepSeek-V3.2': 'deepseek/deepseek-v3.2'
    };
    const lockLLMModel = modelMap[this.currentModel] || this.currentModel;
    
    // Build messages with vision support
    let userContent = message;
    if (this.attachedImages.length > 0) {
      userContent = [
        { type: 'text', text: message },
        ...this.attachedImages.map(img => ({
          type: 'image_url',
          image_url: { url: img.data }
        }))
      ];
    }
    
    const response = await fetch('https://corsproxy.io/?' + encodeURIComponent('https://api.lockllm.com/v1/proxy/chat/completions'), {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify({
        model: lockLLMModel,
        messages: [{ role: 'user', content: userContent }],
        temperature: this.settings.temperature,
        max_tokens: this.settings.maxTokens
      })
    });
    const data = await response.json();
    return { model: this.currentModel, response: data.choices[0].message.content, status: 'success' };
  }

  async callAPI5(message) {
    // Groq
    const token = window.ENV.API5;
    
    // Map selected model to Groq model
    const modelMap = {
      'Gemini-2.5-Flash': 'google/gemini-2.5-flash',
      'Mistral-Small-4': 'mistralai/mistral-small-2603',
      'gemma-4-31b-it': 'gemma-4-31b-it',
      'llama-4-scout': 'llama-4-scout',
      'Qwen3.5-Plus': 'qwen/qwen3.5-plus-02-15',
      'DeepSeek-V3.2': 'deepseek/deepseek-v3.2'
    };
    const groqModel = modelMap[this.currentModel] || this.currentModel;
    
    // Build messages with vision support
    let userContent = message;
    if (this.attachedImages.length > 0) {
      userContent = [
        { type: 'text', text: message },
        ...this.attachedImages.map(img => ({
          type: 'image_url',
          image_url: { url: img.data }
        }))
      ];
    }
    
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: groqModel,
        messages: [{ role: 'user', content: userContent }],
        temperature: this.settings.temperature,
        max_tokens: this.settings.maxTokens
      })
    });
    const data = await response.json();
    return { model: this.currentModel, response: data.choices[0].message.content, status: 'success' };
  }

  async callAPI6(message) {
    // Google AI Studio
    const token = window.ENV.API6;
    
    // Map selected model to Google AI Studio model
    const modelMap = {
      'Gemini-2.5-Flash': 'google/gemini-2.5-flash',
      'Mistral-Small-4': 'mistralai/mistral-small-2603',
      'gemma-4-31b-it': 'gemma-4-31b-it',
      'llama-4-scout': 'llama-4-scout',
      'Qwen3.5-Plus': 'qwen/qwen3.5-plus-02-15',
      'DeepSeek-V3.2': 'deepseek/deepseek-v3.2'
    };
    const googleModel = modelMap[this.currentModel] || this.currentModel;
    
    // Build contents with vision support
    let parts = [{ text: message }];
    if (this.attachedImages.length > 0) {
      parts = [
        { text: message },
        ...this.attachedImages.map(img => ({
          inline_data: {
            mime_type: img.type || 'image/jpeg',
            data: img.data.split(',')[1]
          }
        }))
      ];
    }
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${googleModel}:generateContent?key=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{ parts: parts }]
      })
    });
    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0]) {
      throw new Error('Invalid response structure from Google AI API');
    }
    
    return { model: this.currentModel, response: data.candidates[0].content.parts[0].text, status: 'success' };
  }

  async callAPI7(message) {
    // GitHub AI
    return await this.callGitHubAI(message);
  }

  async callAPI8(message) {
    // Emergent AI - OpenAI-compatible endpoint
    const token = window.ENV.API8;
    
    // Map selected model to Emergent AI model
    const modelMap = {
      'Gemini-2.5-Flash': 'google/gemini-2.5-flash',
      'Mistral-Small-4': 'mistralai/mistral-small-2603',
      'gemma-4-31b-it': 'gemma-4-31b-it',
      'llama-4-scout': 'llama-4-scout',
      'Qwen3.5-Plus': 'qwen/qwen3.5-plus-02-15',
      'DeepSeek-V3.2': 'deepseek/deepseek-v3.2'
    };
    const emergentModel = modelMap[this.currentModel] || this.currentModel;
    
    // Build messages with vision support
    let userContent = message;
    if (this.attachedImages.length > 0) {
      userContent = [
        { type: 'text', text: message },
        ...this.attachedImages.map(img => ({
          type: 'image_url',
          image_url: { url: img.data }
        }))
      ];
    }
    
    const response = await fetch('https://api.emergent.sh/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: emergentModel,
        messages: [{ role: 'user', content: userContent }],
        temperature: this.settings.temperature,
        max_tokens: this.settings.maxTokens
      })
    });
    const data = await response.json();
    return { model: this.currentModel, response: data.choices[0].message.content, status: 'success' };
  }
  
  async simulateAIResponse(message) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // Generate a response based on the message
    const responses = [
      "I understand your question. Let me help you with that.",
      "That's an interesting point! Here's my perspective on it.",
      "Based on what you've shared, I would suggest the following approach.",
      "Great question! Let me break this down for you step by step.",
      "I can definitely help you with that. Here's what I recommend.",
      "That's a thoughtful inquiry. Let me provide you with some insights.",
      "I appreciate you asking about this. Here's my analysis.",
      "Excellent question! Let me elaborate on that topic."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }

  addMessage(content, type, images = []) {
    const container = document.getElementById('chatMessages');
    
    // Remove welcome message if it exists
    const welcome = container.querySelector('.welcome-message');
    if (welcome) welcome.remove();
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    const timestamp = new Date().toLocaleTimeString();
    
    let imagesHtml = '';
    if (images.length > 0) {
      imagesHtml = images.map(img => `
        <div class="message-image">
          <img src="${img.data}" alt="${img.name}" />
        </div>
      `).join('');
    }
    
    if (type === 'user') {
      messageDiv.innerHTML = `
        <div class="message-content">
          <div class="message-images">${imagesHtml}</div>
          <div class="message-text">${this.formatMessage(content)}</div>
          <div class="message-time">${timestamp}</div>
        </div>
        <div class="message-avatar">U</div>
      `;
    } else if (type === 'ai') {
      messageDiv.innerHTML = `
        <div class="message-avatar">AI</div>
        <div class="message-content">
          <div class="message-text">${this.formatMessage(content)}</div>
          <div class="message-time">${timestamp}</div>
        </div>
      `;
    } else if (type === 'error') {
      messageDiv.innerHTML = `
        <div class="message-content error">
          <div class="message-text">${content}</div>
          <div class="message-time">${timestamp}</div>
        </div>
      `;
    }
    
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
    
    // Add to history
    this.chatHistory.push({
      content,
      type,
      timestamp,
      images: images.map(img => img.data)
    });
  }

  showTypingIndicator() {
    const container = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message ai typing';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
      <div class="message-avatar">AI</div>
      <div class="message-bubble">
        <div class="typing-dots"><span></span><span></span><span></span></div>
      </div>
    `;
    container.appendChild(typingDiv);
    container.scrollTop = container.scrollHeight;
  }
  
  hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }
  
  formatMessage(content) {
    if (this.settings.markdownSupport) {
      // Basic markdown formatting
      content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      content = content.replace(/\*(.*?)\*/g, '<em>$1</em>');
      content = content.replace(/`(.*?)`/g, '<code>$1</code>');
    }
    
    if (this.settings.codeHighlighting) {
      // Basic code block formatting
      content = content.replace(/```(.*?)```/gs, '<pre><code>$1</code></pre>');
    }
    
    return content;
  }
  
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  
  updateCharCount() {
    const input = document.getElementById('ultimateAIInput');
    const charCount = document.getElementById('charCount');
    if (input && charCount) {
      const count = input.value.length;
      charCount.textContent = `${count} characters`;
    }
  }

  handleImageUpload(event) {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach(file => {
      if (!file.type.startsWith('image/')) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.attachedImages.push({
          data: e.target.result,
          type: file.type,
          name: file.name
        });
        this.displayImagePreviews();
      };
      reader.readAsDataURL(file);
    });

    // Clear the input so the same file can be selected again
    event.target.value = '';
  }

  displayImagePreviews() {
    const previewsContainer = document.getElementById('imagePreviews');
    if (!previewsContainer) return;

    previewsContainer.innerHTML = '';

    this.attachedImages.forEach((image, index) => {
      const preview = document.createElement('div');
      preview.className = 'image-preview';
      preview.innerHTML = `
        <img src="${image.data}" alt="Uploaded image">
        <button class="remove-btn" data-index="${index}">×</button>
      `;
      preview.querySelector('.remove-btn').addEventListener('click', () => {
        this.attachedImages.splice(index, 1);
        this.displayImagePreviews();
      });
      previewsContainer.appendChild(preview);
    });
  }

  clearImagePreviews() {
    this.attachedImages = [];
    const previewsContainer = document.getElementById('imagePreviews');
    if (previewsContainer) {
      previewsContainer.innerHTML = '';
    }
  }

  
  newChat() {
    this.chatHistory = [];
    const container = document.getElementById('chatMessages');
    container.innerHTML = `
      <div class="welcome-message">
        <div class="welcome-icon">AI</div>
        <h3>Welcome to NEUTRAL NEXUS AI</h3>
        <p>Experience the power of multiple AI models in one interface</p>
        <div class="quick-actions">
          <button class="quick-action-btn" data-prompt="Help me write code">Code Help</button>
          <button class="quick-action-btn" data-prompt="Analyze data">Data Analysis</button>
          <button class="quick-action-btn" data-prompt="Creative writing">Creative</button>
          <button class="quick-action-btn" data-prompt="Explain a topic">Learn</button>
        </div>
      </div>
    `;
    
    // Re-attach event listeners to quick action buttons
    container.querySelectorAll('.quick-action-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const prompt = e.target.dataset.prompt;
        if (prompt) {
          document.getElementById('ultimateAIInput').value = prompt;
          this.sendMessage();
        }
      });
    });
  }
  
  clearChat() {
    if (confirm('Are you sure you want to clear the chat history?')) {
      this.newChat();
    }
  }
  
  exportChat() {
    const data = {
      model: this.currentModel,
      settings: this.settings,
      history: this.chatHistory,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-chat-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
  
  loadChat() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          
          if (data.history && Array.isArray(data.history)) {
            this.chatHistory = data.history;
            this.currentModel = data.model || this.currentModel;
            if (data.settings) {
              this.settings = { ...this.settings, ...data.settings };
            }
            
            // Re-render chat messages
            this.renderChatHistory();
            
            console.log('✅ Chat loaded successfully from JSON file');
          } else {
            console.error('❌ Invalid chat file format');
            alert('Invalid chat file format');
          }
        } catch (error) {
          console.error('❌ Error loading chat:', error);
          alert('Error loading chat file');
        }
      };
      
      reader.readAsText(file);
    };
    
    input.click();
  }
  
  renderChatHistory() {
    const container = document.getElementById('chatMessages');
    if (!container) return;
    
    // Clear existing messages except welcome
    const welcome = container.querySelector('.welcome-message');
    container.innerHTML = '';
    if (welcome) container.appendChild(welcome);
    
    // Re-add all chat messages directly without adding to history again
    this.chatHistory.forEach(msg => {
      const messageDiv = document.createElement('div');
      const type = msg.role === 'user' ? 'user' : 'ai';
      messageDiv.className = `chat-message ${type}`;
      
      if (type === 'user') {
        messageDiv.innerHTML = `
          <div class="message-avatar">You</div>
          <div class="message-content">${this.escapeHtml(msg.content)}</div>
        `;
      } else {
        messageDiv.innerHTML = `
          <div class="message-avatar">${this.getModelDetails(this.currentModel).icon}</div>
          <div class="message-content">${this.formatMessage(msg.content)}</div>
        `;
      }
      
      container.appendChild(messageDiv);
    });
    
    container.scrollTop = container.scrollHeight;
  }
  
  toggleSettings() {
    const settingsPanel = document.getElementById('aiSettingsPanel');
    if (settingsPanel) {
      settingsPanel.style.display = settingsPanel.style.display === 'none' ? 'block' : 'none';
    }
  }
  
  hideSettings() {
    const settingsPanel = document.getElementById('aiSettingsPanel');
    if (settingsPanel) {
      settingsPanel.style.display = 'none';
    }
  }
  
  loadSettings() {
    const saved = localStorage.getItem('ultimateAI-settings');
    if (saved) {
      this.settings = { ...this.settings, ...JSON.parse(saved) };
      this.applySettings();
    }
  }
  
  saveSettings() {
    localStorage.setItem('ultimateAI-settings', JSON.stringify(this.settings));
  }
  
  applySettings() {
    // Apply settings to UI
    document.getElementById('temperatureSlider').value = this.settings.temperature;
    document.getElementById('temperatureValue').textContent = this.settings.temperature;
    document.getElementById('maxTokensSelect').value = this.settings.maxTokens;
    document.getElementById('codeHighlighting').checked = this.settings.codeHighlighting;
    document.getElementById('markdownSupport').checked = this.settings.markdownSupport;
    document.getElementById('autoSave').checked = this.settings.autoSave;
    document.getElementById('primaryAPISelect').value = this.settings.primaryAPI;
  }
  
  saveChat() {
    const data = {
      model: this.currentModel,
      history: this.chatHistory,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('ultimateAI-chat', JSON.stringify(data));
  }
  
  attachFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    
    input.onchange = (e) => {
      const files = Array.from(e.target.files);
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageData = {
            name: file.name,
            type: file.type,
            data: event.target.result,
            base64: event.target.result.split(',')[1]
          };
          this.attachedImages.push(imageData);
          this.showImagePreview(imageData);
        };
        reader.readAsDataURL(file);
      });
    };
    
    input.click();
  }

  showImagePreview(imageData) {
    const container = document.getElementById('chatMessages');
    const previewDiv = document.createElement('div');
    previewDiv.className = 'image-preview';
    previewDiv.innerHTML = `
      <div class="image-preview-item">
        <img src="${imageData.data}" alt="${imageData.name}" />
        <button class="remove-image" data-index="${this.attachedImages.length - 1}">×</button>
      </div>
    `;
    container.appendChild(previewDiv);
    
    // Add remove button functionality
    previewDiv.querySelector('.remove-image').addEventListener('click', (e) => {
      const index = parseInt(e.target.dataset.index);
      this.attachedImages.splice(index, 1);
      previewDiv.remove();
    });
  }

  clearImagePreviews() {
    const previews = document.querySelectorAll('.image-preview');
    previews.forEach(preview => preview.remove());
  }
  
  startVoiceInput() {
    // Voice input functionality
    console.log('Voice input not implemented yet');
  }
  
  insertCodeBlock() {
    const input = document.getElementById('ultimateAIInput');
    const before = input.value.substring(0, input.selectionStart);
    const after = input.value.substring(input.selectionEnd);
    input.value = before + '```\n\n```' + after;
    input.focus();
    input.setSelectionRange(before.length + 3, before.length + 3);
  }
  
  formatText() {
    // Text formatting functionality
    console.log('Text formatting not implemented yet');
  }
}

// Initialize Ultimate AI when DOM is loaded
document.addEventListener('DOMContentLoaded', async function() {
  console.log('🤖 AI Script DOMContentLoaded fired');
  console.log('🤖 window.ENV exists:', !!window.ENV);
  console.log('🤖 window.ENV.API7 exists:', !!(window.ENV && window.ENV.API7));
  console.log('🤖 window.ENV.API7 value:', window.ENV && window.ENV.API7 ? window.ENV.API7.substring(0, 10) + '...' : 'undefined');
  
  // Wait for environment variables to be loaded
  let attempts = 0;
  const maxAttempts = 50;
  
  while ((!window.ENV || !window.ENV.API7 || window.ENV.API7 === 'SEVENTH_API_KEY') && attempts < maxAttempts) {
    console.log(`Waiting for environment variables... attempt ${attempts + 1}/${maxAttempts}`);
    console.log('Current API7:', window.ENV && window.ENV.API7 ? window.ENV.API7.substring(0, 10) + '...' : 'undefined');
    await new Promise(resolve => setTimeout(resolve, 100));
    attempts++;
  }
  
  console.log(`🤖 Wait loop completed after ${attempts} attempts`);
  console.log('🤖 Final API7 value:', window.ENV && window.ENV.API7 ? window.ENV.API7.substring(0, 10) + '...' : 'undefined');
  console.log('🤖 API7 length:', window.ENV && window.ENV.API7 ? window.ENV.API7.length : 0);
  
  if (!window.ENV || !window.ENV.API7 || window.ENV.API7 === 'SEVENTH_API_KEY') {
    console.warn('⚠️ Environment variables not loaded after waiting, using defaults');
  } else {
    console.log('✅ Environment variables loaded, initializing AI');
    console.log('API7 value (first 10 chars):', window.ENV.API7.substring(0, 10) + '...');
  }
  
  window.ultimateAI = new UltimateAI();
  console.log('Ultimate AI Assistant loaded successfully!');
});
