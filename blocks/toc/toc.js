export default function decorate(block) {
  const tocTitle = document.createElement('h2');
  tocTitle.textContent = 'On this page';
  tocTitle.className = 'toc-title';

  const ul = document.createElement('ul');

  // Find all H2s in main
  const headings = document.querySelectorAll('main h2');

  headings.forEach((h) => {
    // Skip the TOC's own title if it's an H2
    if (block.contains(h)) return;

    // Ensure ID exists
    let { id } = h;
    if (!id) {
      id = h.textContent
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      h.id = id;
    }

    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#${id}`;
    a.textContent = h.textContent;
    li.append(a);
    ul.append(li);
  });

  if (ul.children.length > 0) {
    block.textContent = '';
    block.append(tocTitle);
    block.append(ul);
  } else {
    // Hide if no headings
    block.style.display = 'none';
  }

  // Optional: Highlight active link on scroll
  window.addEventListener('scroll', () => {
    // Simple logic to find active section
    // ...
  }, { passive: true });
}
