// js/product.js
window.addEventListener('DOMContentLoaded', () => {
  const btnBack = document.querySelector('.back');
  const btnMore = document.getElementById('btnMore');
  const detailMedia = document.getElementById('detailMedia');

  // 뒤로가기
  if (btnBack) {
    btnBack.addEventListener('click', () => history.back());
  }

  // 펼쳐보기
  if (btnMore && detailMedia) {
    btnMore.addEventListener('click', () => {
      const collapsed = detailMedia.classList.contains('is-collapsed');

      detailMedia.classList.toggle('is-collapsed', !collapsed);

      // 버튼 텍스트/aria 업데이트
      btnMore.setAttribute('aria-expanded', String(collapsed));
      btnMore.innerHTML = collapsed
        ? '접기 <span class="chev" aria-hidden="true">˄</span>'
        : '펼쳐보기 <span class="chev" aria-hidden="true">˅</span>';

      // 접기로 돌아갈 때, 상세 상단으로 살짝 이동(원하면 제거 가능)
      if (!collapsed) {
        detailMedia.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // 탭 UI (기본정보만 활성 예시)
  const tabs = document.querySelectorAll('.tabs .tab');
  if (tabs.length) {
    tabs.forEach((t) => {
      t.addEventListener('click', () => {
        tabs.forEach((x) => x.classList.remove('active'));
        t.classList.add('active');
        // 실제 탭 콘텐츠 전환은 필요하면 추가해줄게 (지금은 UI만)
      });
    });
  }
});
