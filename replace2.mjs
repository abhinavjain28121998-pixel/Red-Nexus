import fs from 'fs';
import path from 'path';

const files = [
  './src/data/mock.ts'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/blue-/g, 'red-');
  content = content.replace(/TechNova/g, 'RED.NEXUS');
  fs.writeFileSync(file, content);
  console.log(`Updated ${file}`);
}
