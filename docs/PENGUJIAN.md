# Tabel Pengujian (Testing)

Isi kolom **Hasil Aktual** dan **Status** (Berhasil / Gagal) setelah setiap skenario benar-benar dicoba langsung di browser.
Kolom tersebut sengaja dikosongkan.

## Pengujian Halaman dan Autentikasi

| No | Fitur | Skenario Pengujian | Hasil yang Diharapkan | Hasil Aktual | Status |
|---|---|---|---|---|---|
| 1 | Home | Membuka halaman utama gim | Halaman Home ditampilkan dengan benar |  |  |
| 2 | Navigasi | Menekan tombol navigasi | Pengguna diarahkan ke halaman yang sesuai |  |  |
| 3 | Register | Mendaftar menggunakan data yang valid | Akun berhasil dibuat |  |  |
| 4 | Validasi Register | Mengirim formulir registrasi dalam keadaan kosong | Sistem menampilkan pesan bahwa data wajib diisi |  |  |
| 5 | Validasi Username | Mendaftar menggunakan username yang sudah terdaftar | Sistem menolak username yang sama |  |  |
| 6 | Login Berhasil | Memasukkan username dan password yang benar | Pengguna berhasil masuk ke Dashboard |  |  |
| 7 | Login Gagal | Memasukkan username atau password yang salah | Sistem menampilkan pesan login gagal |  |  |
| 8 | Dashboard | Membuka Dashboard setelah login | Informasi pengguna ditampilkan dengan benar |  |  |
| 9 | Logout | Menekan tombol Logout (KELUAR) | Sesi pengguna berakhir dan diarahkan ke halaman Home |  |  |

## Pengujian Permainan

| No | Fitur | Skenario Pengujian | Hasil yang Diharapkan | Hasil Aktual | Status |
|---|---|---|---|---|---|
| 10 | Mulai Bermain | Menekan tombol mulai permainan | Halaman permainan berhasil dibuka |  |  |
| 11 | Mekanisme Permainan | Mencocokkan dua ubin sama dengan jalur maksimal 2 belokan | Pasangan ubin hilang, jalur terhalang ditolak |  |  |
| 12 | Kontrol Permainan | Klik ubin, tombol Petunjuk, Acak, Bekukan, Bom | Objek dan tombol merespons dengan benar |  |  |
| 13 | Sistem Skor | Mencocokkan pasangan ubin | Skor bertambah 100 x combo (maks x5) |  |  |
| 14 | Kondisi Permainan | Menghabiskan semua ubin atau membiarkan waktu habis | Layar menang atau kalah tampil dengan skor akhir |  |  |
| 15 | Mulai Ulang | Menekan tombol ULANG atau MAIN LAGI | Permainan dimulai ulang dengan papan baru |  |  |

## Pengujian Local Storage

| No | Fitur | Skenario Pengujian | Hasil yang Diharapkan | Hasil Aktual | Status |
|---|---|---|---|---|---|
| 16 | Penyimpanan Akun | Melakukan registrasi akun baru | Data akun tersimpan di Local Storage (onetzoo.users) |  |  |
| 17 | Pengambilan Akun | Melakukan login menggunakan akun terdaftar | Sistem dapat membaca data akun dari Local Storage |  |  |
| 18 | Penyimpanan Sesi | Login kemudian memuat ulang halaman | Sesi tetap tersedia (onetzoo.session) |  |  |
| 19 | Penyimpanan Skor | Menyelesaikan permainan dan memperoleh skor | Data skor tersimpan di Local Storage (onetzoo.scores) |  |  |
| 20 | Pengambilan Skor | Membuka kembali Dashboard atau halaman permainan | Data skor yang tersimpan ditampilkan kembali |  |  |
| 21 | Ketahanan Data | Menutup browser lalu membuka kembali gim di alamat yang sama | Data akun dan data permainan tetap tersedia |  |  |
| 22 | Logout | Melakukan logout setelah login | Data sesi dihapus tanpa menghapus data akun dan skor |  |  |
| 23 | Login Kembali | Login kembali setelah logout | Akun dapat dipakai lagi dan data permainan tetap tersedia |  |  |

## Pengujian Publikasi

| No | Fitur | Skenario Pengujian | Hasil yang Diharapkan | Hasil Aktual | Status |
|---|---|---|---|---|---|
| 24 | Repository GitHub | Membuka tautan repository | Repository dapat diakses |  |  |
| 25 | Deployment | Membuka tautan gim yang dipublikasikan | Gim dapat diakses melalui internet |  |  |
| 26 | Fitur Gim Publikasi | Mencoba fitur utama pada gim yang dipublikasikan | Fitur utama berjalan dengan benar |  |  |
| 27 | Local Storage Publikasi | Registrasi, login, dan simpan skor pada gim yang dipublikasikan | Data dapat disimpan dan dibaca kembali di browser dan alamat yang sama |  |  |

## Rekapitulasi

| No | Keterangan | Jumlah |
|---|---|---|
| 1 | Total skenario pengujian | 27 |
| 2 | Pengujian Berhasil |  |
| 3 | Pengujian Gagal |  |

Persentase Keberhasilan = (Berhasil / Total) x 100%
