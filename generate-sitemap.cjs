const fs = require('fs');
const path = require('path');

const seoDataPath = path.join(__dirname, 'src/config/seo-data.ts');
const seoDataContent = fs.readFileSync(seoDataPath, 'utf8');

// Regex to capture subject code and details
const subjectRegex = /(\w{2,5}):\s*\{[\s\S]*?code:\s*"(\w{2,5})",\s*name:\s*"([\s\S]*?)"/g;

const subjects = [];
let match;
while ((match = subjectRegex.exec(seoDataContent)) !== null) {
  subjects.push({
    code: match[2],
    name: match[3]
  });
}

console.log(`Parsed ${subjects.length} subjects from seo-data.ts`);

const BASE_URL = "https://notescsbs.vercel.app";
const lastmod = new Date().toISOString().split('T')[0] + "T00:00:00+00:00";

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

  <!-- Core Pages -->
  <url><loc>${BASE_URL}/</loc><lastmod>${lastmod}</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url>
  <url><loc>${BASE_URL}/contributors</loc><lastmod>${lastmod}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>${BASE_URL}/privacy</loc><lastmod>${lastmod}</lastmod><changefreq>yearly</changefreq><priority>0.3</priority></url>
  <url><loc>${BASE_URL}/keywords</loc><lastmod>${lastmod}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>${BASE_URL}/notices</loc><lastmod>${lastmod}</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>

  <!-- Semester Index Pages -->
`;

for (let s = 1; s <= 8; s++) {
  sitemap += `  <url><loc>${BASE_URL}/semester/${s}</loc><lastmod>${lastmod}</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>\n`;
}

sitemap += `\n  <!-- Subject Specific Pages (Main 200 OK Routes) -->\n`;

subjects.forEach(subj => {
  sitemap += `  <!-- ${subj.name} (${subj.code}) -->\n`;
  sitemap += `  <url><loc>${BASE_URL}/subject/${subj.code}</loc><lastmod>${lastmod}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>\n`;
});

sitemap += `</urlset>\n`;

const sitemapPath = path.join(__dirname, 'public/sitemap.xml');
fs.writeFileSync(sitemapPath, sitemap, 'utf8');
console.log(`Successfully generated clean sitemap with ${subjects.length} subjects at: ${sitemapPath}`);
