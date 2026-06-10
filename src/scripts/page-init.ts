// Shared per-page initialization.
// Imported by both Base.astro and Whitepaper.astro.
// Astro deduplicates modules — this executes exactly once per page lifecycle,
// regardless of which layout loads first or how many navigations occur.

// Navigation progress bar
(function initProgressBar() {
  let doneTimer: ReturnType<typeof setTimeout> | null = null;

  const getBar = () => document.getElementById('nav-progress');

  const start = () => {
    const bar = getBar();
    if (!bar) return;
    if (doneTimer) { clearTimeout(doneTimer); doneTimer = null; }
    bar.classList.remove('done');
    // Force reflow so the transition fires fresh even if bar was mid-animation
    bar.getBoundingClientRect();
    bar.classList.add('started');
  };

  const finish = () => {
    const bar = getBar();
    if (!bar) return;
    bar.classList.remove('started');
    bar.classList.add('done');
    doneTimer = setTimeout(() => {
      bar.classList.remove('done');
      doneTimer = null;
    }, 500);
  };

  document.addEventListener('astro:before-preparation', start);
  document.addEventListener('astro:page-load', finish);
})();

// Nav scroll backdrop — single persistent listener, queries DOM dynamically
window.addEventListener('scroll', () => {
  document.querySelector('.top-nav')?.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// Service worker (production only)
if ('serviceWorker' in navigator && !['localhost', '127.0.0.1'].includes(location.hostname)) {
  navigator.serviceWorker.register('/sw.js').catch(() => {});
}

// Per-page init — fires on every navigation including initial page load
document.addEventListener('astro:page-load', () => {
  initUTM();
  initLangSelect();
  initPrintButton();
  initNameSplit();
  initScrollReveal();
  initWpReveal();
});

function initUTM() {
  for (const a of document.querySelectorAll<HTMLAnchorElement>('a[href]')) {
    const href = a.getAttribute('href');
    if (!href?.startsWith('http') || href.includes('raywinkelman.com')) continue;
    try {
      const u = new URL(href);
      if (!u.searchParams.has('utm_source')) {
        u.searchParams.set('utm_source', 'raywinkelman.com');
        a.setAttribute('href', u.toString());
      }
    } catch { /* malformed href */ }
  }
}

let langSelectAbort: AbortController | null = null;

function initLangSelect() {
  langSelectAbort?.abort();
  langSelectAbort = new AbortController();
  const { signal } = langSelectAbort;

  const drop = document.querySelector<HTMLElement>('[data-lang-drop]');
  if (!drop) return;
  const btn = drop.querySelector('.lang-drop-btn');
  if (!btn) return;

  const close = () => {
    drop.removeAttribute('data-open');
    btn.setAttribute('aria-expanded', 'false');
  };
  const open = () => {
    drop.setAttribute('data-open', '');
    btn.setAttribute('aria-expanded', 'true');
  };

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (drop.hasAttribute('data-open')) { close(); } else { open(); }
  }, { signal });

  document.addEventListener('click', close, { signal });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); }, { signal });
}

function initPrintButton() {
  document.querySelector('.download-btn')?.addEventListener('click', () => window.print());
}

function initNameSplit() {
  const nameEl = document.querySelector('.name');
  if (!nameEl || !window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return;
  const text = nameEl.textContent?.trim() ?? '';
  if (!text) return;
  nameEl.setAttribute('aria-label', text);
  let idx = 0;
  nameEl.innerHTML = text.split(' ').map(word => {
    const spans = [...word].map(ch => {
      const s = `<span class="name-char" aria-hidden="true" style="--i:${idx}">${ch}</span>`;
      idx++;
      return s;
    }).join('');
    idx++;
    return `<span class="name-word">${spans}</span>`;
  }).join(' ');
}

let revealIo: IntersectionObserver | null = null;
let wpRevealIo: IntersectionObserver | null = null;

function initScrollReveal() {
  revealIo?.disconnect();
  const reveals = document.querySelectorAll<HTMLElement>('.reveal');
  if (!('IntersectionObserver' in window)) {
    for (const el of reveals) el.classList.add('visible');
    return;
  }
  revealIo = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) { e.target.classList.add('visible'); revealIo?.unobserve(e.target); }
    }
  }, { rootMargin: '0px 0px -30px 0px', threshold: 0.05 });
  for (const [i, el] of Array.from(reveals).entries()) {
    const manual = el.dataset['delay'];
    el.style.setProperty('--reveal-delay', manual ? `${manual}s` : `${Math.min(i * 0.08, 0.28)}s`);
    revealIo.observe(el);
  }
}

function initWpReveal() {
  wpRevealIo?.disconnect();
  const wpBody = document.querySelector('.wp-body');
  if (!wpBody || !('IntersectionObserver' in window)) return;
  wpRevealIo = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) { e.target.classList.add('visible'); wpRevealIo?.unobserve(e.target); }
    }
  }, { rootMargin: '0px 0px -20px 0px', threshold: 0.05 });
  for (const [i, el] of Array.from(wpBody.children).entries()) {
    if (el instanceof HTMLElement) el.style.setProperty('--wp-i', String(i));
    wpRevealIo.observe(el);
  }
}
