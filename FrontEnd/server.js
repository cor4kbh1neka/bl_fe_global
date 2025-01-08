import express from 'express';

// Fungsi untuk mengambil domain Vite
const getCurrentDomain = () => {
  return 'http://localhost:5173/'; // Set domain Vite di sini
};

// Fungsi untuk mendapatkan tanggal hari ini dalam format YYYY-MM-DD
const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const app = express();

// Rute untuk /sitemap/
app.get('/sitemap/', (req, res) => {
  const domain = getCurrentDomain();
  const todayDate = getTodayDate();

  // Membuat konten XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${domain}</loc>
        <lastmod>${todayDate}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
    </urlset>`;

  // Mengirimkan response dengan tipe konten XML
  res.header('Content-Type', 'application/xml');
  res.send(sitemap);
});

// Menjalankan server
app.listen(3030, () => {
  console.log('Server is running on http://localhost:3030');
});
