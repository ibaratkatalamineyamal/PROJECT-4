/* dashboard.js : halaman Dashboard (info pemain, statistik, riwayat, peringkat) */
const user = Auth.require();
if (user) {
  renderNav('dashboard');

  const getRank = wins =>
    wins >= 50 ? { icon: '👑', title: 'LEGEND', cls: 'p-rank-legend' } :
    wins >= 25 ? { icon: '💎', title: 'CHAMPION', cls: 'p-rank-champion' } :
    wins >= 10 ? { icon: '🌟', title: 'VETERAN', cls: 'p-rank-veteran' } :
    wins >= 3 ? { icon: '⭐', title: 'FIGHTER', cls: 'p-rank-fighter' } :
    { icon: '🥚', title: 'ROOKIE', cls: 'p-rank-rookie' };

  function fillTable(table, head, rows, emptyText) {
    table.replaceChildren();
    const hr = table.insertRow();
    head.forEach(h => { const c = document.createElement('th'); c.textContent = h; hr.append(c); });
    if (!rows.length) {
      const c = table.insertRow().insertCell();
      c.colSpan = head.length; c.className = 'empty-row'; c.textContent = emptyText;
    }
    rows.forEach(r => {
      const tr = table.insertRow();
      r.cells.forEach(v => tr.insertCell().textContent = v);
      if (r.cls) tr.className = r.cls;
      if (r.resultCls) tr.cells[r.resultIdx].className = r.resultCls;
    });
  }

  const s = Scores.get(user.username), rk = getRank(s.wins);

  // Kartu pemain
  $('pav').textContent = user.avatar;
  $('pnm').textContent = user.username;
  $('prk').textContent = rk.icon + ' ' + rk.title;
  $('prk').className = 'p-rank ' + rk.cls;
  $('dash-sub').textContent = 'SELAMAT DATANG, ' + user.username.toUpperCase();

  // Ringkasan permainan
  const stats = [
    ['🎮 MAIN', s.games], ['🏆 MENANG', s.wins],
    ['⭐ SKOR TERTINGGI', s.best], ['📊 TOTAL POIN', s.total],
    ['📈 PERSEN MENANG', s.games ? Math.round(s.wins / s.games * 100) + '%' : '0%'],
    ['🔥 RATA-RATA SKOR', s.games ? Math.round(s.total / s.games) : 0]
  ];
  $('stats').replaceChildren(...stats.map(([k, v], i) => {
    const d = document.createElement('div');
    d.className = 'stat-cell' + (i >= 4 ? ' wide' : '');
    const sm = document.createElement('small'); sm.textContent = k;
    const b = document.createElement('b'); b.textContent = v;
    d.append(sm, b);
    return d;
  }));

  // Riwayat permainan
  fillTable($('hist'), ['TANGGAL', 'PAPAN', 'SKOR', 'HASIL'],
    s.history.map(h => ({
      cells: [new Date(h.date).toLocaleDateString('id-ID'), h.size + '×' + h.size, h.score, h.win ? '✅ MENANG' : '❌ KALAH'],
      resultIdx: 3, resultCls: h.win ? 'win-cell' : 'lose-cell'
    })), 'Belum ada permainan. Tekan MULAI MAIN!');

  // Peringkat semua akun di browser ini
  const medals = ['🥇', '🥈', '🥉'];
  fillTable($('rk'), ['#', 'PEMAIN', 'REKOR', 'MENANG'],
    Scores.leaderboard().map((r, i) => ({
      cells: [i < 3 ? medals[i] : i + 1, r.avatar + ' ' + r.username + (r.username === user.username ? ' (kamu)' : ''), r.best, r.wins],
      cls: r.username === user.username ? 'rank-you' : ''
    })), 'Belum ada skor.');
}
