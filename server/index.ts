import express from 'express';
import compression from 'compression';
import { renderPage } from 'vite-plugin-ssr/server';
import { root } from './root.js';
import sirv from 'sirv';
import path from 'path';

const isProduction = process.env.NODE_ENV === 'production';
const app = express();

app.use(compression());

// Serve static assets
if (isProduction) {
  app.use(sirv(`${root}/dist/client`));
} else {
  const vite = await import('vite');
  const viteDevMiddleware = (
    await vite.createServer({
      root,
      server: { middlewareMode: true }
    })
  ).middlewares;
  app.use(viteDevMiddleware);
}

// Serve static files from public directory
app.use(express.static(path.join(root, 'public')));

// Handle all routes
app.get('*', async (req, res, next) => {
  const pageContextInit = {
    urlOriginal: req.originalUrl
  };

  const pageContext = await renderPage(pageContextInit);
  const { httpResponse } = pageContext;

  if (!httpResponse) {
    return next();
  }

  const { body, statusCode, contentType, earlyHints } = httpResponse;
  
  if (res.writeEarlyHints) {
    res.writeEarlyHints({ link: earlyHints.map((e) => e.earlyHintLink) });
  }

  res.status(statusCode).type(contentType).send(body);
});

// Error handling
app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.use((err: Error, req: express.Request, res: express.Response) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Server running at http://localhost:${port}`);