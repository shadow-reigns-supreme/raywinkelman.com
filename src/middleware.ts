import { defineMiddleware } from 'astro:middleware';

const SUPPORTED = ['en', 'es', 'th'] as const;
type Lang = (typeof SUPPORTED)[number];

const ES_COUNTRIES = new Set([
  'AR','BO','CL','CO','CR','CU','DO','EC','ES','GT',
  'GQ','HN','MX','NI','PA','PE','PR','PY','SV','UY','VE',
]);

function getLangFromHeader(acceptLanguage: string | null): Lang | null {
  if (!acceptLanguage) return null;

  const langs = acceptLanguage
    .split(',')
    .map((part) => {
      const [lang, q] = part.trim().split(';q=');
      return { lang: lang.trim().toLowerCase().split('-')[0], q: q ? parseFloat(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { lang } of langs) {
    if (SUPPORTED.includes(lang as Lang)) return lang as Lang;
  }

  return null;
}

function getLangFromCountry(country: string | undefined): Lang | null {
  if (!country) return null;
  if (country === 'TH') return 'th';
  if (ES_COUNTRIES.has(country)) return 'es';
  return null;
}

export const onRequest = defineMiddleware(({ request, redirect }, next) => {
  const url = new URL(request.url);

  if (url.pathname === '/') {
    const cf = (request as unknown as { cf?: { country?: string } }).cf;

    const preferred =
      getLangFromHeader(request.headers.get('accept-language')) ??
      getLangFromCountry(cf?.country) ??
      'en';

    if (preferred !== 'en') {
      return redirect(`/${preferred}/`, 302);
    }
  }

  return next();
});
