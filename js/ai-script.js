// Ultimate AI Section JavaScript
class UltimateAI {
  constructor() {
    this.currentModel = 'gpt-oss-20b';
    this.chatHistory = [];
    this.isTyping = false;
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
    
    // Category tabs
    document.querySelectorAll('.category-tab').forEach(tab => {
      tab.addEventListener('click', (e) => this.filterModels(e.target.dataset.category));
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
        name: 'MISTRAL-SMALL-3.1',
        description: 'Mistral\'s efficient model with strong performance for general tasks',
        api: 'cloudflare'
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
    document.querySelectorAll('.model-card').forEach(card => {
      if (category === 'all' || card.dataset.category.includes(category)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
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

      // Use GitHub AI inference endpoint
      const response = await fetch('https://models.github.ai/inference/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'X-GitHub-Api-Version': '2024-08-01'
        },
        body: JSON.stringify({
          model: 'openai/gpt-4o-mini',
          messages: [
            { role: 'user', content: message }
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
        model: 'gpt-4o-mini',
        response: data.choices[0].message.content,
        timestamp: new Date().toISOString(),
        status: 'success'
      };
      
    } catch (error) {
      console.error('Error calling GitHub AI:', error);
      
      return {
        model: 'gpt-4o-mini',
        response: `GitHub AI Error: ${error.message}`,
        timestamp: new Date().toISOString(),
        status: 'error'
      };
    }
  }
  
  async sendMessage() {
    const input = document.getElementById('ultimateAIInput');
    const message = input.value.trim();
    
    if (!message || this.isTyping) return;
    
    // Add user message
    this.addMessage(message, 'user');
    input.value = '';
    this.updateCharCount();
    
    // Show typing indicator
    this.showTypingIndicator();
    this.isTyping = true;
    
    try {
      let response;
      
      if (this.currentModel === 'ultimate-ai-v1' || this.currentModel === 'ultimate-ai-v1-alpha') {
        // Use local ULTIMATE-AI-V1 model
        response = await this.callLocalAI(message);
      } else if (this.currentModel === 'gpt-4o-mini') {
        // Use GitHub AI API exclusively for GPT-4o-mini (no fallback to other APIs)
        response = await this.callGitHubAI(message);
      } else {
        // Use existing AI system with external APIs (OpenRouter, Replicate, etc.)
        window.selectedAIModel = this.currentModel;
        response = await window.tryDirectAPI(message, false, false);
      }
      
      // Add AI response
      this.addMessage(response.response || response, 'ai');
      
    } catch (error) {
      this.addMessage(`Error: ${error.message}`, 'error');
    } finally {
      this.hideTypingIndicator();
      this.isTyping = false;
      
      // Auto-save if enabled
      if (this.settings.autoSave) {
        this.saveChat();
      }
    }
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
    
    return responses[Math.floor(Math.random() * responses.length)] + " (This is a simulated response. In production, this would connect to the actual AI API.)";
  }
  
  addMessage(content, type) {
    const container = document.getElementById('chatMessagesContainer');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${type}`;
    
    if (type === 'user') {
      messageDiv.innerHTML = `
        <div class="message-avatar">You</div>
        <div class="message-content">${this.escapeHtml(content)}</div>
      `;
    } else if (type === 'ai') {
      messageDiv.innerHTML = `
        <div class="message-avatar">${this.getModelDetails(this.currentModel).icon}</div>
        <div class="message-content">${this.formatMessage(content)}</div>
      `;
    } else if (type === 'error') {
      messageDiv.innerHTML = `
        <div class="message-avatar">!</div>
        <div class="message-content error">${this.escapeHtml(content)}</div>
      `;
    }
    
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
    
    // Add to history
    this.chatHistory.push({ content, type, timestamp: Date.now() });
  }
  
  showTypingIndicator() {
    const container = document.getElementById('chatMessagesContainer');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message typing';
    typingDiv.innerHTML = `
      <div class="message-avatar">...</div>
      <div class="message-content">
        <div class="typing-dots">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;
    container.appendChild(typingDiv);
    container.scrollTop = container.scrollHeight;
  }
  
  hideTypingIndicator() {
    const typingIndicator = document.querySelector('.chat-message.typing');
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
    const sendBtn = document.getElementById('ultimateAISendBtn');
    
    if (input && charCount) {
      const count = input.value.length;
      charCount.textContent = `${count} / 4000`;
      
      if (sendBtn) {
        sendBtn.disabled = count === 0 || this.isTyping;
      }
    }
  }
  
  newChat() {
    this.chatHistory = [];
    const container = document.getElementById('chatMessagesContainer');
    container.innerHTML = `
      <div class="chat-welcome">
        <div class="welcome-icon">AI</div>
        <h3>Welcome to Ultimate AI Assistant</h3>
        <p>I can help you with coding, analysis, creative writing, and much more. Choose a model above and start chatting!</p>
        <div class="quick-actions">
          <button class="quick-action-btn" data-prompt="Help me write a Python function">Code Help</button>
          <button class="quick-action-btn" data-prompt="Analyze this data and provide insights">Data Analysis</button>
          <button class="quick-action-btn" data-prompt="Write a creative story">Creative Writing</button>
          <button class="quick-action-btn" data-prompt="Explain quantum computing simply">Learning</button>
        </div>
      </div>
    `;
    
    // Re-attach quick action listeners
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
    const container = document.getElementById('chatMessagesContainer');
    if (!container) return;
    
    // Clear existing messages except welcome
    const welcome = container.querySelector('.chat-welcome');
    container.innerHTML = '';
    
    if (welcome) {
      container.appendChild(welcome);
    }
    
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
    // File attachment functionality
    console.log('File attachment not implemented yet');
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
