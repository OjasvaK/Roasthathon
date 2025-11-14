const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
  // Handle requests for static files
  let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
  
  // Try to read the file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      // Default to index.html for SPA routing
      fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
      });
    } else {
      // Set content type based on file extension
      let contentType = 'text/html';
      const ext = path.extname(filePath);
      
      if (ext === '.js') contentType = 'application/javascript';
      if (ext === '.css') contentType = 'text/css';
      if (ext === '.json') contentType = 'application/json';
      if (ext === '.png') contentType = 'image/png';
      if (ext === '.jpg') contentType = 'image/jpeg';
      if (ext === '.svg') contentType = 'image/svg+xml';
      
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`\n✅ Frontend server running on http://localhost:${PORT}\n`);
  console.log('📝 Make sure backend is running on http://localhost:5000\n');
  console.log('Available routes:');
  console.log('  - / (Home)');
  console.log('  - /projects (Project Showcase)');
  console.log('  - /forum (Forum/Ideas)');
  console.log('  - /upload (Upload Project)');
  console.log('  - /auth (Login/Register)');
  console.log('  - /profile (User Profile)\n');
});
