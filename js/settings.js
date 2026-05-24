// SETTINGS.JS - PREMIUM SETTINGS SYSTEM WITH ACTUAL FUNCTIONALITY

// Global Settings Object - Enhanced with new categories
let settings = {
    theme: 'purple',
    animations: {
        enabled: true,
        loading: true,
        hover: true,
        shimmer: true
    },
    display: {
        compact: false,
        showDescriptions: true,
        cardLayout: true,
        gridColumns: '3'
    },
    notifications: {
        enabled: true,
        soundEffects: false,
        duration: 3000
    },
    performance: {
        preloadImages: true,
        cacheEnabled: true,
        lazyLoading: false,
        reducedMotion: false
    },
    privacy: {
        analyticsEnabled: false,
        cookiesEnabled: true,
        shareData: false,
        incognitoMode: false
    },
    accessibility: {
        highContrast: false,
        largeText: false,
        screenReader: false,
        keyboardNav: true,
        fontSize: 'medium'
    },
    advanced: {
        debugMode: false,
        consoleLogs: false,
        experimentalFeatures: false,
        autoUpdate: true
    },
    personalization: {
        customCSS: '',
        language: 'en',
        timezone: 'auto',
        dateFormat: 'mm/dd/yyyy'
    }
};

// Theme Color Definitions - Fixed to match HTML values// Theme Configuration
const themes = {
    purple: {
        primary: '#8b5cf6',
        secondary: '#6366f1',
        accent: '#4a5568',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        loadingBg: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 50%, #4a5568 100%)',
        navbar: 'rgba(26, 26, 46, 0.95)',
        card: 'rgba(139, 92, 246, 0.1)',
        text: '#ffffff'
    },
    blue: {
        primary: '#3b82f6',
        secondary: '#2563eb',
        accent: '#1e40af',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        loadingBg: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1e40af 100%)',
        navbar: 'rgba(15, 23, 42, 0.95)',
        card: 'rgba(59, 130, 246, 0.1)',
        text: '#ffffff'
    },
    green: {
        primary: '#10b981',
        secondary: '#059669',
        accent: '#047857',
        background: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #0f766e 100%)',
        loadingBg: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)',
        navbar: 'rgba(6, 78, 59, 0.95)',
        card: 'rgba(16, 185, 129, 0.1)',
        text: '#ffffff'
    },
    red: {
        primary: '#ef4444',
        secondary: '#dc2626',
        accent: '#b91c1c',
        background: 'linear-gradient(135deg, #450a0a 0%, #7f1d1d 50%, #991b1b 100%)',
        loadingBg: 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)',
        navbar: 'rgba(127, 29, 29, 0.95)',
        card: 'rgba(239, 68, 68, 0.1)',
        text: '#ffffff'
    },
    dark: {
        primary: '#6b7280',
        secondary: '#4b5563',
        accent: '#374151',
        background: 'linear-gradient(135deg, #111827 0%, #1f2937 50%, #374151 100%)',
        loadingBg: 'linear-gradient(135deg, #6b7280 0%, #4b5563 50%, #374151 100%)',
        navbar: 'rgba(31, 41, 55, 0.95)',
        card: 'rgba(107, 114, 128, 0.1)',
        text: '#ffffff'
    },
    hacking: {
        primary: '#00ff41',
        secondary: '#00cccc',
        accent: '#ff0040',
        background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #1a1a1a 100%)',
        loadingBg: 'linear-gradient(135deg, #000000 0%, #00ff41 25%, #0a0a0a 50%, #00ff41 75%, #000000 100%)',
        navbar: 'rgba(0, 0, 0, 0.95)',
        card: 'rgba(0, 255, 65, 0.05)',
        text: '#00ff41'
    }
};

// Initialize Settings
document.addEventListener('DOMContentLoaded', function() {
    loadSettings();
    applySettings();
    setupSettingsListeners();
    initializeSettingsUI();
});

// Load Settings from localStorage
function loadSettings() {
    const storedSettings = localStorage.getItem('neutralNexus_settings');
    if (storedSettings) {
        try {
            const loadedSettings = JSON.parse(storedSettings);
            settings = mergeDeep(settings, loadedSettings);
        } catch (error) {
            console.error('Error loading settings:', error);
            showNotification('Error loading settings', 'error');
        }
    }
}

// Deep merge objects
function mergeDeep(target, source) {
    const output = { ...target };
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
            if (isObject(source[key])) {
                if (!(key in target)) {
                    Object.assign(output, { [key]: source[key] });
                } else {
                    output[key] = mergeDeep(target[key], source[key]);
                }
            } else {
                Object.assign(output, { [key]: source[key] });
            }
        });
    }
    return output;
}

function isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
}

// Save Settings to localStorage
function saveSettings() {
    try {
        localStorage.setItem('neutralNexus_settings', JSON.stringify(settings));
        applySettings();
        showNotification('Settings saved successfully! 🎉', 'success');
        addSaveAnimation();
    } catch (error) {
        console.error('Error saving settings:', error);
        showNotification('Error saving settings', 'error');
    }
}

// Apply Settings to the UI - Enhanced with new categories
function applySettings() {
    applyTheme();
    applyAnimations();
    applyDisplaySettings();
    applyNotificationSettings();
    applyPerformanceSettings();
    applyPrivacySettings();
    applyAccessibilitySettings();
    applyAdvancedSettings();
    applyPersonalizationSettings();
    updateSettingsUI();
}

// Apply Theme with Real Changes
function applyTheme() {
    const theme = themes[settings.theme] || themes.purple;
    const root = document.documentElement;
    
    console.log('Applying theme:', settings.theme, theme);
    
    // Handle hacking theme specially
    if (settings.theme === 'hacking') {
        console.log('🖥️ Applying hacking theme');
        
        // Remove existing theme CSS
        const existingThemeLink = document.getElementById('theme-css');
        if (existingThemeLink) {
            existingThemeLink.remove();
        }
        
        // Add hacking theme CSS
        const themeLink = document.createElement('link');
        themeLink.id = 'theme-css';
        themeLink.rel = 'stylesheet';
        themeLink.href = 'theme-packs/hacking.css';
        document.head.appendChild(themeLink);
        
        // Add hacking theme class to body
        document.body.classList.add('hacking-theme');
        
        // Apply CSS custom properties as fallback
        root.style.setProperty('--primary-color', theme.primary);
        root.style.setProperty('--secondary-color', theme.secondary);
        root.style.setProperty('--accent-color', theme.accent);
        root.style.setProperty('--theme-background', theme.background);
        root.style.setProperty('--theme-navbar', theme.navbar);
        root.style.setProperty('--theme-card', theme.card);
        root.style.setProperty('--theme-text', theme.text);
        
        console.log('✅ Hacking theme applied successfully');
    } else {
        // Remove hacking theme class if not hacking
        document.body.classList.remove('hacking-theme');
        
        // Remove any existing theme CSS
        const existingThemeLink = document.getElementById('theme-css');
        if (existingThemeLink) {
            existingThemeLink.remove();
        }
        
        // Apply CSS custom properties for regular themes
        root.style.setProperty('--primary-color', theme.primary);
        root.style.setProperty('--secondary-color', theme.secondary);
        root.style.setProperty('--accent-color', theme.accent);
        root.style.setProperty('--theme-background', theme.background);
        root.style.setProperty('--theme-navbar', theme.navbar);
        root.style.setProperty('--theme-card', theme.card);
        root.style.setProperty('--theme-text', theme.text);
    }
    
    // Update body background with transition
    document.body.style.background = theme.background;
    document.body.style.transition = 'background 0.5s ease';
    
    // Update loading screen theme
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        loadingScreen.style.background = theme.loadingBg;
        loadingScreen.style.transition = 'background 0.5s ease';
    }
    
    // Update navbar theme
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.background = theme.navbar;
        navbar.style.transition = 'background 0.5s ease';
    }
    
    // Update all cards
    document.querySelectorAll('.feature-card, .category-card, .link-card, .stat-item').forEach(card => {
        card.style.background = theme.card;
        card.style.transition = 'background 0.5s ease';
    });
    
    // Update buttons
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.style.background = `linear-gradient(135deg, ${theme.accent}, ${theme.primary})`;
        btn.style.transition = 'background 0.5s ease';
    });
    
    // Force update of all theme-dependent elements
    updateAllThemeElements(theme);
}

function updateAllThemeElements(theme) {
    // Update any dynamic elements that might not get the new theme
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
        if (getComputedStyle(el).background.includes('var(')) {
            // Force recalculation of CSS variables
            el.style.background = getComputedStyle(el).background;
        }
    });
}

// Apply Animation Settings
function applyAnimations() {
    const body = document.body;
    
    if (!settings.animations.enabled) {
        body.classList.add('no-animations');
        disableAllAnimations();
    } else {
        body.classList.remove('no-animations');
        enableAllAnimations();
    }
    
    // Loading animations
    if (!settings.animations.loading) {
        body.classList.add('no-loading-animations');
        disableLoadingAnimations();
    } else {
        body.classList.remove('no-loading-animations');
        enableLoadingAnimations();
    }
    
    // Hover effects
    if (!settings.animations.hover) {
        body.classList.add('no-hover-effects');
        disableHoverEffects();
    } else {
        body.classList.remove('no-hover-effects');
        enableHoverEffects();
    }
    
    // Shimmer effects
    if (!settings.animations.shimmer) {
        body.classList.add('no-shimmer-effects');
        disableShimmerEffects();
    } else {
        body.classList.remove('no-shimmer-effects');
        enableShimmerEffects();
    }
}

// Apply Display Settings
function applyDisplaySettings() {
    const body = document.body;
    
    // Compact view
    if (settings.display.compact) {
        body.classList.add('compact-view');
        applyCompactView();
    } else {
        body.classList.remove('compact-view');
        removeCompactView();
    }
    
    // Show descriptions
    if (!settings.display.showDescriptions) {
        body.classList.add('hide-descriptions');
        hideDescriptions();
    } else {
        body.classList.remove('hide-descriptions');
        showDescriptions();
    }
    
    // Card layout
    if (!settings.display.cardLayout) {
        body.classList.add('no-card-layout');
        applyListLayout();
    } else {
        body.classList.remove('no-card-layout');
        applyCardLayout();
    }
    
    // Grid columns
    applyGridColumns();
}

// Apply Notification Settings
function applyNotificationSettings() {
    // Update notification duration
    const style = document.createElement('style');
    style.id = 'notification-duration-style';
    style.textContent = `
        .notification {
            animation-duration: ${settings.notifications.duration}ms;
        }
    `;
    
    // Remove existing style
    const existingStyle = document.getElementById('notification-duration-style');
    if (existingStyle) {
        existingStyle.remove();
    }
    
    // Add new style
    document.head.appendChild(style);
}

// Apply Performance Settings
function applyPerformanceSettings() {
    const body = document.body;
    
    // Reduced motion
    if (settings.performance.reducedMotion) {
        body.classList.add('reduced-motion');
        applyReducedMotion();
    } else {
        body.classList.remove('reduced-motion');
        removeReducedMotion();
    }
    
    // Lazy loading
    if (settings.performance.lazyLoading) {
        body.classList.add('lazy-loading');
        enableLazyLoading();
    } else {
        body.classList.remove('lazy-loading');
        disableLazyLoading();
    }
}

// Animation Control Functions
function disableAllAnimations() {
    const style = document.createElement('style');
    style.id = 'no-animations-style';
    style.textContent = `
        * {
            animation: none !important;
            transition: none !important;
        }
    `;
    document.head.appendChild(style);
}

function enableAllAnimations() {
    const style = document.getElementById('no-animations-style');
    if (style) style.remove();
}

function disableLoadingAnimations() {
    document.querySelectorAll('.loading-logo, .progress-fill').forEach(el => {
        el.style.animation = 'none';
    });
}

function enableLoadingAnimations() {
    document.querySelectorAll('.loading-logo').forEach(el => {
        el.style.animation = '';
    });
}

function disableHoverEffects() {
    const style = document.createElement('style');
    style.id = 'no-hover-style';
    style.textContent = `
        *:hover {
            transform: none !important;
            box-shadow: none !important;
        }
    `;
    document.head.appendChild(style);
}

function enableHoverEffects() {
    const style = document.getElementById('no-hover-style');
    if (style) style.remove();
}

function disableShimmerEffects() {
    document.querySelectorAll('[class*="shimmer"]').forEach(el => {
        el.style.animation = 'none';
    });
}

function enableShimmerEffects() {
    document.querySelectorAll('[class*="shimmer"]').forEach(el => {
        el.style.animation = '';
    });
}

// Display Control Functions
function applyCompactView() {
    document.querySelectorAll('.feature-card, .category-card, .link-card').forEach(card => {
        card.style.padding = '20px';
        card.style.margin = '10px 0';
    });
}

function removeCompactView() {
    document.querySelectorAll('.feature-card, .category-card, .link-card').forEach(card => {
        card.style.padding = '';
        card.style.margin = '';
    });
}

function hideDescriptions() {
    document.querySelectorAll('.hero-description, .feature-card p, .category-card p').forEach(desc => {
        desc.style.display = 'none';
    });
}

function showDescriptions() {
    document.querySelectorAll('.hero-description, .feature-card p, .category-card p').forEach(desc => {
        desc.style.display = '';
    });
}

function applyListLayout() {
    document.querySelectorAll('.categories-grid, .features-grid').forEach(grid => {
        grid.style.display = 'block';
    });
}

function applyCardLayout() {
    document.querySelectorAll('.categories-grid, .features-grid').forEach(grid => {
        grid.style.display = 'grid';
    });
}

function applyGridColumns() {
    const grids = document.querySelectorAll('.categories-grid, .features-grid, .links-container');
    const columns = settings.display.gridColumns;
    
    grids.forEach(grid => {
        if (columns === 'auto') {
            grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(250px, 1fr))';
        } else {
            grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
        }
    });
}

function applyReducedMotion() {
    const style = document.createElement('style');
    style.id = 'reduced-motion-style';
    style.textContent = `
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
}

function removeReducedMotion() {
    const style = document.getElementById('reduced-motion-style');
    if (style) style.remove();
}

function enableLazyLoading() {
    // Implement lazy loading for images
    document.querySelectorAll('img').forEach(img => {
        img.loading = 'lazy';
    });
}

function disableLazyLoading() {
    document.querySelectorAll('img').forEach(img => {
        img.loading = 'eager';
    });
}

// Apply Privacy Settings
function applyPrivacySettings() {
    const body = document.body;
    
    // Analytics
    if (!settings.privacy.analyticsEnabled) {
        body.classList.add('no-analytics');
    } else {
        body.classList.remove('no-analytics');
    }
    
    // Cookies
    if (!settings.privacy.cookiesEnabled) {
        body.classList.add('no-cookies');
    } else {
        body.classList.remove('no-cookies');
    }
    
    // Incognito mode
    if (settings.privacy.incognitoMode) {
        body.classList.add('incognito-mode');
        // Clear local storage in incognito mode
        if (!localStorage.getItem('incognito_warning')) {
            showNotification('Incognito mode enabled - data won\'t be saved', 'warning');
            localStorage.setItem('incognito_warning', 'true');
        }
    } else {
        body.classList.remove('incognito-mode');
    }
}

// Apply Accessibility Settings
function applyAccessibilitySettings() {
    const body = document.body;
    
    // High contrast
    if (settings.accessibility.highContrast) {
        body.classList.add('high-contrast');
        applyHighContrast();
    } else {
        body.classList.remove('high-contrast');
        removeHighContrast();
    }
    
    // Large text
    if (settings.accessibility.largeText) {
        body.classList.add('large-text-mode');
        applyLargeText();
    } else {
        body.classList.remove('large-text-mode');
        removeLargeText();
    }
    
    // Font size
    applyFontSize();
    
    // Screen reader
    if (settings.accessibility.screenReader) {
        body.classList.add('screen-reader-mode');
        addScreenReaderSupport();
    } else {
        body.classList.remove('screen-reader-mode');
        removeScreenReaderSupport();
    }
    
    // Keyboard navigation
    if (settings.accessibility.keyboardNav) {
        body.classList.add('keyboard-nav');
        enableKeyboardNavigation();
    } else {
        body.classList.remove('keyboard-nav');
        disableKeyboardNavigation();
    }
}

// Apply Advanced Settings
function applyAdvancedSettings() {
    const body = document.body;
    
    // Debug mode
    if (settings.advanced.debugMode) {
        body.classList.add('debug-mode');
        enableDebugMode();
    } else {
        body.classList.remove('debug-mode');
        disableDebugMode();
    }
    
    // Console logs
    if (settings.advanced.consoleLogs) {
        body.classList.add('console-logs');
        enableConsoleLogs();
    } else {
        body.classList.remove('console-logs');
        disableConsoleLogs();
    }
    
    // Experimental features
    if (settings.advanced.experimentalFeatures) {
        body.classList.add('experimental-features');
        enableExperimentalFeatures();
    } else {
        body.classList.remove('experimental-features');
        disableExperimentalFeatures();
    }
}

// Apply Personalization Settings
function applyPersonalizationSettings() {
    const body = document.body;
    
    // Custom CSS
    if (settings.personalization.customCSS) {
        applyCustomCSS();
    } else {
        removeCustomCSS();
    }
    
    // Language
    applyLanguage();
    
    // Timezone
    applyTimezone();
    
    // Date format
    applyDateFormat();
}

// Apply Security Settings
function applySecuritySettings() {
    const body = document.body;
    
    // Remove HTTP websites
    if (settings.security.removeHttp) {
        body.classList.add('remove-http-enabled');
        removeHttpWebsites();
        showSecurityNotification('Non-secure HTTP websites removed', 'success');
    } else {
        body.classList.remove('remove-http-enabled');
        restoreHttpWebsites();
        showSecurityNotification('HTTP websites restored', 'info');
    }
    
    // Force HTTPS
    if (settings.security.forceHttps) {
        body.classList.add('force-https');
        forceHttpsConnections();
    } else {
        body.classList.remove('force-https');
        // Note: We don't restore HTTP links here as it would be complex to track original URLs
    }
    
    // Block tracking
    if (settings.security.blockTracking) {
        body.classList.add('block-tracking');
        blockTrackingScripts();
    } else {
        body.classList.remove('block-tracking');
        unblockTrackingScripts();
    }
    
    // Safe browsing
    if (settings.security.safeBrowsing) {
        body.classList.add('safe-browsing');
        enableSafeBrowsing();
    } else {
        body.classList.remove('safe-browsing');
        disableSafeBrowsing();
    }
    
    // Verify certificates
    if (settings.security.verifyCertificates) {
        body.classList.add('verify-certificates');
        enableCertificateVerification();
    } else {
        body.classList.remove('verify-certificates');
        disableCertificateVerification();
    }
    
    // Update security status indicator
    updateSecurityStatus();
}

// Update Security Status Indicator
function updateSecurityStatus() {
    // Remove existing status
    const existingStatus = document.querySelector('.security-status');
    if (existingStatus) {
        existingStatus.remove();
    }
    
    // Calculate security level
    let securityScore = 0;
    let maxScore = 5;
    
    if (settings.security.removeHttp) securityScore++;
    if (settings.security.forceHttps) securityScore++;
    if (settings.security.blockTracking) securityScore++;
    if (settings.security.safeBrowsing) securityScore++;
    if (settings.security.verifyCertificates) securityScore++;
    
    // Create status indicator
    const statusDiv = document.createElement('div');
    statusDiv.className = 'security-status';
    
    if (securityScore === maxScore) {
        statusDiv.innerHTML = `🔐 Maximum Security (${securityScore}/${maxScore})`;
    } else if (securityScore >= 3) {
        statusDiv.innerHTML = `🔒 Good Security (${securityScore}/${maxScore})`;
        statusDiv.classList.add('warning');
    } else {
        statusDiv.innerHTML = `⚠️ Low Security (${securityScore}/${maxScore})`;
        statusDiv.classList.add('danger');
    }
    
    document.body.appendChild(statusDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(statusDiv)) {
            statusDiv.remove();
        }
    }, 5000);
}

// Setup Settings Listeners - Fixed theme switching completely
function setupSettingsListeners() {
    // Theme listeners - Direct click handling for proper switching
    document.querySelectorAll('input[name="theme"]').forEach(radio => {
        // Remove any existing listeners
        radio.removeEventListener('change', radio._themeHandler);
        
        // Create new handler
        radio._themeHandler = function(e) {
            console.log('🎨 Theme radio clicked:', e.target.value);
            
            // Get the selected theme
            const selectedTheme = e.target.value;
            
            // Update settings immediately
            settings.theme = selectedTheme;
            
            console.log('🎨 Settings.theme updated to:', settings.theme);
            
            // Apply theme immediately
            applyTheme();
            
            // Save settings
            saveSettings();
            
            // Show notification
            showNotification(`Theme changed to ${selectedTheme}!`, 'success');
            
            // Add animation
            addThemeChangeAnimation();
        };
        
        // Add the listener
        radio.addEventListener('change', radio._themeHandler);
        
        // Also add click handler as backup
        radio.addEventListener('click', function(e) {
            // Manually trigger the change event
            e.target.checked = true;
            e.target.dispatchEvent(new Event('change'));
        });
    });
    
    // Animation listeners
    document.getElementById('animations-enabled')?.addEventListener('change', (e) => {
        settings.animations.enabled = e.target.checked;
        applyAnimations();
    });
    
    document.getElementById('loading-animations')?.addEventListener('change', (e) => {
        settings.animations.loading = e.target.checked;
        applyAnimations();
    });
    
    document.getElementById('hover-effects')?.addEventListener('change', (e) => {
        settings.animations.hover = e.target.checked;
        applyAnimations();
    });
    
    document.getElementById('shimmer-effects')?.addEventListener('change', (e) => {
        settings.animations.shimmer = e.target.checked;
        applyAnimations();
    });
    
    // Display listeners
    document.getElementById('compact-view')?.addEventListener('change', (e) => {
        settings.display.compact = e.target.checked;
        applyDisplaySettings();
    });
    
    document.getElementById('show-descriptions')?.addEventListener('change', (e) => {
        settings.display.showDescriptions = e.target.checked;
        applyDisplaySettings();
    });
    
    document.getElementById('card-layout')?.addEventListener('change', (e) => {
        settings.display.cardLayout = e.target.checked;
        applyDisplaySettings();
    });
    
    document.getElementById('grid-columns')?.addEventListener('change', (e) => {
        settings.display.gridColumns = e.target.value;
        applyDisplaySettings();
    });
    
    // Notification listeners
    document.getElementById('enable-notifications')?.addEventListener('change', (e) => {
        settings.notifications.enabled = e.target.checked;
        applyNotificationSettings();
    });
    
    document.getElementById('sound-effects')?.addEventListener('change', (e) => {
        settings.notifications.soundEffects = e.target.checked;
        applyNotificationSettings();
    });
    
    document.getElementById('notification-duration')?.addEventListener('change', (e) => {
        settings.notifications.duration = parseInt(e.target.value);
        applyNotificationSettings();
    });
    
    // Performance listeners
    document.getElementById('preload-images')?.addEventListener('change', (e) => {
        settings.performance.preloadImages = e.target.checked;
        applyPerformanceSettings();
    });
    
    document.getElementById('cache-enabled')?.addEventListener('change', (e) => {
        settings.performance.cacheEnabled = e.target.checked;
        applyPerformanceSettings();
    });
    
    document.getElementById('lazy-loading')?.addEventListener('change', (e) => {
        settings.performance.lazyLoading = e.target.checked;
        applyPerformanceSettings();
    });
    
    document.getElementById('reduced-motion')?.addEventListener('change', (e) => {
        settings.performance.reducedMotion = e.target.checked;
        applyPerformanceSettings();
    });
    
    // Privacy listeners
    document.getElementById('analytics-enabled')?.addEventListener('change', (e) => {
        settings.privacy.analyticsEnabled = e.target.checked;
        applyPrivacySettings();
    });
    
    document.getElementById('cookies-enabled')?.addEventListener('change', (e) => {
        settings.privacy.cookiesEnabled = e.target.checked;
        applyPrivacySettings();
    });
    
    document.getElementById('share-data')?.addEventListener('change', (e) => {
        settings.privacy.shareData = e.target.checked;
        applyPrivacySettings();
    });
    
    document.getElementById('incognito-mode')?.addEventListener('change', (e) => {
        settings.privacy.incognitoMode = e.target.checked;
        applyPrivacySettings();
    });
    
    // Accessibility listeners
    document.getElementById('high-contrast')?.addEventListener('change', (e) => {
        settings.accessibility.highContrast = e.target.checked;
        applyAccessibilitySettings();
    });
    
    document.getElementById('large-text')?.addEventListener('change', (e) => {
        settings.accessibility.largeText = e.target.checked;
        applyAccessibilitySettings();
    });
    
    document.getElementById('screen-reader')?.addEventListener('change', (e) => {
        settings.accessibility.screenReader = e.target.checked;
        applyAccessibilitySettings();
    });
    
    document.getElementById('keyboard-nav')?.addEventListener('change', (e) => {
        settings.accessibility.keyboardNav = e.target.checked;
        applyAccessibilitySettings();
    });
    
    document.getElementById('font-size')?.addEventListener('change', (e) => {
        settings.accessibility.fontSize = e.target.value;
        applyAccessibilitySettings();
    });
    
    // Advanced listeners
    document.getElementById('debug-mode')?.addEventListener('change', (e) => {
        settings.advanced.debugMode = e.target.checked;
        applyAdvancedSettings();
    });
    
    document.getElementById('console-logs')?.addEventListener('change', (e) => {
        settings.advanced.consoleLogs = e.target.checked;
        applyAdvancedSettings();
    });
    
    document.getElementById('experimental-features')?.addEventListener('change', (e) => {
        settings.advanced.experimentalFeatures = e.target.checked;
        applyAdvancedSettings();
    });
    
    document.getElementById('auto-update')?.addEventListener('change', (e) => {
        settings.advanced.autoUpdate = e.target.checked;
        applyAdvancedSettings();
    });
    
    // Personalization listeners
    document.getElementById('custom-css')?.addEventListener('input', (e) => {
        settings.personalization.customCSS = e.target.value;
        applyPersonalizationSettings();
    });
    
    document.getElementById('language')?.addEventListener('change', (e) => {
        settings.personalization.language = e.target.value;
        applyPersonalizationSettings();
    });
    
    document.getElementById('timezone')?.addEventListener('change', (e) => {
        settings.personalization.timezone = e.target.value;
        applyPersonalizationSettings();
    });
    
    document.getElementById('date-format')?.addEventListener('change', (e) => {
        settings.personalization.dateFormat = e.target.value;
        applyPersonalizationSettings();
    });
}

// Initialize Settings UI
function initializeSettingsUI() {
    updateSettingsUI();
    addInitialAnimations();
}

// Update Settings UI
function updateSettingsUI() {
    // Update theme radio
    document.querySelector(`input[name="theme"][value="${settings.theme}"]`)?.setAttribute('checked', 'checked');
    
    // Update checkboxes
    updateCheckbox('animations-enabled', settings.animations.enabled);
    updateCheckbox('loading-animations', settings.animations.loading);
    updateCheckbox('hover-effects', settings.animations.hover);
    updateCheckbox('shimmer-effects', settings.animations.shimmer);
    
    updateCheckbox('compact-view', settings.display.compact);
    updateCheckbox('show-descriptions', settings.display.showDescriptions);
    updateCheckbox('card-layout', settings.display.cardLayout);
    
    updateCheckbox('enable-notifications', settings.notifications.enabled);
    updateCheckbox('sound-effects', settings.notifications.soundEffects);
    
    updateCheckbox('preload-images', settings.performance.preloadImages);
    updateCheckbox('cache-enabled', settings.performance.cacheEnabled);
    updateCheckbox('lazy-loading', settings.performance.lazyLoading);
    updateCheckbox('reduced-motion', settings.performance.reducedMotion);
    
    // Update privacy checkboxes
    updateCheckbox('analytics-enabled', settings.privacy.analyticsEnabled);
    updateCheckbox('cookies-enabled', settings.privacy.cookiesEnabled);
    updateCheckbox('share-data', settings.privacy.shareData);
    updateCheckbox('incognito-mode', settings.privacy.incognitoMode);
    
    // Update accessibility checkboxes
    updateCheckbox('high-contrast', settings.accessibility.highContrast);
    updateCheckbox('large-text', settings.accessibility.largeText);
    updateCheckbox('screen-reader', settings.accessibility.screenReader);
    updateCheckbox('keyboard-nav', settings.accessibility.keyboardNav);
    
    // Update advanced checkboxes
    updateCheckbox('debug-mode', settings.advanced.debugMode);
    updateCheckbox('console-logs', settings.advanced.consoleLogs);
    updateCheckbox('experimental-features', settings.advanced.experimentalFeatures);
    updateCheckbox('auto-update', settings.advanced.autoUpdate);
    
    // Update selects
    updateSelect('grid-columns', settings.display.gridColumns);
    updateSelect('notification-duration', settings.notifications.duration);
    updateSelect('font-size', settings.accessibility.fontSize);
    updateSelect('language', settings.personalization.language);
    updateSelect('timezone', settings.personalization.timezone);
    updateSelect('date-format', settings.personalization.dateFormat);
    
    // Update custom CSS textarea
    const customCssTextarea = document.getElementById('custom-css');
    if (customCssTextarea) {
        customCssTextarea.value = settings.personalization.customCSS;
    }
}

function updateCheckbox(id, value) {
    const checkbox = document.getElementById(id);
    if (checkbox) {
        checkbox.checked = value;
        addCheckboxAnimation(checkbox);
    }
}

function updateSelect(id, value) {
    const select = document.getElementById(id);
    if (select) {
        select.value = value;
        addSelectAnimation(select);
    }
}

// Animation Functions
function addThemeChangeAnimation() {
    document.body.style.transition = 'all 0.5s ease';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 500);
}

function addSaveAnimation() {
    const saveBtn = document.querySelector('.btn-primary');
    if (saveBtn) {
        saveBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            saveBtn.style.transform = 'scale(1)';
        }, 200);
    }
}

function addCheckboxAnimation(checkbox) {
    checkbox.style.transform = 'scale(1.1)';
    setTimeout(() => {
        checkbox.style.transform = 'scale(1)';
    }, 200);
}

function addSelectAnimation(select) {
    select.style.transform = 'scale(1.05)';
    setTimeout(() => {
        select.style.transform = 'scale(1)';
    }, 200);
}

function addInitialAnimations() {
    document.querySelectorAll('.settings-card').forEach((card, index) => {
        card.style.animation = `settings-fade-in 0.6s ease-out ${index * 0.1}s both`;
    });
}

// Reset Settings
function resetSettings() {
    if (confirm('Are you sure you want to reset all settings to default? This cannot be undone.')) {
        settings = {
            theme: 'purple',
            animations: {
                enabled: true,
                loading: true,
                hover: true,
                shimmer: true
            },
            display: {
                compact: false,
                showDescriptions: true,
                cardLayout: true,
                gridColumns: '3'
            },
            notifications: {
                enabled: true,
                soundEffects: false,
                duration: 3000
            },
            performance: {
                preloadImages: true,
                cacheEnabled: true,
                lazyLoading: false,
                reducedMotion: false
            },
            accessibility: {
                highContrast: false,
                largeText: false,
                screenReader: false,
                keyboardNav: true,
                fontSize: 'medium'
            },
            advanced: {
                debugMode: false,
                consoleLogs: false,
                experimentalFeatures: false,
                autoUpdate: true
            },
            personalization: {
                customCSS: '',
                language: 'en',
                timezone: 'auto',
                dateFormat: 'mm/dd/yyyy'
            }
        };
        
        saveSettings();
        showNotification('Settings reset to default 🔄', 'info');
        addResetAnimation();
    }
}

function addResetAnimation() {
    document.body.style.opacity = '0.5';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 300);
}

// Export Settings
function exportSettings() {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `neutral-nexus-settings-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    showNotification('Settings exported successfully 📤', 'success');
    addExportAnimation();
}

function addExportAnimation() {
    const exportBtn = document.querySelector('.btn-secondary:nth-child(3)');
    if (exportBtn) {
        exportBtn.style.transform = 'rotate(360deg) scale(1.1)';
        setTimeout(() => {
            exportBtn.style.transform = 'rotate(0deg) scale(1)';
        }, 500);
    }
}

// Import Settings
function importSettings() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        
        reader.onload = (event) => {
            try {
                const importedSettings = JSON.parse(event.target.result);
                
                // Validate imported settings
                if (validateSettings(importedSettings)) {
                    settings = mergeDeep(settings, importedSettings);
                    saveSettings();
                    showNotification('Settings imported successfully 📥', 'success');
                    addImportAnimation();
                } else {
                    showNotification('Invalid settings file', 'error');
                }
            } catch (error) {
                showNotification('Error importing settings: ' + error.message, 'error');
            }
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}

function validateSettings(settings) {
    // Basic validation
    return settings && 
           typeof settings === 'object' &&
           themes.hasOwnProperty(settings.theme) &&
           settings.animations && 
           settings.display && 
           settings.notifications && 
           settings.performance;
}

function addImportAnimation() {
    const importBtn = document.querySelector('.btn-secondary:nth-child(4)');
    if (importBtn) {
        importBtn.style.transform = 'scale(1.2)';
        setTimeout(() => {
            importBtn.style.transform = 'scale(1)';
        }, 300);
    }
}

// Enhanced Notification System
function showNotification(message, type = 'info') {
    if (!settings.notifications.enabled) return;
    
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slide-in 0.3s ease-out;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Set background based on type
    const colors = {
        success: 'linear-gradient(135deg, #10b981, #059669)',
        error: 'linear-gradient(135deg, #ef4444, #b91c1c)',
        warning: 'linear-gradient(135deg, #f59e0b, #d97706)',
        info: 'linear-gradient(135deg, #3b82f6, #1e40af)'
    };
    
    notification.style.background = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Auto remove
    setTimeout(() => {
        notification.style.animation = 'slide-out 0.3s ease-out';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, settings.notifications.duration);
}

// Add notification animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slide-in {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slide-out {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Export for Global Use
window.SettingsSystem = {
    save: saveSettings,
    reset: resetSettings,
    export: exportSettings,
    import: importSettings,
    apply: applySettings,
    get: () => settings,
    update: (newSettings) => {
        settings = mergeDeep(settings, newSettings);
        saveSettings();
    },
    themes: themes,
    currentTheme: () => settings.theme
};

// Helper Functions for New Settings

// Accessibility Functions
function applyHighContrast() {
    const style = document.createElement('style');
    style.id = 'high-contrast-style';
    style.textContent = `
        * {
            background: #000 !important;
            color: #fff !important;
            border-color: #fff !important;
        }
        .btn {
            background: #fff !important;
            color: #000 !important;
        }
    `;
    document.head.appendChild(style);
}

function removeHighContrast() {
    const style = document.getElementById('high-contrast-style');
    if (style) style.remove();
}

function applyLargeText() {
    document.documentElement.style.fontSize = '120%';
}

function removeLargeText() {
    document.documentElement.style.fontSize = '';
}

function applyFontSize() {
    const sizes = {
        small: '90%',
        medium: '100%',
        large: '110%',
        'extra-large': '130%'
    };
    document.documentElement.style.fontSize = sizes[settings.accessibility.fontSize] || '100%';
}

function addScreenReaderSupport() {
    document.querySelectorAll('button, a, input, select, textarea').forEach(el => {
        if (!el.getAttribute('aria-label')) {
            el.setAttribute('aria-label', el.textContent || el.placeholder || 'Interactive element');
        }
    });
}

function removeScreenReaderSupport() {
    // Remove aria-labels that were auto-added
}

function enableKeyboardNavigation() {
    document.addEventListener('keydown', handleKeyboardNavigation);
}

function disableKeyboardNavigation() {
    document.removeEventListener('keydown', handleKeyboardNavigation);
}

function handleKeyboardNavigation(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav-active');
        setTimeout(() => {
            document.body.classList.remove('keyboard-nav-active');
        }, 100);
    }
}

// Advanced Functions
function enableDebugMode() {
    console.log('🐛 Debug mode enabled');
    window.debugMode = true;
}

function disableDebugMode() {
    console.log('🐛 Debug mode disabled');
    window.debugMode = false;
}

function enableConsoleLogs() {
    window.enableConsoleLogs = true;
}

function disableConsoleLogs() {
    window.enableConsoleLogs = false;
}

function enableExperimentalFeatures() {
    document.body.classList.add('experimental');
    showNotification('Experimental features enabled! 🧪', 'info');
}

function disableExperimentalFeatures() {
    document.body.classList.remove('experimental');
}

// Personalization Functions
function applyCustomCSS() {
    let customStyle = document.getElementById('custom-css-style');
    if (!customStyle) {
        customStyle = document.createElement('style');
        customStyle.id = 'custom-css-style';
        document.head.appendChild(customStyle);
    }
    customStyle.textContent = settings.personalization.customCSS;
}

function removeCustomCSS() {
    const customStyle = document.getElementById('custom-css-style');
    if (customStyle) customStyle.remove();
}

function applyLanguage() {
    // Language implementation would go here
    console.log('Language set to:', settings.personalization.language);
}

function applyTimezone() {
    // Timezone implementation would go here
    console.log('Timezone set to:', settings.personalization.timezone);
}

function applyDateFormat() {
    // Date format implementation would go here
    console.log('Date format set to:', settings.personalization.dateFormat);
}

// Utility Functions
function clearCache() {
    if (confirm('Clear all cached data? This may slow down initial loading.')) {
        localStorage.clear();
        sessionStorage.clear();
        showNotification('Cache cleared successfully! 🗑️', 'success');
        setTimeout(() => {
            location.reload();
        }, 1000);
    }
}
