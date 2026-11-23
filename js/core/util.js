/* util.js : fungsi bantu yang dipakai semua halaman */
const $ = id => document.getElementById(id);

// Pilihan avatar saat registrasi
const AVATARS = ['🐱','🐶','🐰','🦊','🐼','🐧','🐲','🦄','🦁','🐯','🧚','🧜'];

// Tampilkan pesan pada elemen .form-msg (type: 'ok' atau 'err')
function showMsg(el, text, type) {
  el.textContent = text;
  el.className = 'form-msg ' + (type || '');
}

// Buat tombol pilihan avatar di dalam elemen container, kembalikan fungsi pengambil pilihan
function buildAvatarPicker(container) {
  let chosen = AVATARS[0];
  AVATARS.forEach(a => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'char-btn' + (a === chosen ? ' on' : '');
    b.textContent = a;
    b.setAttribute('aria-label', 'Avatar ' + a);
    b.onclick = () => {
      chosen = a;
      container.querySelectorAll('.char-btn').forEach(x => x.classList.toggle('on', x === b));
    };
    container.append(b);
  });
  return () => chosen;
}
