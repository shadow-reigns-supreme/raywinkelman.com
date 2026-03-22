import { defineMiddleware } from 'astro:middleware';

const SUPPORTED = ['en', 'es', 'th'] as const;
type Lang = (typeof SUPPORTED)[number];

function getPreferredLang(acceptLanguage: string | null): Lang {
  if (!acceptLanguage) return 'en';

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

  return 'en';
}

export const onRequest = defineMiddleware(({ request, redirect }, next) => {
  const url = new URL(request.url);

  if (url.pathname === '/') {
    const preferred = getPreferredLang(request.headers.get('accept-language'));
    if (preferred !== 'en') {
      return redirect(`/${preferred}/`, 302);
    }
  }

  return next();
});
