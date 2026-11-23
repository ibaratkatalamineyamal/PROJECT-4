/* home.js : halaman Home */
renderNav('home');

// Deretan sprite hewan sebagai hiasan
const COLORS = ['#00e5ff', '#ff2bd6', '#ffe600', '#7cff3a', '#ff7a1a', '#9b6bff', '#2b8cff', '#00ffa3'];
['01-kucing', '06-panda', '09-unicorn', '08-naga', '28-peri', '10-phoenix', '13-kraken', '31-hantu'].forEach((n, i) => {
  const img = document.createElement('img');
  img.src = 'assets/sprites/' + n + '.png';
  img.alt = n.slice(3);
  img.style.borderColor = COLORS[i % COLORS.length];
  $('sprites').append(img);
});

// Tombol sesuai status login
const user = Auth.current();
const cta = $('cta');
function link(href, text, cls) {
  const a = document.createElement('a');
  a.href = href; a.textContent = text; a.className = 'start-btn ' + (cls || '');
  cta.append(a);
}
if (user) {
  link('dashboard.html', '▶ KE DASHBOARD (' + user.username.toUpperCase() + ')');
} else {
  link('register.html', '📝 DAFTAR');
  link('login.html', '🔑 MASUK', 'alt');
}

// Pesan setelah logout
if (new URLSearchParams(location.search).get('logout') === '1') {
  const b = $('banner');
  b.textContent = '✅ Kamu sudah keluar. Data akun dan skor tetap tersimpan.';
  b.classList.remove('hid');
}
