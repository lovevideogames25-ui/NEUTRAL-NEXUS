// Neural Nexus AI - Core Functionality
// API Fallback System: API → API2 → API3 → Error

class NeuralNexusAI {
    constructor() {
        this.selectedModel = null;
        this.currentAPI = 1; // 1: API, 2: API2, 3: API3
        this.models = {};
        this.loadModels();
    }

    async loadModels() {
        try {
            // Try different paths for static site compatibility
            let modelPath = '/ai/models/models.json';
            
            // If running from file:// protocol, use relative path
            if (window.location.protocol === 'file:') {
                modelPath = './ai/models/models.json';
            }
            
            // Try to load individual model files as fallback
            try {
                const response = await fetch(modelPath);
                this.models = await response.json();
                console.log('🤖 AI Models loaded from models.json:', this.models);
            } catch (jsonError) {
                console.log('🔄 Falling back to individual model files...');
                // Fallback to individual model files
                await this.loadIndividualModels();
            }
        } catch (error) {
            console.error('❌ Failed to load models:', error);
            // Use hardcoded fallback for static sites
            this.models = await this.getStaticModels();
        }
    }

    async loadIndividualModels() {
        try {
            // Try to load GPT-OSS-20B model file
            const modelResponse = await fetch('./ai/models/gpt-oss-20b.json');
            if (modelResponse.ok) {
                const modelData = await modelResponse.json();
                this.models[modelData.id] = modelData;
                console.log('🤖 Individual model loaded:', modelData.name);
            }
        } catch (error) {
            console.log('❌ Could not load individual model files');
        }
    }

    async getStaticModels() {
        // Static fallback for file:// URLs
        return {
            'gpt-oss-20b': {
                "id": "gpt-oss-20b",
                "name": "GPT-OSS-20B",
                "displayName": "GPT-OSS (FASTER)",
                "provider": "openrouter",
                "model": "openai/gpt-oss-20b:free",
                "api_key": "API",
                "description": "Fast open-source model with reasoning capabilities",
                "icon": "⚡",
                "badge": "free",
                "stats": ["⚡ Lightning Fast", "🧠 Reasoning", "🆓 Free"],
                "features": {
                    "streaming": true,
                    "reasoning_tokens": true,
                    "usage_tracking": true
                },
                "fallback_order": 1
            }
        };
    }

    async sendMessage(message, modelId) {
        this.selectedModel = this.models[modelId];
        if (!this.selectedModel) {
            throw new Error('Model not found');
        }

        console.log(`🤖 Sending message to ${this.selectedModel.name} using API${this.currentAPI}`);

        // Try API fallback chain
        for (let attempt = 1; attempt <= 3; attempt++) {
            try {
                const result = await this.tryAPI(message, attempt);
                return result;
            } catch (error) {
                console.error(`❌ API${attempt} failed:`, error.message);
                if (attempt === 3) {
                    throw new Error('SORRY I HAVE ENCOUNTERED AN ERROR');
                }
            }
        }
    }

    async tryAPI(message, apiNumber) {
        const apiKey = this.getAPIKey(apiNumber);
        const provider = this.getProvider(apiNumber);
        
        console.log(`🔄 Trying API${apiNumber} (${provider})...`);
        
        // This will be implemented with actual API calls
        // For now, return a placeholder
        return {
            success: true,
            provider: provider,
            model: this.selectedModel.name,
            response: "Model system initialized - waiting for API implementation"
        };
    }

    getAPIKey(apiNumber) {
        const keys = {
            1: process.env.API,
            2: process.env.API2,
            3: process.env.API3
        };
        return keys[apiNumber];
    }

    getProvider(apiNumber) {
        const providers = {
            1: 'OpenRouter',
            2: 'HuggingFace',
            3: 'Replicate'
        };
        return providers[apiNumber];
    }
}

// Global AI instance
window.neuralNexusAI = new NeuralNexusAI();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🤖 Neural Nexus AI initialized');
    window.neuralNexusAI.loadModels();
});
