// server.js
import express from 'express';

const app = express();
const port = 3000;

app.get('/rss.xml', (req, res) => {
  const rssContent = `
    <?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
        <title>Example RSS Feed</title>
        <link>http://www.example.com</link>
        <description>This is an example RSS feed</description>
        <item>
          <title>Example Item 1</title>
          <link>http://www.example.com/item1</link>
          <description>Description of example item 1</description>
          <pubDate>Wed, 05 Jun 2024 00:00:00 GMT</pubDate>
        </item>
        <item>
          <title>Example Item 2</title>
          <link>http://www.example.com/item2</link>
          <description>Description of example item 2</description>
          <pubDate>Thu, 06 Jun 2024 00:00:00 GMT</pubDate>
        </item>
        <!-- Add more items as needed -->
      </channel>
    </rss>
  `;

  res.header('Content-Type', 'application/rss+xml');
  res.send(rssContent);
});

app.use(express.static('dist'));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
