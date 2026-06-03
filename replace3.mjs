import fs from 'fs';
import path from 'path';

const files = [
  './src/index.css'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/blue-400/g, 'red-500');
  content = content.replace(/purple-500/g, 'red-700');
  fs.writeFileSync(file, content);
  console.log(`Updated ${file}`);
}
