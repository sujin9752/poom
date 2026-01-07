// pdp.js
document.addEventListener('DOMContentLoaded', () => {

  /* =========================
    뒤로가기 → 메인 홈 이동
  ========================= */
  const backBtn = document.querySelector('.pdp-back');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      window.location.href = 'main.html';
    });
  }

  /* =========================
    상세 펼쳐보기 토글
  ========================= */
  const fold = document.querySelector('.pdp-fold');
  const btn = document.querySelector('.pdp-fold-btn');
  const text = document.querySelector('.pdp-fold-text');
  const arrow = document.querySelector('.pdp-fold-arrow');

  if (fold && btn && text && arrow) {
    btn.addEventListener('click', () => {
      const isCollapsed = fold.getAttribute('data-collapsed') === '1';

      if (isCollapsed) {
        fold.setAttribute('data-collapsed', '0');
        btn.setAttribute('aria-expanded', 'true');
        text.textContent = '접기';
        arrow.textContent = '⌃';
      } else {
        fold.setAttribute('data-collapsed', '1');
        btn.setAttribute('aria-expanded', 'false');
        text.textContent = '펼쳐보기';
        arrow.textContent = '⌄';

        // 접을 때 버튼 위치로 자연스럽게 복귀
        const top = fold.getBoundingClientRect().top + window.scrollY - 110;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  }

  /* =========================
    탭 클릭 → 섹션 스크롤
  ========================= */
  const tabs = document.querySelectorAll('.pdp-tab');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');

      const id = tab.dataset.tab;
      const target = document.getElementById(id);
      if (!target) return;

      // sticky header(5.2rem) + tab(4.6rem) + 여유
      const offset = (5.2 + 4.6) * 10 + 16; // rem 기준
      const y = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

});
