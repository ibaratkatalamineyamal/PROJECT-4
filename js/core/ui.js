/* ui.js : navigasi bersama untuk semua halaman */
function renderNav(active) {
  const user = Auth.current();
  const items = user
    ? [['index.html', 'BERANDA', 'home'], ['dashboard.html', 'DASHBOARD', 'dashboard'], ['game.html', 'MAIN', 'game'], ['#', 'KELUAR', 'logout']]
    : [['index.html', 'BERANDA', 'home'], ['register.html', 'DAFTAR', 'register'], ['login.html', 'MASUK', 'login']];
  const nav = document.createElement('nav');
  nav.id = 'nav';
  items.forEach(([href, text, key]) => {
    const a = document.createElement('a');
    a.href = href;
    a.textContent = text;
    if (key === active) a.className = 'active';
    if (key === 'logout') {
      a.onclick = e => { e.preventDefault(); Auth.logout(); location.href = 'index.html?logout=1'; };
    }
    nav.append(a);
  });
  $('navbar').replaceChildren(nav);
}
