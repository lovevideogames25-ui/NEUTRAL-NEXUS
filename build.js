const fs = require('fs');
const path = require('path');

// Read .env file (for local development)
const envPath = path.join(__dirname, '.env');
const envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';

// Parse .env variables
const envVars = {};
if (envContent) {
    envContent.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0 && !line.trim().startsWith('#')) {
            envVars[key.trim()] = valueParts.join('=').trim();
        }
    });
}

// Also check environment variables (for CI/CD deployment)
envVars.THE_MOVIE_DATABASE_API = process.env.THE_MOVIE_DATABASE_API || envVars.THE_MOVIE_DATABASE_API;
envVars.YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || envVars.YOUTUBE_API_KEY;

// Read frontend-api.template.js
const templatePath = path.join(__dirname, 'js', 'frontend-api.template.js');
let apiContent = fs.readFileSync(templatePath, 'utf8');

// Replace API keys with values from .env or environment variables
apiContent = apiContent.replace(
    /const TMDB_API_KEY = 'TMDB_API_KEY_PLACEHOLDER';/,
    `const TMDB_API_KEY = '${envVars.THE_MOVIE_DATABASE_API || 'TMDB_API_KEY_PLACEHOLDER'}';`
);

apiContent = apiContent.replace(
    /const YOUTUBE_API_KEY = 'YOUTUBE_API_KEY_PLACEHOLDER';/,
    `const YOUTUBE_API_KEY = '${envVars.YOUTUBE_API_KEY || 'YOUTUBE_API_KEY_PLACEHOLDER'}';`
);

// Write the generated file
const outputPath = path.join(__dirname, 'js', 'frontend-api.js');
fs.writeFileSync(outputPath, apiContent);

console.log('✅ API keys injected into js/frontend-api.js');
console.log('📝 TMDB API Key:', envVars.THE_MOVIE_DATABASE_API ? '✓ Set' : '✗ Not set');
console.log('📝 YouTube API Key:', envVars.YOUTUBE_API_KEY ? '✓ Set' : '✗ Not set');


