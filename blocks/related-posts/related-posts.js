import { createOptimizedPicture, getMetadata } from '../../scripts/aem.js';

export default async function decorate(block) {
  // Clear block
  block.textContent = '';

  // 1. Get current page tags
  const tags = getMetadata('article:tag').split(',').map((t) => t.trim().toLowerCase());
  if (tags.length === 0) return;

  // 2. Fetch query-index
  try {
    const resp = await fetch('/query-index.json');
    if (!resp.ok) return;
    const json = await resp.json();

    // 3. Filter articles
    // Rule: Match any tag, exclude current page
    const currentPath = window.location.pathname;
    const relevant = json.data.filter((post) => {
      if (post.path === currentPath) return false;
      const postTags = JSON.parse(post.tags || '[]').map((t) => t.toLowerCase());
      return postTags.some((t) => tags.includes(t));
    });

    // Limit to 3
    const selection = relevant.slice(0, 3);
    if (selection.length === 0) return;

    // 4. Render Grid (Reusing Cards DOM structure)
    const ul = document.createElement('ul');
    ul.className = 'cards-list'; // If we want to reuse CSS selector or just copy styles

    selection.forEach((post) => {
      const li = document.createElement('li');

      const imgDiv = document.createElement('div');
      imgDiv.className = 'cards-card-image';
      // Create optimized picture using image field
      if (post.image) {
        const picture = createOptimizedPicture(post.image, post.title, false, [{ width: '750' }]);
        imgDiv.append(picture);
      }

      const bodyDiv = document.createElement('div');
      bodyDiv.className = 'cards-card-body';

      const h3 = document.createElement('h3');
      const a = document.createElement('a');
      a.href = post.path;
      a.textContent = post.title;
      h3.append(a);
      bodyDiv.append(h3);

      const meta = document.createElement('p');
      meta.textContent = `${post.author || ''} | ${post.date || ''}`;
      bodyDiv.append(meta);

      li.append(imgDiv, bodyDiv);
      ul.append(li);
    });

    block.append(ul);
  } catch (e) {
    // console.warn('Failed to load related posts', e);
  }
}
