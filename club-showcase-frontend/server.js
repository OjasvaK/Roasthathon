const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// Read HTML template once
let htmlContent = '';
try {
  htmlContent = fs.readFileSync(path.join(__dirname, 'public', 'index.html'), 'utf8');
} catch (e) {
  console.error('Failed to read index.html:', e);
  htmlContent = '<html><body>Index.html not found</body></html>';
}

const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Cache-Control', 'no-cache');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Remove query string
  let reqPath = req.url.split('?')[0];
  
  // Serve root and SPA routes as index.html
  if (reqPath === '/' || reqPath.endsWith('.html') || !path.extname(reqPath)) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(htmlContent);
    return;
  }

  // Try to serve static files from public folder
  let filePath = path.join(__dirname, 'public', reqPath);
  
  fs.readFile(filePath, (err, content) => {
    if (err) {
      // File not found, serve index.html for SPA routing
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(htmlContent);
    } else {
      // Determine content type
      const ext = path.extname(filePath).toLowerCase();
      let contentType = 'text/html';
      
      const mimeTypes = {
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon',
        '.woff': 'font/woff',
        '.woff2': 'font/woff2',
        '.ttf': 'font/ttf',
        '.eot': 'application/vnd.ms-fontobject'
      };
      
      contentType = mimeTypes[ext] || 'text/html';
      
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`\n✅ Frontend server running on http://localhost:${PORT}\n`);
  console.log('📝 Make sure backend is running on http://localhost:5000\n');
  console.log('Available routes:');
  console.log('  - http://localhost:3000              (Home)');
  console.log('  - http://localhost:3000/projects     (Project Showcase)');
  console.log('  - http://localhost:3000/forum        (Forum/Ideas)');
  console.log('  - http://localhost:3000/upload       (Upload Project)');
  console.log('  - http://localhost:3000/auth         (Login/Register)');
  console.log('  - http://localhost:3000/profile      (User Profile)\n');
});

process.on('SIGINT', () => {
  console.log('\n✋ Server stopping...');
  server.close();
  process.exit(0);
});
