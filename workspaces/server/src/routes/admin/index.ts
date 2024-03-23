import fs from 'node:fs/promises';

import { Hono } from 'hono';
import { compress } from 'hono/compress';

import { INDEX_HTML_PATH } from '../../constants/paths';

const app = new Hono();

app.use(async (c, next) => {
  const contentType = c.req.header('Content-Type');
  if (contentType && contentType.includes('text')) {
    await compress()(c, next);
  } else {
    await next();
  }
});

app.get('/admin', async (c) => {
  const html = await fs.readFile(INDEX_HTML_PATH, 'utf-8');
  return c.html(html);
});

app.get('/admin/*', async (c) => {
  const html = await fs.readFile(INDEX_HTML_PATH, 'utf-8');
  return c.html(html);
});

export { app as adminApp };
