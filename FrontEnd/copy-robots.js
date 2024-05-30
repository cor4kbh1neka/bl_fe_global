const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, 'dev', 'robots.txt');
const destination = path.join(__dirname, 'dist', 'robots.txt');

fs.copyFile(source, destination, (err) => {
  if (err) {
    console.error('Error copying robots.txt:', err);
  } else {
    console.log('robots.txt was copied to dist folder');
  }
});
