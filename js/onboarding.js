window.addEventListener('DOMContentLoaded', () => {
  const bg = document.querySelector('.onboarding-bg');
  if (!bg) return;

  // 1) 진입 페이드인
  requestAnimationFrame(() => {
    bg.classList.add('fade-in');
    bg.classList.remove('fade-out');
  });

  // 2) 일정 시간 보여주고 페이드아웃
  setTimeout(() => {
    bg.classList.remove('fade-in');
    bg.classList.add('fade-out');
  }, 3000); // 보여주는 시간

  // 3) 페이드아웃 끝나면 로그인으로 이동
  setTimeout(() => {
    window.location.href = 'login.html';
  }, 3800); // 2000 + 0.8s
});
