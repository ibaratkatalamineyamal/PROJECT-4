# Onet Pixel Zoo

Gim puzzle Onet (Shisen-Sho) bertema hewan pixel art. Dibuat hanya dengan **HTML, CSS, dan JavaScript** (tanpa framework, tanpa server).
Akun, sesi, dan skor disimpan di **Local Storage**.

## Menjalankan
1. Extract zip, buka folder di VS Code.
2. Buka `index.html` di browser, atau klik kanan lalu **Open with Live Server**.

## Halaman
| File | Halaman | Fungsi |
|---|---|---|
| `index.html` | Home | Judul, deskripsi, navigasi ke Daftar dan Masuk |
| `register.html` | Register | Formulir + validasi, username harus unik, simpan akun |
| `login.html` | Login | Cek username dan password, pesan berhasil atau gagal, lanjut ke Dashboard |
| `dashboard.html` | Dashboard | Info pemain, ringkasan skor, riwayat, peringkat, tombol mulai main |
| `game.html` | Game | Papan Onet, skor, waktu, combo, ulang, kembali ke Dashboard |
| tombol **KELUAR** | Logout | Hapus sesi saja, kembali ke Home |

## Struktur folder
```
index.html  register.html  login.html  dashboard.html  game.html
css/
  base.css        tema arcade, navbar, tombol
  home.css        halaman Home
  auth.css        Register dan Login
  dashboard.css   Dashboard dan peringkat
  game.css        HUD, papan, tombol game
js/
  core/           util.js  storage.js  auth.js  scores.js  ui.js
  pages/          home.js  register.js  login.js  dashboard.js  game-page.js
  game/           audio.js  sprites.js  starfield.js  pathfinding.js  game.js  input.js  renderer.js
assets/sprites/   34 sprite PNG 16x16
docs/PENGUJIAN.md tabel pengujian (hasil aktual diisi sendiri)
```

## Data di Local Storage
| Kunci | Isi |
|---|---|
| `onetzoo.users` | Data akun (username, password, avatar) |
| `onetzoo.session` | Sesi login aktif, dihapus saat logout |
| `onetzoo.scores` | Skor tertinggi, statistik, riwayat 10 permainan terakhir per akun |

Logout hanya menghapus `onetzoo.session`. Akun dan skor tetap ada. Data hanya berlaku untuk browser dan alamat situs yang sama.
Password disimpan apa adanya hanya untuk simulasi pembelajaran, **bukan** sistem autentikasi yang aman.

## Cara bermain
Klik dua ubin hewan yang sama. Keduanya hilang jika bisa dihubungkan dengan jalur maksimal 3 garis lurus (2 belokan) tanpa menembus ubin lain.
+100 per pasangan, combo sampai x5, bonus 5 poin per detik sisa waktu saat menang. Waktu 4 menit; habis berarti kalah.
Kontrol: H=Petunjuk, S=Acak, F=Bekukan waktu, B=Bom, R=Ulang, M=Suara, Esc=Dashboard.

## Publikasi (GitHub Pages)
1. Buat repository baru di GitHub, unggah seluruh isi folder ini (`index.html` harus di root).
2. Settings > Pages > Source: **Deploy from a branch**, pilih branch `main` dan folder `/ (root)`.
3. Tunggu beberapa menit, tautan `https://username.github.io/nama-repo/` siap dipakai.

## Mengganti sprite
Timpa PNG di `assets/sprites/` dengan nama yang sama (16x16, 32x32, atau 64x64). Hewan baru: tambahkan emoji di `ANIMALS` dan nama di `SPRITE_NAMES` pada `js/game/sprites.js`.
