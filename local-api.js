/**
 * local-api.js — Local development API server
 *
 * Runs the Vercel Serverless Function handlers as a plain Node.js HTTP server
 * so you can develop against real /api endpoints without vercel dev.
 *
 * Usage (from portfolio/ root):
 *   node local-api.js
 *
 * Serves on: http://localhost:5001
 * Vite proxies /api/* → http://localhost:5001 (see client/vite.config.js)
 */

const http = require('http');
const path = require('path');

// Load environment variables from .env
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const PORT = process.env.LOCAL_API_PORT || 5001;

/**
 * Parse JSON body from the incoming request.
 */
const parseBody = (req) =>
  new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => (raw += chunk));
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        resolve({});
      }
    });
    req.on('error', reject);
  });

/**
 * Build a minimal Express-compatible res shim so the Vercel
 * function handlers (which expect res.status().json()) work unchanged.
 */
const makeRes = (nodeRes) => {
  let statusCode = 200;
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  const res = {
    statusCode,
    status(code) {
      statusCode = code;
      nodeRes.statusCode = code;
      return res;
    },
    setHeader(key, value) {
      headers[key] = value;
      nodeRes.setHeader(key, value);
      return res;
    },
    json(data) {
      nodeRes.statusCode = statusCode;
      Object.entries(headers).forEach(([k, v]) => nodeRes.setHeader(k, v));
      nodeRes.end(JSON.stringify(data));
    },
    send(data) {
      nodeRes.statusCode = statusCode;
      Object.entries(headers).forEach(([k, v]) => nodeRes.setHeader(k, v));
      nodeRes.end(typeof data === 'string' ? data : JSON.stringify(data));
    },
    end(data) {
      nodeRes.statusCode = statusCode;
      Object.entries(headers).forEach(([k, v]) => nodeRes.setHeader(k, v));
      nodeRes.end(data);
    },
  };

  return res;
};

// Import function handlers
const contactHandler = require('./api/contact');

const server = http.createServer(async (req, nodeRes) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = url.pathname;

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    nodeRes.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    nodeRes.end();
    return;
  }

  try {
    const body = await parseBody(req);
    const mockReq = {
      method: req.method,
      url: req.url,
      headers: req.headers,
      body,
    };
    const res = makeRes(nodeRes);

    // Route: POST /api/contact
    if (pathname === '/api/contact') {
      await contactHandler(mockReq, res);
      return;
    }

    // Health check
    if (pathname === '/api/health') {
      res.status(200).json({ status: 'ok', env: process.env.NODE_ENV || 'development' });
      return;
    }

    // 404 for anything else
    res.status(404).json({ error: `No local handler for ${req.method} ${pathname}` });
  } catch (err) {
    console.error('[local-api] Unhandled error:', err.message);
    nodeRes.writeHead(500, { 'Content-Type': 'application/json' });
    nodeRes.end(JSON.stringify({ error: 'Internal server error' }));
  }
});

server.listen(PORT, () => {
  console.log(`\n🚀 Local API server running at http://localhost:${PORT}`);
  console.log(`   POST /api/contact  →  api/contact.js`);
  console.log(`   GET  /api/health   →  health check`);
  console.log(`\n   Vite proxy: /api/* → http://localhost:${PORT}`);
  console.log(`   Start frontend:    cd client && npm run dev\n`);
});
