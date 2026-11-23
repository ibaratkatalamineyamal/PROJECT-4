/* auth.js : registrasi, login, logout, dan sesi pengguna.
   CATATAN: password disimpan apa adanya di Local Storage hanya untuk simulasi pembelajaran.
   Cara ini TIDAK aman untuk aplikasi sungguhan. */
const Auth = {
  USERNAME_RE: /^[A-Za-z0-9_]+$/,

  // Mengembalikan teks error, atau '' jika semua data valid
  validateRegister(username, password, confirm) {
    if (!username || !password || !confirm) return 'Username, password, dan konfirmasi password wajib diisi.';
    if (username.length < 3 || username.length > 12) return 'Username harus 3 sampai 12 karakter.';
    if (!this.USERNAME_RE.test(username)) return 'Username hanya boleh huruf, angka, dan garis bawah (_).';
    if (password.length < 6) return 'Password minimal 6 karakter.';
    if (password !== confirm) return 'Konfirmasi password tidak sama dengan password.';
    return '';
  },

  register(username, password, confirm, avatar) {
    username = (username || '').trim();
    const err = this.validateRegister(username, password || '', confirm || '');
    if (err) return { ok: false, msg: err };
    const users = Store.read(Store.KEYS.users, {});
    const key = username.toLowerCase();
    if (users[key]) return { ok: false, msg: 'Username "' + username + '" sudah digunakan. Pilih username lain.' };
    users[key] = { username, password, avatar: avatar || AVATARS[0], createdAt: Date.now() };
    if (!Store.write(Store.KEYS.users, users)) return { ok: false, msg: 'Gagal menyimpan akun. Local Storage tidak tersedia.' };
    return { ok: true, msg: 'Registrasi berhasil! Mengarahkan ke halaman login...' };
  },

  login(username, password) {
    username = (username || '').trim();
    if (!username || !password) return { ok: false, msg: 'Username dan password wajib diisi.' };
    const users = Store.read(Store.KEYS.users, {});
    const u = users[username.toLowerCase()];
    if (!u || u.password !== password) return { ok: false, msg: 'Login gagal. Username atau password salah.' };
    Store.write(Store.KEYS.session, { username: u.username, loginAt: Date.now() });
    return { ok: true, msg: 'Login berhasil! Mengarahkan ke Dashboard...' };
  },

  // Hanya menghapus sesi. Data akun dan skor tidak disentuh.
  logout() { Store.remove(Store.KEYS.session); },

  // Pengguna yang sedang login (objek akun) atau null
  current() {
    const s = Store.read(Store.KEYS.session, null);
    if (!s || !s.username) return null;
    const users = Store.read(Store.KEYS.users, {});
    return users[s.username.toLowerCase()] || null;
  },

  // Dipanggil di halaman yang butuh login (Dashboard, Game)
  require() {
    const u = this.current();
    if (!u) { location.replace('login.html'); return null; }
    return u;
  },

  // Dipanggil di Register dan Login: kalau sudah login, langsung ke Dashboard
  redirectIfLoggedIn() {
    if (this.current()) { location.replace('dashboard.html'); return true; }
    return false;
  }
};
