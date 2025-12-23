/**
 * Decorates the TOC block.
 * @param {Element} block The TOC block element
 */
export default function decorate(block) {
  const main = document.querySelector('main');
  if (!main) return;

  // Identify headings
  const headings = main.querySelectorAll('h2, h3');
  if (headings.length === 0) {
    block.remove(); // No TOC if no headings
    return;
  }

  const nav = document.createElement('nav');
  nav.className = 'toc-nav';
  nav.setAttribute('aria-label', 'Table of Contents');

  const title = document.createElement('p');
  title.className = 'toc-title';
  title.textContent = 'Table of Contents';
  nav.append(title);

  const ul = document.createElement('ul');

  headings.forEach((h, index) => {
    // Generate ID if missing
    if (!h.id) {
      h.id = h.textContent
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      if (!h.id) h.id = `section-${index + 1}`;
    }

    const li = document.createElement('li');
    li.className = `toc-item toc-${h.tagName.toLowerCase()}`;

    const a = document.createElement('a');
    a.href = `#${h.id}`;
    a.textContent = h.textContent;
    a.addEventListener('click', (e) => {
      e.preventDefault();
      h.scrollIntoView({ behavior: 'smooth' });
      // Update history
      window.history.pushState(null, null, `#${h.id}`);
    });

    li.append(a);
    ul.append(li);
  });

  nav.append(ul);
  block.textContent = '';
  block.append(nav);

  // Optional: Scroll Spy logic could go here
  window.addEventListener('scroll', () => {
    // Simple active state logic
    // ...
  }, { passive: true });
}
