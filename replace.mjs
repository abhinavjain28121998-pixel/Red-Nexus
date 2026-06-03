import fs from 'fs';
import path from 'path';

const files = [
  './src/pages/Home.tsx',
  './src/pages/BlogListing.tsx',
  './src/pages/SinglePost.tsx',
  './src/pages/About.tsx',
  './src/pages/Contact.tsx',
  './metadata.json'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/blue-/g, 'red-');
  content = content.replace(/TECH\.NOVA/g, 'RED.NEXUS');
  content = content.replace(/"TechNova"/g, '"RED.NEXUS"');
  fs.writeFileSync(file, content);
  console.log(`Updated ${file}`);
}
