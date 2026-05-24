// Update Popup System
function createUpdatePopup() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'update-popup-overlay';
    overlay.id = 'updatePopupOverlay';
    
    // Create popup
    const popup = document.createElement('div');
    popup.className = 'update-popup';
    
    // Create header
    const header = document.createElement('div');
    header.className = 'update-popup-header';
    header.innerHTML = `
        <h2 class="update-popup-title">
            <span>🎉</span>
            <span>v0.7.0 - Major System Update</span>
        </h2>
        <p class="update-popup-subtitle">Complete AI system overhaul with multi-provider support and major fixes</p>
        <button class="update-popup-close" onclick="closeUpdatePopup()">✕</button>
    `;
    
    // Create content
    const content = document.createElement('div');
    content.className = 'update-popup-content';
    content.innerHTML = `
        <div class="update-section">
            <h3 class="update-section-title">
                <span>🚀</span>
                <span>Major AI System Overhaul</span>
            </h3>
            <div class="update-item">
                <span class="update-item-icon">�</span>
                <div class="update-item-content">
                    <div class="update-item-title">Multi-Provider Support</div>
                    <div class="update-item-description">Complete AI system overhaul with OpenRouter, HuggingFace, Replicate, and LockLLM support</div>
                </div>
            </div>
            <div class="update-item">
                <span class="update-item-icon">⚡</span>
                <div class="update-item-content">
                    <div class="update-item-title">Advanced API Fallback</div>
                    <div class="update-item-description">Smart fallback system - OpenRouter → HuggingFace → Replicate → LockLLM</div>
                </div>
            </div>
            <div class="update-item">
                <span class="update-item-icon">🎯</span>
                <div class="update-item-content">
                    <div class="update-item-title">Real-Time Model Switching</div>
                    <div class="update-item-description">Instant switching between GEMMA-3, GPT-OSS-20b, GPT-OSS-120b models</div>
                </div>
            </div>
            <div class="update-item">
                <span class="update-item-icon">�</span>
                <div class="update-item-content">
                    <div class="update-item-title">Enhanced Code Detection</div>
                    <div class="update-item-description">Language-specific expert modes with improved code recognition</div>
                </div>
            </div>
            <div class="update-item">
                <span class="update-item-icon">🔧</span>
                <div class="update-item-content">
                    <div class="update-item-title">Performance Improvements</div>
                    <div class="update-item-description">Removed fallback chains for better performance and direct API switching</div>
                </div>
            </div>
        </div>

        <div class="update-section">
            <h3 class="update-section-title">
                <span>🎨</span>
                <span>UI/UX & Features</span>
            </h3>
            <div class="update-item">
                <span class="update-item-icon">✨</span>
                <div class="update-item-content">
                    <div class="update-item-title">NEW Badge System</div>
                    <div class="update-item-description">Added visual indicators for new features and AI menu items</div>
                </div>
            </div>
            <div class="update-item">
                <span class="update-item-icon">�</span>
                <div class="update-item-content">
                    <div class="update-item-title">Updated License Links</div>
                    <div class="update-item-description">Fixed GitHub repository links and updated license information</div>
                </div>
            </div>
            <div class="update-item">
                <span class="update-item-icon">�</span>
                <div class="update-item-content">
                    <div class="update-item-title">Discord Integration</div>
                    <div class="update-item-description">Added Discord widget with server ID 1487910769776394343 and channel integration</div>
                </div>
            </div>
            <div class="update-item">
                <span class="update-item-icon">🛠️</span>
                <div class="update-item-content">
                    <div class="update-item-title">Better Error Handling</div>
                    <div class="update-item-description">Improved error messages and user feedback throughout the system</div>
                </div>
            </div>
        </div>

        <div class="update-section">
            <h3 class="update-section-title">
                <span>🦙</span>
                <span>Bonus: Llama Models Added</span>
            </h3>
            <div class="update-item">
                <span class="update-item-icon">🚀</span>
                <div class="update-item-content">
                    <div class="update-item-title">LLAMA-3.2-3B</div>
                    <div class="update-item-description">Ultra-fast lightweight model with 3B parameters for quick responses</div>
                </div>
            </div>
            <div class="update-item">
                <span class="update-item-icon">🧠</span>
                <div class="update-item-content">
                    <div class="update-item-title">LLAMA-3.3-70B</div>
                    <div class="update-item-description">Advanced large-scale model with 70B parameters for complex reasoning</div>
                </div>
            </div>
            <div class="update-item">
                <span class="update-item-icon">�</span>
                <div class="update-item-content">
                    <div class="update-item-title">Model Count Update</div>
                    <div class="update-item-description">Expanded from 6 to 8 available AI models in the selection panel</div>
                </div>
            </div>
        </div>

        <div class="update-section">
            <h3 class="update-section-title">
                <span>💬</span>
                <span>Chat System Enhancements</span>
            </h3>
            <div class="update-item">
                <span class="update-item-icon">�</span>
                <div class="update-item-content">
                    <div class="update-item-title">Chat Export Feature</div>
                    <div class="update-item-description">Export your conversations as JSON files for backup and sharing</div>
                </div>
            </div>
            <div class="update-item">
                <span class="update-item-icon">📤</span>
                <div class="update-item-content">
                    <div class="update-item-title">Chat Import Feature</div>
                    <div class="update-item-description">Load previous conversations from JSON files with full message restoration</div>
                </div>
            </div>
            <div class="update-item">
                <span class="update-item-icon">🛡️</span>
                <div class="update-item-content">
                    <div class="update-item-title">AI Model Credits</div>
                    <div class="update-item-description">Added comprehensive credits and legal compliance for all AI providers</div>
                </div>
            </div>
        </div>
    `;
    
    // Create footer
    const footer = document.createElement('div');
    footer.className = 'update-popup-footer';
    footer.innerHTML = `
        <div class="update-popup-buttons">
            <button class="update-popup-btn" onclick="closeUpdatePopup()">Got it!</button>
            <button class="update-popup-btn primary" onclick="closeUpdatePopup(); window.location.hash='ai'">Try AI System</button>
        </div>
    `;
    
    // Assemble popup
    popup.appendChild(header);
    popup.appendChild(content);
    popup.appendChild(footer);
    overlay.appendChild(popup);
    
    // Add to body
    document.body.appendChild(overlay);
    
    // Add click outside to close
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeUpdatePopup();
        }
    });
    
    // Add escape key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeUpdatePopup();
        }
    });
    
    return overlay;
}

function showUpdatePopup() {
    let popup = document.getElementById('updatePopupOverlay');
    
    if (!popup) {
        popup = createUpdatePopup();
    }
    
    setTimeout(() => {
        popup.classList.add('active');
    }, 100);
}

function closeUpdatePopup() {
    const popup = document.getElementById('updatePopupOverlay');
    if (popup) {
        popup.classList.remove('active');
    }
}

// Auto-show popup after page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎉 v0.7.0 BETA Update popup system ready');
    
    // Show popup after 4 seconds (after main app loads)
    setTimeout(() => {
        showUpdatePopup();
    }, 4000);
});
