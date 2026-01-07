// js/login.js
window.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('.login');
  if (!page) return;

  const btnSignup = document.querySelector('.signup');
  const btnLogin = document.querySelector('.btn.btn-primary');
  const btnSkip = document.querySelector('.login-header .skip');

  // 페이드 인
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

  // 가입하기 → category.html
  if (btnSignup) {
    btnSignup.addEventListener('click', () => go('./category.html'));
    btnSignup.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        go('./category.html');
      }
    });
  }

  // 로그인 → main.html
  if (btnLogin) {
    btnLogin.addEventListener('click', () => go('./main.html'));
  }

  // 둘러보기 → category.html ✅ 여기만 바뀜
  if (btnSkip) {
    btnSkip.addEventListener('click', () => go('./category.html'));
  }
});
