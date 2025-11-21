document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');
  const paragraph = document.getElementById('aboutPara');

  function reveal() {
    const triggerBottom = window.innerHeight * 0.85;
    cards.forEach(card => {
      const cardTop = card.getBoundingClientRect().top;
      if (cardTop < triggerBottom) {
        card.classList.add('show');
      }
    });

    if (paragraph && paragraph.getBoundingClientRect().top < triggerBottom) {
      paragraph.classList.add('show');
    }
  }

  window.addEventListener('scroll', reveal);
  reveal();
});
