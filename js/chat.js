// Chat System Functions

// Show Chat Section
function showChat() {
    showSection('chat');
    
    // Initialize chat when section is shown
    setTimeout(() => {
        initializeChat();
    }, 100);
}

// Initialize Chat
function initializeChat() {
    const chatWrapper = document.querySelector('.chat-wrapper');
    if (chatWrapper) {
        // Add loading state
        chatWrapper.classList.add('chat-loading');
        
        // Remove loading when widget is ready
        setTimeout(() => {
            chatWrapper.classList.remove('chat-loading');
        }, 3000);
    }
}

// Chat Event Handlers
function setupChatEvents() {
    const chatWrapper = document.querySelector('.chat-wrapper');
    if (chatWrapper) {
        // Add hover effects
        chatWrapper.addEventListener('mouseenter', () => {
            chatWrapper.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        chatWrapper.addEventListener('mouseleave', () => {
            chatWrapper.style.transform = 'translateY(0) scale(1)';
        });
    }
}

// Initialize chat when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setupChatEvents();
});

// Chat notification
function showChatNotification(message) {
    showNotification(message, 'info');
}

console.log('Chat system initialized - Discord integration ready!');
