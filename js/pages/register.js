/* register.js : halaman Register */
if (!Auth.redirectIfLoggedIn()) {
  renderNav('register');
  const getAvatar = buildAvatarPicker($('avs'));

  $('form').onsubmit = e => {
    e.preventDefault();
    const r = Auth.register($('username').value, $('password').value, $('confirm').value, getAvatar());
    showMsg($('msg'), (r.ok ? '✅ ' : '⚠️ ') + r.msg, r.ok ? 'ok' : 'err');
    if (r.ok) setTimeout(() => { location.href = 'login.html'; }, 1300);
  };
}
