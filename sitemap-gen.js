const fs = require('fs');

async function generateSitemap() {
  const SUPABASE_URL = "https://xqlvzzfyspbbpghjoeue.supabase.co";
  const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxbHZ6emZ5c3BiYnBnaGpvZXVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1ODYxNzcsImV4cCI6MjA4MjE2MjE3N30.WEKi171_dYq79nMi8ZejuOYMu9R0WL32Xm3TRQqj2Sk";
  
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/subjects?select=id`, {
      method: "GET",
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`
      }
    });
    
    if (!res.ok) throw new Error("Failed to fetch subjects");
    const subjects = await res.json();
    
    const today = new Date().toISOString().split('T')[0];

    // Core Pages & Semesters
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <!-- Core Navigation and Landing -->
  <url>
    <loc>https://notescsbs.vercel.app/</loc>
    <lastmod>${today}T00:00:00+00:00</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://notescsbs.vercel.app/contributors</loc>
    <lastmod>${today}T00:00:00+00:00</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://notescsbs.vercel.app/privacy</loc>
    <lastmod>${today}T00:00:00+00:00</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.4</priority>
  </url>\n\n  <!-- Semesters -->\n`;

    for (let i = 1; i <= 8; i++) {
        xml += `  <url>
    <loc>https://notescsbs.vercel.app/semester/${i}</loc>
    <lastmod>${today}T00:00:00+00:00</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>\n`;
    }
    
    xml += `\n  <!-- In-depth Subject Nodes -->\n`;
    for (const sub of subjects) {
        xml += `  <url>
    <loc>https://notescsbs.vercel.app/subject/${sub.id}</loc>
    <lastmod>${today}T00:00:00+00:00</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>\n`;
    }
    
    xml += `</urlset>`;
    
    fs.writeFileSync('public/sitemap.xml', xml);
    console.log(`Generated sitemap with ${subjects.length} dynamic subject routes.`);
    
  } catch (error) {
    console.error(error);
  }
}

generateSitemap();
