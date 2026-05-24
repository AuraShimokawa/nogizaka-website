/*
  script.js
  - 初心者向けにコメントをつけたシンプルなスクリプト
  - クリックでカードを開閉（詳細表示）
  - スムーススクロール（アンカーリンク）
*/

document.addEventListener('DOMContentLoaded', function () {
  const body = document.body;
  const overlay = document.createElement('div');
  overlay.className = 'card-overlay';
  overlay.addEventListener('click', closeExpandedCard);
  body.appendChild(overlay);

  // カードをクリックすると拡張／縮小を切り替える
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    // キーボード操作にも対応できるように tabindex を追加
    card.setAttribute('tabindex','0');
    card.setAttribute('aria-expanded','false');

    card.addEventListener('click', () => {
      toggleCard(card);
    });

    // EnterキーやSpaceキーでも開閉できる
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleCard(card);
      }
      if (e.key === 'Escape') {
        closeExpandedCard();
      }
    });
  });

  function closeExpandedCard() {
    const expandedCard = document.querySelector('.card.expanded');
    if (!expandedCard) return;
    expandedCard.classList.remove('expanded');
    expandedCard.setAttribute('aria-expanded','false');
    body.classList.remove('card-open');
    overlay.classList.remove('active');
  }

  function toggleCard(card) {
    const isExpanded = card.classList.contains('expanded');
    if (isExpanded) {
      closeExpandedCard();
      return;
    }
    closeExpandedCard();
    card.classList.add('expanded');
    card.setAttribute('aria-expanded','true');
    body.classList.add('card-open');
    overlay.classList.add('active');
  }

  // スムーススクロール：内部リンクの移動を滑らかにする
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
      }
    });
  });

  // 追加の改善案メモ（コメント）:
  // - モーダルでメンバーの詳細を出す
  // - アニメーションを増やす（prefers-reduced-motion を考慮）
});
