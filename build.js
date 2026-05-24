const fs = require('fs');
const path = require('path');
const https = require('https');

// Ensure webfonts directory exists
const webfontsDir = path.join(__dirname, '_a', 'fa', 'webfonts');
if (!fs.existsSync(webfontsDir)) {
  fs.mkdirSync(webfontsDir, { recursive: true });
  console.log('Created webfonts directory');
}

// Download Font Awesome web fonts if they don't exist
const fontFiles = [
  'fa-brands-400.woff2',
  'fa-regular-400.woff2',
  'fa-solid-900.woff2'
];

const fontBaseUrl = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/';

fontFiles.forEach(fontFile => {
  const fontPath = path.join(webfontsDir, fontFile);
  if (!fs.existsSync(fontPath)) {
    const file = fs.createWriteStream(fontPath);
    https.get(`${fontBaseUrl}${fontFile}`, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${fontFile}`);
      });
    }).on('error', (err) => {
      console.error(`Error downloading ${fontFile}:`, err);
      fs.unlink(fontPath, () => {});
    });
  } else {
    console.log(`${fontFile} already exists`);
  }
});
