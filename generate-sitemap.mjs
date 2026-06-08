import fs from 'fs';
import path from 'path';

const postsDir = path.join(process.cwd(), 'src/data/posts');
const publicDir = path.join(process.cwd(), 'public');
const rootDir = process.cwd();

// Base URL
const baseUrl = 'https://red-nexus-omega.vercel.app';

// Static pages
const staticPages = [
  { path: '', priority: '1.0', changefreq: 'daily' },
  { path: 'blog', priority: '0.9', changefreq: 'daily' },
  { path: 'categories', priority: '0.8', changefreq: 'weekly' },
  { path: 'about', priority: '0.7', changefreq: 'monthly' },
  { path: 'contact', priority: '0.7', changefreq: 'monthly' }
];

async function generateSitemap() {
  try {
    const urls = [];
    const today = new Date().toISOString().split('T')[0];

    // Add static pages
    for (const page of staticPages) {
      urls.push(`  <url>
    <loc>${baseUrl}/${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`);
    }

    // Read all files in postsDir
    if (fs.existsSync(postsDir)) {
      const files = fs.readdirSync(postsDir);
      // Sort files naturally (p1, p2, ...) to keep order consistent
      files.sort((a, b) => {
        const numA = parseInt(a.replace(/\D/g, ''), 10) || 0;
        const numB = parseInt(b.replace(/\D/g, ''), 10) || 0;
        return numA - numB;
      });

      for (const file of files) {
        if (file.endsWith('.ts') || file.endsWith('.js')) {
          const filePath = path.join(postsDir, file);
          const content = fs.readFileSync(filePath, 'utf-8');
          
          // Use regex to find the slug property
          const slugMatch = content.match(/slug:\s*["']([^"']+)["']/);
          if (slugMatch && slugMatch[1]) {
            const slug = slugMatch[1];
            urls.push(`  <url>
    <loc>${baseUrl}/blog/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`);
          }
        }
      }
    }

    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Core Static Pages -->
${urls.slice(0, staticPages.length).join('\n')}

  <!-- Dynamic Blog Posts -->
${urls.slice(staticPages.length).join('\n')}
</urlset>
`;

    // Ensure public folder exists
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Write to /public/sitemap.xml (Vite's default static folder, goes to dev root and builds to dist/)
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapContent, 'utf-8');
    console.log('Successfully generated /public/sitemap.xml');

    // Write to root /sitemap.xml as requested specifically to be served at root level
    fs.writeFileSync(path.join(rootDir, 'sitemap.xml'), sitemapContent, 'utf-8');
    console.log('Successfully generated /sitemap.xml at workspace root');

  } catch (error) {
    console.error('Error while building sitemap:', error);
    process.exit(1);
  }
}

generateSitemap();
