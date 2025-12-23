import { createOptimizedPicture, getMetadata } from '../../scripts/aem.js';

/**
 * Generates a color-coded placeholder with initials
 * @param {string} title
 * @returns {HTMLElement}
 */
function createPlaceholder(title) {
  const div = document.createElement('div');
  div.className = 'placeholder';

  // Extract initials (max 2 characters)
  const initials = title
    .split(' ')
    .filter((word) => word.length > 0)
    .map((word) => word[0].toUpperCase())
    .slice(0, 2)
    .join('');

  div.textContent = initials;

  // Generate a consistent random color based on title length
  const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#9b59b6', '#34495e'];
  const colorIndex = title.length % colors.length;
  div.style.backgroundColor = colors[colorIndex];
  div.style.color = '#fff';

  return div;
}

/**
 * Renders the posts into the block
 * @param {Array} posts - Array of { link, title, image, date }
 * @param {HTMLElement} block
 */
function renderPosts(posts, block) {
  const ul = document.createElement('ul');

  posts.forEach((post) => {
    const li = document.createElement('li');

    // 1. Image Container
    const imgDiv = document.createElement('div');
    imgDiv.className = 'related-post-image';

    if (post.image) {
      const picture = createOptimizedPicture(post.image, post.title, false, [{ width: '240' }]);
      // Add error handler fallback to placeholder
      const img = picture.querySelector('img');
      img.onerror = () => {
        imgDiv.innerHTML = ''; // Clear broken picture
        imgDiv.append(createPlaceholder(post.title));
      };
      imgDiv.append(picture);
    } else {
      imgDiv.append(createPlaceholder(post.title));
    }

    // 2. Content Container
    const bodyDiv = document.createElement('div');
    bodyDiv.className = 'related-post-content';

    const a = document.createElement('a');
    a.href = post.link;
    a.textContent = post.title;

    bodyDiv.append(a);

    li.append(imgDiv, bodyDiv);
    ul.append(li);
  });

  block.innerHTML = '';

  // Add Header
  const header = document.createElement('h3');
  header.textContent = 'Related Posts';
  header.style.fontSize = '1.1rem';
  header.style.marginBottom = '16px';
  header.style.marginTop = '0';
  header.style.borderBottom = '1px solid #eee'; // Match TOC style often seen
  header.style.paddingBottom = '8px';

  block.append(header);
  block.append(ul);
}

export default async function decorate(block) {
  const rows = [...block.children];
  const posts = [];

  // 1. Check for Authored Content
  if (rows.length > 0) {
    // Determine if we need to fetch index for metadata lookup
    let indexData = null;
    const needsLookup = rows.some((row) => row.children.length === 1 && row.querySelector('a'));

    if (needsLookup) {
      try {
        const resp = await fetch('/query-index.json');
        if (resp.ok) {
          const json = await resp.json();
          indexData = json.data;
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('Index fetch failed', e);
      }
    }

    // Parse each row
    rows.forEach((row) => {
      const linkEl = row.querySelector('a');
      if (!linkEl) return;

      const link = linkEl.href;
      const title = linkEl.textContent;
      const imgEl = row.querySelector('img');

      let image = null;
      if (imgEl) {
        // Scenario A: Image + Link provided
        image = imgEl.src;
      } else if (indexData) {
        // Scenario B: Link only -> Metadata Lookup
        const path = new URL(link, window.location.origin).pathname;
        const entry = indexData.find((d) => d.path === path);
        if (entry && entry.image) {
          image = entry.image;
        }
      }

      posts.push({ link, title, image });
    });
  } else {
    // 2. Auto Fetch (Fallback if blocks empty)
    const tags = getMetadata('article:tag').split(',').map((t) => t.trim().toLowerCase()).filter((t) => t);

    try {
      const resp = await fetch('/query-index.json');
      if (resp.ok) {
        const json = await resp.json();
        const currentPath = window.location.pathname;

        const relevant = json.data.filter((post) => {
          if (post.path === currentPath) return false;
          if (tags.length > 0) {
            const postTags = JSON.parse(post.tags || '[]').map((t) => t.toLowerCase());
            return postTags.some((t) => tags.includes(t));
          }
          return true; // Fallback to latest
        });

        relevant.slice(0, 3).forEach((post) => {
          posts.push({
            link: post.path,
            title: post.title,
            image: post.image,
          });
        });
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('Auto fetch failed', e);
    }
  }

  if (posts.length > 0) {
    renderPosts(posts, block);
  }
}
