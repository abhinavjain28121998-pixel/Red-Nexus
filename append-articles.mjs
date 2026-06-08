import fs from 'fs';
import path from 'path';

const mockFile = './src/data/mock.ts';
let code = fs.readFileSync(mockFile, 'utf8');

// Function to read and parse md file
function readArticle(filename, id, slug) {
  const content = fs.readFileSync(path.join('./content/articles', filename), 'utf8');
  // Simple frontmatter extraction
  const fmMatch = content.match(/---\n([\s\S]*?)\n---/);
  let title = '';
  let meta_description = '';
  let body = content;
  
  if (fmMatch) {
    const lines = fmMatch[1].split('\n');
    title = lines.find(l => l.startsWith('title:'))?.replace('title: ', '').replace(/"/g, '') || '';
    meta_description = lines.find(l => l.startsWith('meta_description:'))?.replace('meta_description: ', '').replace(/"/g, '') || '';
    body = content.replace(fmMatch[0], '').trim();
  }
  
  return { id, slug, title, meta_description, body };
}

const articles = [
  readArticle('1-generative-ai-for-candidate-sourcing.md', 'p7', 'generative-ai-candidate-sourcing'),
  readArticle('2-generative-ai-resume-screening.md', 'p8', 'generative-ai-resume-screening-ranking'),
  readArticle('3-gen-ai-job-description-generation.md', 'p9', 'gen-ai-job-description-generation'),
  readArticle('4-generative-ai-personalized-outreach.md', 'p10', 'generative-ai-personalized-recruitment-outreach'),
];

let newPostsStr = '';
for (const art of articles) {
  newPostsStr += `
  {
    id: "${art.id}",
    title: ${JSON.stringify(art.title)},
    slug: "${art.slug}",
    excerpt: ${JSON.stringify(art.meta_description)},
    content: ${JSON.stringify(art.body)},
    coverImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1600&h=900",
    publishedAt: new Date().toISOString(),
    readTimeMinutes: 8,
    author: authors[0],
    category: categories[0],
    tags: ["HR", "Recruitment", "Generative AI"],
    featured: false,
  },`;
}

// Find the export mockPosts array and splice these into it
const insertIndex = code.lastIndexOf('];');
if (insertIndex !== -1) {
    // Check if it ends with }, so we might need a comma
    code = code.substring(0, insertIndex) + (code[insertIndex-1] !== ',' ? ',' : '') + newPostsStr + '\n];';
}

fs.writeFileSync(mockFile, code);
console.log('Appended 4 articles to mock.ts');
