const fs = require('fs');
const path = require('path');

// Copy scramjet.wasm.wasm from scram directory to root
const sourcePath = path.join(__dirname, 'scram', 'scramjet.wasm.wasm');
const destPath = path.join(__dirname, 'scramjet.wasm.wasm');

if (fs.existsSync(sourcePath)) {
  fs.copyFileSync(sourcePath, destPath);
  console.log('Copied scramjet.wasm.wasm to root directory');
} else {
  console.error('scramjet.wasm.wasm not found in scram directory');
}
