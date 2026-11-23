/* game-page.js : menghubungkan halaman game dengan akun pengguna dan Local Storage */
const USER = Auth.require();

// Dipanggil oleh finish() di game.js saat permainan berakhir
function recordGame(win) {
  if (USER) Scores.record(USER.username, { score: G.score, win, size: G.n });
}

if (USER) {
  renderNav('game');

  // Rekor pribadi dan nama pemain pada HUD
  G.best = Scores.get(USER.username).best;
  $('bs').textContent = G.best;
  $('pl').textContent = USER.username;
  $('ot').textContent = '🎮 SIAP MAIN, ' + USER.username.toUpperCase() + '?';

  // Tombol kembali ke Dashboard (dua kali tekan jika permainan sedang berjalan)
  let backArm = 0;
  function goBack() {
    if (G.run && performance.now() - backArm > 3000) {
      backArm = performance.now();
      say('Tekan sekali lagi untuk keluar. Progres papan ini akan hilang.');
      return;
    }
    G.run = false;
    location.href = 'dashboard.html';
  }
  $('back').onclick = goBack;
  $('back2').onclick = goBack;
  document.addEventListener('keydown', e => { if (e.key === 'Escape') goBack(); });

  // Mulai
  buildSprites();
  initStars();
  G.n = 10;
  G.grid = Array.from({ length: 12 }, () => Array(12).fill(0));
  resize();
  requestAnimationFrame(loop);
}
