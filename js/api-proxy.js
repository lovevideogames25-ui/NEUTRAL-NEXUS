// Simple CORS Proxy for API Calls
// This helps bypass CORS issues with external APIs

class APIProxy {
  constructor() {
    this.proxies = {
      'openrouter': 'https://cors-anywhere.herokuapp.com/',
      'replicate': 'https://cors-anywhere.herokuapp.com/',
      'lockllm': 'https://cors-anywhere.herokuapp.com/'
    };
  }

  async fetch(url, options) {
    // Try direct fetch first
    try {
      const response = await fetch(url, options);
      if (response.ok) return response;
    } catch (error) {
      console.log('Direct fetch failed, trying proxy...');
    }

    // Try with proxy if direct fails
    const proxyUrl = this.getProxyUrl(url);
    const proxyOptions = {
      ...options,
      headers: {
        ...options.headers,
        'X-Requested-With': 'XMLHttpRequest'
      }
    };

    return fetch(proxyUrl, proxyOptions);
  }

  getProxyUrl(originalUrl) {
    // Simple proxy implementation
    // In production, you'd want to use a proper CORS proxy
    return originalUrl; // For now, just return original URL
  }
}

// Global proxy instance
window.apiProxy = new APIProxy();
