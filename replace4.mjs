import fs from 'fs';
import path from 'path';

const files = [
  './src/components/layout/Footer.tsx',
  './src/pages/About.tsx',
  './src/pages/Contact.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/TechNova/gi, 'RED.NEXUS');
  content = content.replace(/technova/gi, 'rednexus');
  fs.writeFileSync(file, content);
  console.log(`Updated ${file}`);
}
