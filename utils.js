// utils.js
const path = require('path');

// Function to generate absolute paths
function appPath(...args) {
  return path.join(__dirname, ...args);
}

module.exports = appPath;