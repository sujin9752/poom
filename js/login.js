window.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('.login');
  const signup = document.querySelector('.signup');

  if (!page) return;

  // ✅ 진입 페이드인
  requestAnimationFrame(() => {
    page.classList.add('fade-in');
    page.classList.remove('fade-out');
  });

  // ✅ 페이지 이동 함수 (페이드아웃 후 이동)
  function go(url) {
    page.classList.remove('fade-in');
    page.classList.add('fade-out');

    setTimeout(() => {
      window.location.href = url;
    }, 800); // transition 0.8s랑 맞춤
  }

  // ✅ signup 클릭 → category.html
  if (signup) {
    signup.addEventListener('click', () => go('category.html'));

    // 키보드(Enter/Space)로도 클릭되게
    signup.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        go('category.html');
      }
    });
  }
});
