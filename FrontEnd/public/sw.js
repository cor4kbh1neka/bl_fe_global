const getSitemap = async () => {
  try {
    const response = await fetch("/content/stmp",
      {
        method: "GET",
        credentials: "omit",
        headers: {
          'Content-Type': 'application/json',
          'x-customblhdrs' : '09c90c1d6e1b82015737f88d5f5b827060a57c874babe97f965aaa68072585191ce0eab75404312f4f349ee70029404c2d8f66698b6a4da18990445d1437ff79'
        },
      },
    );

    if (response.ok) {
      const data = await response.json();
      return data.data;
    } else {
      console.error("Failed to fetch data from API");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
    return null;
  }
};

const generateSitemapContent = (domain, data) => {
  const today = new Date().toISOString().split('T')[0];

  const staticUrl = `
<url>
  <loc>${domain}/</loc>
  <lastmod>${today}</lastmod>
  <changefreq>daily</changefreq>
  <priority>1.0</priority>
</url>`;

  const dynamicUrls = data.map(item => `
<url>
  <loc>${domain}/${item.urpage}</loc>
  <lastmod>${item.updated_at}</lastmod>
  <changefreq>daily</changefreq>
  <priority>0.8</priority>
</url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticUrl}
  ${dynamicUrls}
</urlset>`;
};

self.addEventListener('fetch', (event) => {
  if (event.request.url.endsWith('/sitemap.xml')) {
    const url = new URL(event.request.url);
    const domain = `${url.protocol}//${url.hostname}`;

    event.respondWith(
      getSitemap().then(data => {
        if (data) {
          const sitemapContent = generateSitemapContent(domain, data);
          return new Response(sitemapContent, {
            headers: { 'Content-Type': 'application/xml' }
          });
        } else {
          return new Response('Failed to fetch sitemap data', { status: 500 });
        }
      }).catch(error => {
        console.error('Error:', error);
        return new Response('Error fetching sitemap data', { status: 500 });
      })
    );
  }
});

getSitemap().then(data => {
  // console.log('Sitemap data:', data);
}).catch(error => {
  console.error('Error:', error);
});
