const STORAGE_KEY = 'dk-cookies';

function getBanner(): HTMLElement | null {
  return document.getElementById('cookie-banner');
}

function dismiss(): void {
  const banner = getBanner();
  if (banner) banner.setAttribute('hidden', '');
}

function setConsent(value: 'all' | 'necessary'): void {
  localStorage.setItem(STORAGE_KEY, value);
  dismiss();
}

function init(): void {
  if (localStorage.getItem(STORAGE_KEY)) return;
  const banner = getBanner();
  if (banner) banner.removeAttribute('hidden');
}

document
  .getElementById('cookie-accept-all')
  ?.addEventListener('click', () => setConsent('all'));

document
  .getElementById('cookie-necessary')
  ?.addEventListener('click', () => setConsent('necessary'));

init();
