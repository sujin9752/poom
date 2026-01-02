// js/login.js
window.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('.login');
  if (!page) return;

  const btnSignup = document.querySelector('.signup');
  const btnLogin = document.querySelector('.btn.btn-primary');
  const btnSkip = document.querySelector('.login-header .skip');

  // 페이드 인 (CSS에 fade-in/out 있어야 함)
  requestAnimationFrame(() => {
    page.classList.add('fade-in');
    page.classList.remove('fade-out');
  });

  function go(url) {
    page.classList.remove('fade-in');
    page.classList.add('fade-out');

    setTimeout(() => {
      window.location.href = url;
    }, 800);
  }

  // 가입하기 -> category.html
  if (btnSignup) {
    btnSignup.addEventListener('click', () => go('./category.html'));
    btnSignup.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        go('./category.html');
      }
    });
  }

  // 로그인 -> main.html (원하면 login_form.html 같은 걸로 바꿔도 됨)
  if (btnLogin) {
    btnLogin.addEventListener('click', () => go('./main.html'));
  }

  // 둘러보기 -> main.html
  if (btnSkip) {
    btnSkip.addEventListener('click', () => go('./main.html'));
  }
});
