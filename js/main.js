// js/main.js
window.addEventListener('DOMContentLoaded', () => {
  /* ======================
    hero slider
  ====================== */
  const slider = document.querySelector('.hero-slider');
  if (slider) {
    const slides = Array.from(slider.querySelectorAll('.hero-slide'));
    const nowEl = slider.querySelector('.hero-page .now');
    const totalEl = slider.querySelector('.hero-page .total');
    const btnPlay = slider.querySelector('.hero-play');

    let idx = 0;
    let timer = null;
    let playing = slider.dataset.autoplay === '1';
    const interval = parseInt(slider.dataset.interval || '3500', 10);

    if (totalEl) totalEl.textContent = String(slides.length);

    function render(n) {
      slides.forEach((s, i) => s.classList.toggle('is-active', i === n));
      if (nowEl) nowEl.textContent = String(n + 1);
    }

    function next() {
      idx = (idx + 1) % slides.length;
      render(idx);
    }

    function start() {
      if (!playing) return;
      stop();
      timer = setInterval(next, interval);
      if (btnPlay) btnPlay.textContent = '⏸';
    }

    function stop() {
      if (timer) clearInterval(timer);
      timer = null;
      if (btnPlay) btnPlay.textContent = '▶';
    }

    render(idx);
    if (playing) start();

    if (btnPlay) {
      btnPlay.addEventListener('click', () => {
        playing = !playing;
        if (playing) start();
        else stop();
      });
    }
  }

  /* ======================
    tab / chip (UI만)
  ====================== */
  document.querySelectorAll('.tab-row .tab').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-row .tab').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  document.querySelectorAll('.chip-row .chip').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.chip-row .chip').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  /* ======================
    heart toggle
  ====================== */
  document.querySelectorAll('.heart').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const on = btn.classList.toggle('on');
      btn.textContent = on ? '♥' : '♡';
    });
  });

  /* ======================
    time deal countdown
    - 초기 텍스트(13:59:10)에서 1초씩 감소
  ====================== */
  const timeEl = document.getElementById('dealTime');
  if (timeEl) {
    function parseTime(str) {
      const parts = (str || '').split(':').map((v) => parseInt(v, 10));
      if (parts.length !== 3 || parts.some((n) => !Number.isFinite(n))) return 0;
      return parts[0] * 3600 + parts[1] * 60 + parts[2];
    }

    function fmt(sec) {
      const h = Math.floor(sec / 3600);
      const m = Math.floor((sec % 3600) / 60);
      const s = sec % 60;
      return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
    }

    let remain = parseTime(timeEl.textContent);

    const tick = () => {
      if (remain <= 0) {
        timeEl.textContent = '00:00:00';
        return;
      }
      remain -= 1;
      timeEl.textContent = fmt(remain);
      setTimeout(tick, 1000);
    };

    tick();
  }

  /* ======================
    bottom nav active (UI만)
  ====================== */
  const navItems = document.querySelectorAll('.bottom-nav .bn-item');
  navItems.forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      navItems.forEach((x) => x.classList.remove('active'));
      a.classList.add('active');
    });
  });
});
