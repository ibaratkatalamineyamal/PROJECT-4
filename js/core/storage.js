/* storage.js : pembungkus Local Storage
   Kunci yang dipakai:
   - onetzoo.users   : data akun    { "username(huruf kecil)": {username, password, avatar, createdAt} }
   - onetzoo.session : sesi aktif   { username, loginAt }
   - onetzoo.scores  : data skor    { "username(huruf kecil)": {games, wins, best, total, history[]} }
*/
const Store = {
  KEYS: { users: 'onetzoo.users', session: 'onetzoo.session', scores: 'onetzoo.scores' },

  read(key, fallback) {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : fallback;
    } catch (e) { return fallback; }
  },
  write(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch (e) { return false; }
  },
  remove(key) {
    try { localStorage.removeItem(key); } catch (e) {}
  }
};
