/* scores.js : skor tertinggi, statistik, dan riwayat permainan per akun (Local Storage) */
const Scores = {
  empty() { return { games: 0, wins: 0, best: 0, total: 0, history: [] }; },

  all() { return Store.read(Store.KEYS.scores, {}); },

  get(username) {
    return Object.assign(this.empty(), this.all()[username.toLowerCase()] || {});
  },

  // Dipanggil saat permainan selesai (menang atau kalah)
  record(username, { score, win, size }) {
    const all = this.all(), key = username.toLowerCase();
    const s = Object.assign(this.empty(), all[key] || {});
    s.games++;
    if (win) s.wins++;
    s.total += score;
    s.best = Math.max(s.best, score);
    s.history = [{ score, win: win ? 1 : 0, size, date: Date.now() }, ...s.history].slice(0, 10);
    all[key] = s;
    Store.write(Store.KEYS.scores, all);
    return s;
  },

  // Peringkat semua akun yang terdaftar di browser ini
  leaderboard(limit = 10) {
    const users = Store.read(Store.KEYS.users, {}), all = this.all();
    return Object.keys(users)
      .map(k => ({ username: users[k].username, avatar: users[k].avatar, ...Object.assign(this.empty(), all[k] || {}) }))
      .filter(r => r.best > 0)
      .sort((a, b) => b.best - a.best)
      .slice(0, limit);
  }
};
