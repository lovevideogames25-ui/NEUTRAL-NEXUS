#!/usr/bin/env python3
from http.server import HTTPServer, SimpleHTTPRequestHandler
import urllib.parse
import urllib.request
import ssl
import time
import hashlib
import os

# Simple in-memory cache
cache = {}
CACHE_TTL = 300  # 5 minutes

class ProxyHTTPRequestHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path.startswith('/proxy?'):
            # Handle proxy requests
            query = urllib.parse.urlparse(self.path).query
            params = urllib.parse.parse_qs(query)
            
            if 'url' not in params:
                self.send_error(400, 'URL parameter required')
                return
            
            url = params['url'][0]
            
            # Decode URL
            while '%2F' in url or '%3A' in url or '%3F' in url or '%3D' in url:
                try:
                    url = urllib.parse.unquote(url)
                except:
                    break
            
            # Ensure URL has protocol
            if not url.startswith('http://') and not url.startswith('https://'):
                url = 'https://' + url
            
            # Skip if already a proxy URL
            if '/proxy?url=' in url or '/resource?url=' in url:
                self.send_error(400, 'URL is already a proxy URL')
                return
            
            # Check cache
            cache_key = hashlib.md5(url.encode()).hexdigest()
            if cache_key in cache:
                cached_data, timestamp = cache[cache_key]
                if time.time() - timestamp < CACHE_TTL:
                    self.send_response(200)
                    self.send_header('Content-Type', cached_data['content_type'])
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.send_header('Cache-Control', 'public, max-age=300')
                    self.end_headers()
                    self.wfile.write(cached_data['content'])
                    return
            
            try:
                # Create SSL context that doesn't verify certificates
                ssl_context = ssl.create_default_context()
                ssl_context.check_hostname = False
                ssl_context.verify_mode = ssl.CERT_NONE
                
                # Rotate user agents to avoid rate limiting
                user_agents = [
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                ]
                import random
                user_agent = random.choice(user_agents)
                
                req = urllib.request.Request(url, headers={
                    'User-Agent': user_agent
                })
                
                with urllib.request.urlopen(req, context=ssl_context) as response:
                    content = response.read()
                    content_type = response.headers.get('Content-Type', 'text/html')
                
                # Cache the response
                cache[cache_key] = ({'content': content, 'content_type': content_type}, time.time())
                
                self.send_response(200)
                self.send_header('Content-Type', content_type)
                self.send_header('Access-Control-Allow-Origin', '*')
                self.send_header('Cache-Control', 'public, max-age=300')
                self.end_headers()
                self.wfile.write(content)
            except urllib.error.HTTPError as e:
                if e.code == 429:
                    self.send_error(429, 'Rate limited by target service. Please try again later.')
                else:
                    self.send_error(e.code, f'HTTP Error {e.code}: {e.reason}')
            except Exception as e:
                self.send_error(500, f'Proxy error: {str(e)}')
        else:
            # Handle static files
            super().do_GET()

if __name__ == '__main__':
    server = HTTPServer(('localhost', 8080), ProxyHTTPRequestHandler)
    print('Server running at http://localhost:8080')
    print('Proxy endpoint: http://localhost:8080/proxy?url=<url>')
    server.serve_forever()
