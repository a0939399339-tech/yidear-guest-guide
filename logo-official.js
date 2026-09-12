(() => {
  const OFFICIAL_LOGO = 'https://www.yidear-hotel.com/wp-content/uploads/2018/07/LOGO-%E4%BB%8B%E7%B4%B9%E6%97%81-%E6%AD%A3%E7%A2%BA%E7%89%88.png';

  function applyOfficialLogo() {
    const img = document.querySelector('.brand img');
    if (!img) return false;
    if (img.getAttribute('src') !== OFFICIAL_LOGO) {
      img.src = OFFICIAL_LOGO;
      img.removeAttribute('srcset');
    }
    return true;
  }

  if (applyOfficialLogo()) return;

  const root = document.getElementById('app') || document.body;
  const observer = new MutationObserver(() => {
    if (applyOfficialLogo()) observer.disconnect();
  });
  observer.observe(root, { childList: true, subtree: true });
})();
