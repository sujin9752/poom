window.onload = function () {
  const intro = document.querySelector('.intro');

  // 이미 fade-in 상태 → 잠시 보여주기
  setTimeout(function () {
    intro.classList.remove('fade-in');
    intro.classList.add('fade-out');
  }, 2000);

  // fade-out 끝나고 페이지 이동
  setTimeout(function () {
    window.location.href = 'onboarding.html';
  }, 2800); // 2000ms + transition 0.8s
};
