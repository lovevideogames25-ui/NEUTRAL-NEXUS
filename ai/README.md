# Neural Nexus AI

## 🤖 AI System Architecture

### 📁 Folder Structure

```
ai/
├── models/
│   └── models.json          # Model configurations and metadata
├── scripts/
│   └── ai-core.js          # Core AI functionality and API fallback
├── styles/
│   └── ai-components.css    # AI-specific component styles
├── components/
│   └── ai-components.js    # Reusable AI components
└── README.md               # This file
```

### 🚀 Current Status

- **UI**: ✅ Complete modern interface
- **Models**: ✅ 1 model available (GPT-OSS-20B)
- **API Integration**: 🔄 Core system ready
- **Components**: ✅ Modular architecture

### 🎯 Implemented Features

#### **1. Model Management**
- ✅ **models.json** - Centralized model configuration
- ✅ **Dynamic loading** - Models loaded from JSON
- ✅ **Metadata** - Icons, badges, descriptions, stats
- ✅ **Fallback order** - API priority system

#### **2. API Fallback System**
- ✅ **Three-tier fallback** - API → API2 → API3
- ✅ **Error handling** - Graceful failure management
- ✅ **Provider abstraction** - OpenRouter, HuggingFace, Replicate
- ✅ **Security** - Generic API key naming

#### **3. Component Architecture**
- ✅ **AIChatComponent** - Reusable chat interface
- ✅ **AIModelSelector** - Dynamic model selection
- ✅ **Modular design** - Easy to extend
- ✅ **Event handling** - Proper user interactions

#### **4. Styling System**
- ✅ **Component styles** - Dedicated CSS for AI components
- ✅ **Animations** - Selection, loading, typing indicators
- ✅ **Status indicators** - API success/error states
- ✅ **Responsive design** - Mobile-friendly

### 🔧 API Configuration

#### **Environment Variables:**
```env
API=MY_API          # OpenRouter (Primary)
API2=SECOND_API_KEY  # HuggingFace (Secondary)
API3=THIRD_API_KEY   # Replicate (Tertiary)
```

#### **Fallback Logic:**
1. **Try API (OpenRouter)** first
2. **If ANY error → Try API2 (HuggingFace)**
3. **If API2 fails → Try API3 (Replicate)**
4. **If all fail → Show "SORRY I HAVE ENCOUNTERED AN ERROR"**

### 📋 Model Configuration

#### **GPT-OSS-20B:**
```json
{
  "name": "GPT-OSS-20B",
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
```

### 🛠️ Development Usage

#### **Initialize AI System:**
```javascript
// Core AI instance
const ai = new NeuralNexusAI();

// Send message with fallback
const response = await ai.sendMessage(message, 'gpt-oss-20b');

// Chat component
const chat = new AIChatComponent('chatContainer');

// Model selector
const selector = new AIModelSelector('modelContainer');
```

### � Next Steps

1. **Add more models** to models.json
2. **Implement API calls** in ai-core.js
3. **Add streaming support** for real-time responses
4. **Enhance error handling** with specific error types
5. **Add conversation history** persistence

---

**Neural Nexus AI - Advanced AI Assistant Platform**  
*Modular • Secure • Reliable*
