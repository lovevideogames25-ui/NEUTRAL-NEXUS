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
envVars.API = process.env.API || envVars.API;
envVars.API2 = process.env.API2 || envVars.API2;
envVars.API3 = process.env.API3 || envVars.API3;
envVars.API4 = process.env.API4 || envVars.API4;
envVars.API5 = process.env.API5 || envVars.API5;
envVars.API6 = process.env.API6 || envVars.API6;
envVars.API7 = process.env.API7 || envVars.API7;
envVars.API8 = process.env.API8 || envVars.API8;
envVars.CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || envVars.CLOUDFLARE_ACCOUNT_ID;
envVars.CLOUDFLARE_GATEWAY_ID = process.env.CLOUDFLARE_GATEWAY_ID || envVars.CLOUDFLARE_GATEWAY_ID;
envVars.SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || envVars.SPOTIFY_CLIENT_ID;
envVars.SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || envVars.SPOTIFY_CLIENT_SECRET;
envVars.JAMENDO_CLIENT_ID = process.env.JAMENDO_CLIENT_ID || envVars.JAMENDO_CLIENT_ID;
envVars.THE_MOVIE_DATABASE_API = process.env.THE_MOVIE_DATABASE_API || envVars.THE_MOVIE_DATABASE_API;
envVars.YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || envVars.YOUTUBE_API_KEY;
envVars.YOUTUBE_API_KEY_2 = process.env.YOUTUBE_API_KEY_2 || envVars.YOUTUBE_API_KEY_2;
envVars.MERRIAM_WEBSTER_API_KEY = process.env.MERRIAM_WEBSTER_API_KEY || envVars.MERRIAM_WEBSTER_API_KEY;

// Read frontend-api.template.js
const templatePath = path.join(__dirname, 'js', 'frontend-api.template.js');
let apiContent = fs.readFileSync(templatePath, 'utf8');

// Replace API keys with values from .env or environment variables
apiContent = apiContent.replace(/let API = 'API_PLACEHOLDER';/, `let API = '${envVars.API || 'API_PLACEHOLDER'}';`);
apiContent = apiContent.replace(/let API2 = 'API2_PLACEHOLDER';/, `let API2 = '${envVars.API2 || 'API2_PLACEHOLDER'}';`);
apiContent = apiContent.replace(/let API3 = 'API3_PLACEHOLDER';/, `let API3 = '${envVars.API3 || 'API3_PLACEHOLDER'}';`);
apiContent = apiContent.replace(/let API4 = 'API4_PLACEHOLDER';/, `let API4 = '${envVars.API4 || 'API4_PLACEHOLDER'}';`);
apiContent = apiContent.replace(/let API5 = 'API5_PLACEHOLDER';/, `let API5 = '${envVars.API5 || 'API5_PLACEHOLDER'}';`);
apiContent = apiContent.replace(/let API6 = 'API6_PLACEHOLDER';/, `let API6 = '${envVars.API6 || 'API6_PLACEHOLDER'}';`);
apiContent = apiContent.replace(/let API7 = 'API7_PLACEHOLDER';/, `let API7 = '${envVars.API7 || 'API7_PLACEHOLDER'}';`);
apiContent = apiContent.replace(/let API8 = 'API8_PLACEHOLDER';/, `let API8 = '${envVars.API8 || 'API8_PLACEHOLDER'}';`);
apiContent = apiContent.replace(/let CLOUDFLARE_ACCOUNT_ID = 'CLOUDFLARE_ACCOUNT_ID_PLACEHOLDER';/, `let CLOUDFLARE_ACCOUNT_ID = '${envVars.CLOUDFLARE_ACCOUNT_ID || 'CLOUDFLARE_ACCOUNT_ID_PLACEHOLDER'}';`);
apiContent = apiContent.replace(/let CLOUDFLARE_GATEWAY_ID = 'CLOUDFLARE_GATEWAY_ID_PLACEHOLDER';/, `let CLOUDFLARE_GATEWAY_ID = '${envVars.CLOUDFLARE_GATEWAY_ID || 'CLOUDFLARE_GATEWAY_ID_PLACEHOLDER'}';`);
apiContent = apiContent.replace(/let SPOTIFY_CLIENT_ID = 'SPOTIFY_CLIENT_ID_PLACEHOLDER';/, `let SPOTIFY_CLIENT_ID = '${envVars.SPOTIFY_CLIENT_ID || 'SPOTIFY_CLIENT_ID_PLACEHOLDER'}';`);
apiContent = apiContent.replace(/let SPOTIFY_CLIENT_SECRET = 'SPOTIFY_CLIENT_SECRET_PLACEHOLDER';/, `let SPOTIFY_CLIENT_SECRET = '${envVars.SPOTIFY_CLIENT_SECRET || 'SPOTIFY_CLIENT_SECRET_PLACEHOLDER'}';`);
apiContent = apiContent.replace(/let JAMENDO_CLIENT_ID = 'JAMENDO_CLIENT_ID_PLACEHOLDER';/, `let JAMENDO_CLIENT_ID = '${envVars.JAMENDO_CLIENT_ID || 'JAMENDO_CLIENT_ID_PLACEHOLDER'}';`);
apiContent = apiContent.replace(/let TMDB_API_KEY = 'TMDB_API_KEY_PLACEHOLDER';/, `let TMDB_API_KEY = '${envVars.THE_MOVIE_DATABASE_API || 'TMDB_API_KEY_PLACEHOLDER'}';`);
apiContent = apiContent.replace(/let YOUTUBE_API_KEY = 'YOUTUBE_API_KEY_PLACEHOLDER';/, `let YOUTUBE_API_KEY = '${envVars.YOUTUBE_API_KEY || 'YOUTUBE_API_KEY_PLACEHOLDER'}';`);
apiContent = apiContent.replace(/let YOUTUBE_API_KEY_2 = 'YOUTUBE_API_KEY_2_PLACEHOLDER';/, `let YOUTUBE_API_KEY_2 = '${envVars.YOUTUBE_API_KEY_2 || 'YOUTUBE_API_KEY_2_PLACEHOLDER'}';`);
apiContent = apiContent.replace(/let MERRIAM_WEBSTER_API_KEY = 'MERRIAM_WEBSTER_API_KEY_PLACEHOLDER';/, `let MERRIAM_WEBSTER_API_KEY = '${envVars.MERRIAM_WEBSTER_API_KEY || 'MERRIAM_WEBSTER_API_KEY_PLACEHOLDER'}';`);

// Write the generated file
const outputPath = path.join(__dirname, 'js', 'frontend-api.js');
fs.writeFileSync(outputPath, apiContent);
console.log('✅ API keys injected into js/frontend-api.js');
console.log('📝 TMDB API Key:', envVars.THE_MOVIE_DATABASE_API ? '✓ Set' : '✗ Not set');
console.log('📝 YouTube API Key:', envVars.YOUTUBE_API_KEY ? '✓ Set' : '✗ Not set');


