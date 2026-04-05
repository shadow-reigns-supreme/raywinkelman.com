import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = 'https://raywinkelman.com';
const today = new Date().toISOString().split('T')[0];

const HREFLANG = `
    <xhtml:link rel="alternate" hreflang="en"        href="${BASE}/"/>
    <xhtml:link rel="alternate" hreflang="es"        href="${BASE}/es/"/>
    <xhtml:link rel="alternate" hreflang="th"        href="${BASE}/th/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE}/"/>`.trimStart();

const pages = [
  { loc: `${BASE}/`,                              hreflang: true,  priority: '1.0' },
  { loc: `${BASE}/es/`,                           hreflang: true,  priority: '0.8' },
  { loc: `${BASE}/th/`,                           hreflang: true,  priority: '0.8' },
  { loc: `${BASE}/americanguntrader/`,            hreflang: false, priority: '0.7' },
  { loc: `${BASE}/dabdash/`,                      hreflang: false, priority: '0.7' },
  { loc: `${BASE}/orderprepped/`,                 hreflang: false, priority: '0.7' },
  { loc: `${BASE}/blog/`,                         hreflang: false, priority: '0.6' },
];

const urls = pages.map(({ loc, hreflang, priority }) => `
  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>${hreflang ? `\n    ${HREFLANG}` : ''}
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`).join('');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}
</urlset>
`;

const out = resolve(__dirname, '../public/sitemap.xml');
writeFileSync(out, xml, 'utf8');
console.log(`sitemap.xml written (${pages.length} URLs, lastmod ${today})`);
