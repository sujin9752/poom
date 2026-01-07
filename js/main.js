/* main.js */

/* =========================
  Hero slider (autoplay + play/pause + page)
========================= */
(function () {
  const slider = document.querySelector('.hero-slider');
  if (!slider) return;

  const track = slider.querySelector('.hero-track');
  const slides = Array.from(slider.querySelectorAll('.hero-slide'));
  const btnPlay = slider.querySelector('.hero-play');
  const nowEl = slider.querySelector('.hero-page .now');
  const totalEl = slider.querySelector('.hero-page .total');

  if (!track || slides.length === 0) return;

  let idx = slides.findIndex(s => s.classList.contains('is-active'));
  if (idx < 0) idx = 0;

  const autoplay = String(slider.dataset.autoplay || '0') === '1';
  const interval = parseInt(slider.dataset.interval || '3500', 10);
  const gap = Number.isFinite(interval) ? interval : 3500;

  let timer = null;
  let isPlaying = autoplay;

  function setPage(i) {
    if (nowEl) nowEl.textContent = String(i + 1);
    if (totalEl) totalEl.textContent = String(slides.length);
  }

  function show(i) {
    slides.forEach((s, n) => {
      if (n === i) s.classList.add('is-active');
      else s.classList.remove('is-active');
    });
    idx = i;
    setPage(idx);
  }

  function next() {
    const n = (idx + 1) % slides.length;
    show(n);
  }

  function stop() {
    if (timer) clearInterval(timer);
    timer = null;
    isPlaying = false;
    if (btnPlay) btnPlay.textContent = '▶';
  }

  function play() {
    if (timer) clearInterval(timer);
    timer = setInterval(next, gap);
    isPlaying = true;
    if (btnPlay) btnPlay.textContent = '⏸';
  }

  // 초기 상태
  show(idx);
  if (btnPlay) btnPlay.textContent = autoplay ? '⏸' : '▶';

  // 자동재생 시작
  if (autoplay) play();

  // 버튼 토글
  if (btnPlay) {
    btnPlay.addEventListener('click', function () {
      if (isPlaying) stop();
      else play();
    });
  }

  // 탭/창 비활성화 시 멈춤(선택)
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      if (isPlaying) stop();
    } else {
      if (autoplay && !isPlaying) play();
    }
  });
})();


/* =========================
  Time Deal: 카운트다운 (#dealTime 기준 1초 감소)
========================= */
(function () {
  const el = document.getElementById('dealTime');
  if (!el) return;

  function parseToSeconds(str) {
    const t = (str || '').trim();
    const parts = t.split(':').map(v => parseInt(v, 10));
    if (parts.length !== 3 || parts.some(n => Number.isNaN(n))) return null;
    const [h, m, s] = parts;
    return (h * 3600) + (m * 60) + s;
  }

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function format(sec) {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  }

  let remain = parseToSeconds(el.textContent);
  if (remain == null) {
    remain = 0;
    el.textContent = '00:00:00';
    return;
  }

  el.textContent = format(remain);

  const timerId = setInterval(() => {
    remain -= 1;

    if (remain <= 0) {
      el.textContent = '00:00:00';
      clearInterval(timerId);
      return;
    }

    el.textContent = format(remain);
  }, 1000);
})();
