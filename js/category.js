// js/category.js
window.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.category-grid');
  const btnStart = document.querySelector('.cta');
  const btnBack = document.querySelector('.back');
  const btnSkip = document.querySelector('.skip');

  if (!grid || !btnStart) return;

  let selectedLabel = null;

  // 시작 버튼: 선택 전에는 막기(원하면 CSS로 비활성 스타일도 줄 수 있음)
  btnStart.disabled = true;

  function setActive(targetBtn) {
    const cards = grid.querySelectorAll('.category-card');

    cards.forEach((btn) => {
      const isOn = btn === targetBtn;
      btn.classList.toggle('active', isOn);
      btn.setAttribute('aria-pressed', String(isOn));
    });

    // 선택값 저장(텍스트 기준)
    selectedLabel = targetBtn ? (targetBtn.querySelector('.card-label')?.textContent || '') : null;
    btnStart.disabled = !selectedLabel;

    // 필요하면 다음 페이지에서 쓰라고 저장
    if (selectedLabel) {
      localStorage.setItem('poom_category', selectedLabel);
    }
  }

  // 클릭: 단일 선택
  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('.category-card');
    if (!btn) return;
    setActive(btn);
  });

  // 키보드 접근: Enter / Space로도 선택
  grid.addEventListener('keydown', (e) => {
    const btn = e.target.closest('.category-card');
    if (!btn) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActive(btn);
    }
  });

  // 탐색 시작하기 -> main.html
  btnStart.addEventListener('click', () => {
    if (!selectedLabel) return;
    window.location.href = './main.html';
  });

  // 뒤로가기
  if (btnBack) {
    btnBack.addEventListener('click', () => history.back());
  }

  // 건너뛰기 -> main.html (원하면 category 선택 화면 스킵이니까 main으로 가는 게 자연스러움)
  if (btnSkip) {
    btnSkip.addEventListener('click', () => {
      localStorage.removeItem('poom_category');
      window.location.href = './main.html';
    });
  }
});
