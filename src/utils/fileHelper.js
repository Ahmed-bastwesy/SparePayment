const fs = require('fs').promises;
const path = require('path');

async function readJSON(filePath) {
  const data = await fs.readFile(path.join(__dirname, '..', 'data', filePath));
  return JSON.parse(data);
}

async function writeJSON(filePath, data) {
  await fs.writeFile(path.join(__dirname, '..', 'data', filePath), JSON.stringify(data, null, 2));
}

module.exports = { readJSON, writeJSON };
