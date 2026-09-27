import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = parseInt(process.env.PORT || '3000', 10);
const DIST_DIR = path.resolve(__dirname, 'dist');

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'text/javascript; charset=UTF-8',
  '.mjs': 'text/javascript; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=UTF-8',
  '.xml': 'application/xml; charset=UTF-8'
};

// Security headers helper
const setSecurityHeaders = (res, isHtml = false) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(self)');
  
  // Content Security Policy allowing Google Fonts, Supabase, and Unsplash images
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com data:; " +
    "img-src 'self' data: blob: https://images.unsplash.com https://*.supabase.co; " +
    "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.unsplash.com; " +
    "frame-ancestors 'self';"
  );

  if (isHtml) {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  } else {
    // 1-year immutable cache for hashed static assets
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  }
};

const server = http.createServer((req, res) => {
  // Reject non-GET / non-HEAD methods for static server
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
    return;
  }

  try {
    // 1. Safe URL parsing and decoding
    const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    let cleanPath = decodeURIComponent(parsedUrl.pathname);

    // Normalize and prevent dotfiles (.env, .git, etc.)
    if (cleanPath.includes('/.') || cleanPath.startsWith('/.')) {
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      res.end('Forbidden');
      return;
    }

    // 2. Resolve safe target path
    let targetPath = path.resolve(DIST_DIR, '.' + cleanPath);

    // Enforce Path Traversal Boundary check
    if (!targetPath.startsWith(DIST_DIR)) {
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      res.end('Forbidden');
      return;
    }

    // Check if target exists
    let isFile = false;
    try {
      const stat = fs.statSync(targetPath);
      if (stat.isFile()) {
        isFile = true;
      } else if (stat.isDirectory()) {
        const indexPath = path.join(targetPath, 'index.html');
        if (fs.existsSync(indexPath) && fs.statSync(indexPath).isFile()) {
          targetPath = indexPath;
          isFile = true;
        }
      }
    } catch {
      isFile = false;
    }

    // 3. SPA Fallback to /index.html if route not found
    if (!isFile) {
      targetPath = path.join(DIST_DIR, 'index.html');
    }

    // Ensure fallback exists
    if (!fs.existsSync(targetPath)) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found: Application build (dist) not found. Run npm run build.');
      return;
    }

    const extname = String(path.extname(targetPath)).toLowerCase();
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';
    const isHtml = extname === '.html';

    setSecurityHeaders(res, isHtml);
    res.writeHead(200, { 'Content-Type': contentType });

    if (req.method === 'HEAD') {
      res.end();
      return;
    }

    const readStream = fs.createReadStream(targetPath);
    readStream.on('error', () => {
      if (!res.headersSent) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
      }
      res.end('Internal Server Error');
    });
    readStream.pipe(res);

  } catch (err) {
    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
    }
    res.end('Internal Server Error');
  }
});

server.listen(PORT, () => {
  console.log(`A2 Realtors Production Server running securely on port ${PORT}`);
});
