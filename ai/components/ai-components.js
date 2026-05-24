// AI Chat Component
class AIChatComponent {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.messages = [];
        this.isTyping = false;
        this.init();
    }

    init() {
        this.createChatHTML();
        this.bindEvents();
    }

    createChatHTML() {
        this.container.innerHTML = `
            <div class="ai-chat-interface">
                <div class="chat-messages" id="chatMessages"></div>
                <div class="chat-input-area">
                    <textarea 
                        id="chatInput" 
                        placeholder="Type your message..."
                        maxlength="4000"
                    ></textarea>
                    <button id="sendMessage" class="send-btn">Send</button>
                </div>
            </div>
        `;
    }

    bindEvents() {
        const input = document.getElementById('chatInput');
        const sendBtn = document.getElementById('sendMessage');

        sendBtn.addEventListener('click', () => this.sendMessage());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
    }

    async sendMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        
        if (!message || this.isTyping) return;

        this.addMessage(message, 'user');
        input.value = '';
        this.showTypingIndicator();

        try {
            const response = await window.neuralNexusAI.sendMessage(
                message, 
                window.selectedAIModel
            );
            this.hideTypingIndicator();
            this.addMessage(response.response, 'ai');
        } catch (error) {
            this.hideTypingIndicator();
            this.showError(error.message);
        }
    }

    addMessage(content, type) {
        const messagesDiv = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `ai-message ${type}-message`;
        messageDiv.innerHTML = `
            <div class="message-content">${content}</div>
            <div class="message-time">${new Date().toLocaleTimeString()}</div>
        `;
        messagesDiv.appendChild(messageDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    showTypingIndicator() {
        this.isTyping = true;
        const messagesDiv = document.getElementById('chatMessages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        messagesDiv.appendChild(typingDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    hideTypingIndicator() {
        this.isTyping = false;
        const indicator = document.querySelector('.typing-indicator');
        if (indicator) indicator.remove();
    }

    showError(message) {
        const messagesDiv = document.getElementById('chatMessages');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        messagesDiv.appendChild(errorDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
}

// Model Selector Component
class AIModelSelector {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.models = {};
        this.selectedModel = null;
        this.init();
    }

    init() {
        this.loadModels();
    }

    async loadModels() {
        try {
            let modelPath = '/ai/models/models.json';
            
            // If running from file:// protocol, use relative path
            if (window.location.protocol === 'file:') {
                modelPath = './ai/models/models.json';
            }
            
            const response = await fetch(modelPath);
            this.models = await response.json();
            this.renderModels();
        } catch (error) {
            console.error('Failed to load models:', error);
            // Fallback to static model data
            this.models = {
                'gpt-oss-20b': {
                    "name": "GPT-OSS-20B",
                    "provider": "openrouter",
                    "model": "openai/gpt-oss-20b:free",
                    "description": "Fast open-source model with reasoning capabilities",
                    "icon": "⚡",
                    "badge": "free",
                    "stats": ["⚡ Lightning Fast", "🧠 Reasoning", "🆓 Free"]
                }
            };
            this.renderModels();
        }
    }

    renderModels() {
        const modelsGrid = this.container.querySelector('.models-grid');
        modelsGrid.innerHTML = '';

        Object.entries(this.models).forEach(([id, model]) => {
            const modelCard = this.createModelCard(id, model);
            modelsGrid.appendChild(modelCard);
        });
    }

    createModelCard(id, model) {
        const card = document.createElement('div');
        card.className = `model-card ${model.badge}`;
        card.setAttribute('data-model', id);
        card.innerHTML = `
            <div class="model-header">
                <div class="model-icon">${model.icon}</div>
                <div class="model-badge ${model.badge}">${model.badge.toUpperCase()}</div>
            </div>
            <div class="model-info">
                <h4>${model.name}</h4>
                <p>${model.description}</p>
                <div class="model-stats">
                    ${model.stats.map(stat => `<span class="stat">${stat}</span>`).join('')}
                </div>
            </div>
            <div class="model-select-btn">Select</div>
        `;

        card.addEventListener('click', () => this.selectModel(id, card));
        return card;
    }

    selectModel(modelId, cardElement) {
        // Remove previous selection
        document.querySelectorAll('.model-card').forEach(card => {
            card.classList.remove('selected');
        });

        // Add selection to clicked card
        cardElement.classList.add('selected');
        this.selectedModel = modelId;
        window.selectedAIModel = modelId;

        // Update display
        this.updateCurrentModelDisplay(modelId);
    }

    updateCurrentModelDisplay(modelId) {
        const model = this.models[modelId];
        const displayName = document.querySelector('.current-model h4');
        const description = document.querySelector('.current-model p');
        const avatar = document.querySelector('.model-avatar');

        if (displayName) displayName.textContent = model.name;
        if (description) description.textContent = model.description;
        if (avatar) avatar.textContent = model.icon;
    }
}

// Export components
window.AIChatComponent = AIChatComponent;
window.AIModelSelector = AIModelSelector;
