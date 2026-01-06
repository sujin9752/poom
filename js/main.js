// quick-list: 드래그(스와이프)로 가로 스크롤
(function () {
  const el = document.querySelector('.quick-list');
  if (!el) return;

  let isDown = false;
  let startX = 0;
  let startY = 0;
  let scrollLeft = 0;
  let moved = false;

  const DRAG_THRESHOLD = 6;    // 이 이상 움직이면 '드래그'로 인정
  const VERTICAL_GUARD = 12;   // 세로 움직임이 크면 스크롤(세로) 우선

  function point(e) {
    if (e.touches && e.touches[0]) return { x: e.touches[0].pageX, y: e.touches[0].pageY };
    return { x: e.pageX, y: e.pageY };
  }

  function onDown(e) {
    isDown = true;
    moved = false;

    const p = point(e);
    startX = p.x;
    startY = p.y;
    scrollLeft = el.scrollLeft;

    el.classList.add('is-dragging');
  }

  function onMove(e) {
    if (!isDown) return;

    const p = point(e);
    const dx = p.x - startX;
    const dy = p.y - startY;

    // 세로 스크롤이 더 강하면 드래그 취소 (스크롤 우선)
    if (Math.abs(dy) > VERTICAL_GUARD && Math.abs(dy) > Math.abs(dx)) {
      isDown = false;
      el.classList.remove('is-dragging');
      return;
    }

    if (Math.abs(dx) > DRAG_THRESHOLD) moved = true;

    // dx 반대로 스크롤
    el.scrollLeft = scrollLeft - dx;

    // 모바일에서 가로 드래그 중 페이지 스크롤 방지
    if (e.cancelable) e.preventDefault();
  }

  function onUp() {
    isDown = false;
    el.classList.remove('is-dragging');
  }

  // a 태그 클릭 방지(드래그로 움직였을 때만)
  el.addEventListener('click', (e) => {
    if (moved) {
      e.preventDefault();
      e.stopPropagation();
    }
    moved = false;
  }, true);

  // touch
  el.addEventListener('touchstart', onDown, { passive: true });
  el.addEventListener('touchmove', onMove, { passive: false });
  el.addEventListener('touchend', onUp, { passive: true });

  // mouse
  el.addEventListener('mousedown', onDown);
  window.addEventListener('mousemove', onMove, { passive: false });
  window.addEventListener('mouseup', onUp);
})();
