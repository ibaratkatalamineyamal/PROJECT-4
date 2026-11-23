/* login.js : halaman Login */
if (!Auth.redirectIfLoggedIn()) {
  renderNav('login');

  $('form').onsubmit = e => {
    e.preventDefault();
    const r = Auth.login($('username').value, $('password').value);
    showMsg($('msg'), (r.ok ? '✅ ' : '⚠️ ') + r.msg, r.ok ? 'ok' : 'err');
    if (r.ok) setTimeout(() => { location.href = 'dashboard.html'; }, 700);
  };
}
