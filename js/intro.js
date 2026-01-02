window.onload = function () {
  const intro = document.querySelector('.intro');

  intro.classList.add('fade-in');

  setTimeout(function () {
    intro.classList.remove('fade-in');
    intro.classList.add('fade-out');
  }, 2000);

  setTimeout(function () {
    window.location.href = 'onboarding.html';
  }, 2800); // 2000 + fade-out 0.8초
};
