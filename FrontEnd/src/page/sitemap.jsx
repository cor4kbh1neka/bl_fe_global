import React from 'react';

const Sitemap = () => {
  const xmlContent = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>http://www.example.com/</loc>
        <lastmod>2023-06-05</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
      <!-- Add more URLs as needed -->
    </urlset>
  `;

  return (
    <div>
      <h1>Sitemap</h1>
      <pre>
        <code>
          {xmlContent}
        </code>
      </pre>
    </div>
  );
};

export default Sitemap;