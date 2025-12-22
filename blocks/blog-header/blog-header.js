import { getMetadata } from '../../scripts/aem.js';

/**
 * Decorates the blog-header block.
 * @param {Element} block The blog-header block element
 */
export default async function decorate(block) {
  // 1. Extract Data from Block Rows
  const config = {};
  [...block.children].forEach((row) => {
    if (row.children.length > 1) {
      const key = row.children[0].textContent.trim().toLowerCase().replace(' ', '-');
      const val = row.children[1].textContent.trim();
      config[key] = val;
      if (key === 'author') {
        const firstLink = row.children[1].querySelector('a');
        if (firstLink) {
          config.authorUrl = firstLink.href; // Custom config prop to capture link
        }
      }
    }
  });

  // Clear original content
  block.textContent = '';

  // Data
  // Check for an existing H1 in the document (typ. the default markdown title)
  // We want to use it as our source, but remove it from the flow so it doesn't duplicate.
  let title = getMetadata('og:title');
  const defaultH1 = document.querySelector('h1');
  if (defaultH1) {
    title = defaultH1.textContent;
    defaultH1.remove();
  }

  const author = config.author || getMetadata('author');
  /* author already declared above */
  // Date Logic: Robust fetching similar to author-articles
  let date = config['publication-date'] || getMetadata('publication-date');
  if (!date) {
    const pubDateMeta = document.querySelector('meta[name="publication-date"]')
      || document.querySelector('meta[property="article:published_time"]')
      || document.querySelector('meta[name="date"]');
    if (pubDateMeta) {
      const d = new Date(pubDateMeta.content);
      if (!Number.isNaN(d.getTime())) {
        date = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      }
    }
  }

  const readTime = config['read-time'] || '5 min read'; // Fallback
  // const description = config.description;

  const container = document.createElement('div');
  container.className = 'blog-header-container';

  // 2. Title (H1)
  const h1 = document.createElement('h1');
  h1.textContent = title;
  container.append(h1);

  // 3. Metadata & Actions Container
  const metaContainer = document.createElement('div');
  metaContainer.className = 'blog-meta-container';

  // Left: Author Info
  const authorInfo = document.createElement('div');
  authorInfo.className = 'author-info';

  if (author) {
    let authorName = author;
    let authorImage = null;
    let authorUrl = null;

    // Check if author is a URL/Path OR if we captured a link from the block
    if (config.authorUrl || author.startsWith('/') || author.startsWith('http')) {
      authorUrl = config.authorUrl || author;
      try {
        const resp = await fetch(authorUrl);
        if (resp.ok) {
          const html = await resp.text();
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');

          const fetchedTitle = doc.querySelector('h1')?.textContent.trim()
            || doc.querySelector('meta[property="og:title"]')?.content;

          if (fetchedTitle) {
            // Clean title if it contains " | Site Name" etc.
            authorName = fetchedTitle.split('|')[0].trim();
          }

          // 1. Try to find image in author-metadata block (most specific)
          const metadataBlock = doc.querySelector('.author-metadata');
          if (metadataBlock) {
            [...metadataBlock.children].some((row) => {
              const key = row.children[0]?.textContent.trim().toLowerCase();
              // Check if key contains 'image' (it might be wrapped in code tags)
              if (key.includes('image')) {
                const val = row.children[1]?.textContent.trim();
                if (val) {
                  authorImage = val;
                  return true;
                }
              }
              return false;
            });
          }

          // 2. Fallback to meta tags if no specific image found
          if (!authorImage) {
            authorImage = doc.querySelector('meta[property="og:image"]')?.content
              || doc.querySelector('meta[name="twitter:image"]')?.content;
          }

          // Fix localhost https protocol issue
          if (authorImage && authorImage.startsWith('http')) {
            try {
              const url = new URL(authorImage);
              if (url.hostname === 'localhost' && url.protocol === 'https:') {
                url.protocol = 'http:';
                authorImage = url.href;
              }
            } catch (e) { /* ignore */ }
          }
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('Failed to fetch author profile:', authorUrl, e);
      }
    }

    // Avatar
    const avatar = document.createElement('div');
    avatar.className = 'author-avatar-placeholder';

    if (authorImage) {
      avatar.innerHTML = `<img src="${authorImage}" alt="${authorName}" />`;
      // Remove placeholder styling if image exists, or keep it as wrapper
      avatar.style.backgroundColor = 'transparent';
    } else {
      avatar.textContent = authorName.charAt(0);
    }

    if (authorUrl) {
      const avatarLink = document.createElement('a');
      avatarLink.href = authorUrl;
      avatarLink.setAttribute('aria-label', `View profile of ${authorName}`);
      avatarLink.append(avatar);
      authorInfo.append(avatarLink);
    } else {
      authorInfo.append(avatar);
    }

    // Text Stack
    const textStack = document.createElement('div');
    textStack.className = 'author-text-stack';

    const paramName = document.createElement('div');
    paramName.className = 'author-name';
    if (authorUrl) {
      // Remove redundant link if avatar is already linked to the same place, or add aria-label
      // To avoid redundant focus, we can make this a span if the whole block was clickable,
      // but here we'll just ensure it has context.
      /* Better accessibility: If avatar is a link, maybe this text shouldn't be a
         separate focusable link unless necessary.
         However, for visual consistency, we keep it but ensure aria-label distinguishes it
         or we mark it aria-hidden if redundant. */
      // Strategy: Keep strict link but prevent "empty link" errors on avatar
      // by having labeled it above.
      paramName.innerHTML = `<a href="${authorUrl}" aria-label="View profile of ${authorName}">
        ${authorName}
      </a>`;
    } else {
      paramName.textContent = authorName;
    }
    textStack.append(paramName);

    const subText = document.createElement('div');
    subText.className = 'author-subtext';
    subText.textContent = `${date ? `${date} · ` : ''}${readTime}`;
    textStack.append(subText);

    authorInfo.append(textStack);
  }
  metaContainer.append(authorInfo);

  // Right: Actions (Logo + Subscribe)
  const actions = document.createElement('div');
  actions.className = 'blog-actions';

  // Adobe Red Logo (Text or Icon)
  const logo = document.createElement('div');
  logo.className = 'adobe-red-logo';
  // Use SVG or Text relative to design. Mock has "Adobe Red" + Icon.
  // We'll use a simple text/icon combo for now.
  logo.innerHTML = '<span class="icon icon-adobe-red"></span> <span class="logo-text">ADOBE <strong>RED</strong></span>';
  actions.append(logo);

  // Subscribe Button
  const subscribeBtn = document.createElement('a');
  subscribeBtn.href = '#subscribe';
  subscribeBtn.className = 'subscribe-button';
  subscribeBtn.textContent = 'Subscribe';
  actions.append(subscribeBtn);

  metaContainer.append(actions);

  container.append(metaContainer);
  block.append(container);
}
