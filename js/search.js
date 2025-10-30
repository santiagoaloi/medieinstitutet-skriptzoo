(function () {
  const input = document.getElementById('search');
  const container = document.getElementById('animals');
  const noResults = document.getElementById('no-results');
  const cards = Array.from(container.querySelectorAll('.card'));
  const sortRadios = document.querySelectorAll('input[name="sort"]');

  function matchesSearch(card, term) {
    const name = card.dataset.name.toLowerCase();
    const type = card.dataset.type.toLowerCase();
    const color = (card.dataset.color || '').toLowerCase();
    const desc = (card.dataset.desc || '').toLowerCase();
    const birth = (card.dataset.birth || '').toLowerCase();
    return !term ||
      name.includes(term) ||
      type.includes(term) ||
      color.includes(term) ||
      desc.includes(term) ||
      birth.includes(term);
  }

  function filterCards(query) {
    const term = (query || '').toLowerCase().trim();
    let visibleCount = 0;

    cards.forEach(card => {
      const isVisible = matchesSearch(card, term);
      card.style.display = isVisible ? '' : 'none';
      if (isVisible) visibleCount++;
    });

    noResults.style.display = visibleCount === 0 ? 'block' : 'none';
  }

  function sortCards(by) {
    const sorted = [...cards].sort((a, b) => {
      if (by === 'name') return a.dataset.name.localeCompare(b.dataset.name);
      if (by === 'type') return a.dataset.type.localeCompare(b.dataset.type);
      if (by === 'color') return a.dataset.color.localeCompare(b.dataset.color);
      if (by === 'birth') return a.dataset.birth - b.dataset.birth;
      if (by === 'desc') return a.dataset.desc.localeCompare(b.dataset.desc);
      return 0;
    });

    sorted.forEach(card => container.appendChild(card));
  }

  // Listeners
  function setupSearch() {
    input.addEventListener('input', e => filterCards(e.target.value));
  }

  function setupSort() {
    sortRadios.forEach(radio => {
      radio.addEventListener('change', () => sortCards(radio.value));
    });
  }

  // Initialization
  function init() {
    setupSearch();
    setupSort();

    // Force initial sort by name, its a bit cleaner.
    sortCards('name');
  }

  init();
})();
