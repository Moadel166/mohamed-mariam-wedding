const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.ts': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  const pathname = decodeURIComponent(req.url.split('?')[0]);
  let filePath = pathname === '/' ? path.join(root, 'index.html') : path.join(root, pathname.replace(/^\//, ''));
  if (!fs.existsSync(filePath)) {
    filePath = path.join(root, 'public', pathname.replace(/^\//, ''));
  }
  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(root, 'index.html');
  }
  const ext = path.extname(filePath).toLowerCase();
  res.setHeader('Cache-Control', 'no-cache');
  res.writeHead(200, { 'Content-Type': mime[ext] || 'text/plain; charset=utf-8' });
  fs.createReadStream(filePath).pipe(res);
});

const port = Number(process.env.PORT || 3000);
server.listen(port, '0.0.0.0', () => console.log(`Wedding invitation listening on ${port}`));
