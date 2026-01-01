(function () {
  const grid = document.getElementById('categoryGrid');
  const btnStart = document.getElementById('btnStart');
  const btnBack = document.getElementById('btnBack');
  const btnSkip = document.getElementById('btnSkip');

  let selectedValue = null;

  function setActive(nextBtn) {
    const cards = grid.querySelectorAll('.card');

    cards.forEach((btn) => {
      const isTarget = btn === nextBtn;
      btn.classList.toggle('is-active', isTarget);
      btn.setAttribute('aria-pressed', String(isTarget));
    });

    selectedValue = nextBtn ? nextBtn.dataset.value : null;
    btnStart.disabled = !selectedValue;
  }

  // 카드 클릭: 하나만 선택되게
  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('.card');
    if (!btn) return;
    setActive(btn);
  });

  // 키보드 접근성: Enter/Space로도 선택
  grid.addEventListener('keydown', (e) => {
    const btn = e.target.closest('.card');
    if (!btn) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActive(btn);
    }
  });

  btnStart.addEventListener('click', () => {
    if (!selectedValue) return;
    // 여기서 다음 화면으로 이동/저장 등 처리
    console.log('선택한 카테고리:', selectedValue);

    // 예시: 다음 페이지 이동
    // location.href = 'next.html';
  });

  btnBack.addEventListener('click', () => {
    history.back();
  });

  btnSkip.addEventListener('click', () => {
    // 스킵 처리
    console.log('스킵');
    // location.href = 'next.html';
  });
})();
