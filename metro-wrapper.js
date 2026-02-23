// Wrapper to bypass ESM loader issues on Windows
const path = require('path');
const fs = require('fs');

// Read the actual metro config file
const metroConfigPath = path.join(__dirname, 'metro.config.js');
const metroConfigContent = fs.readFileSync(metroConfigPath, 'utf8');

// Evaluate the metro config in a CommonJS context
const module = { exports: {} };
const evalFunc = new Function('module', 'require', '__dirname', '__filename', metroConfigContent);
evalFunc(module, require, __dirname, __filename);

// Export the config
module.exports = module.exports;
