import { getMetadata } from '../../scripts/aem.js';

/**
 * Decorates the blog-header block.
 * @param {Element} block The blog-header block element
 */
export default function decorate(block) {
  // 1. Extract Data from Block Rows
  const config = {};
  [...block.children].forEach((row) => {
    if (row.children.length > 1) {
      const key = row.children[0].textContent.trim().toLowerCase().replace(' ', '-');
      const val = row.children[1].textContent.trim();
      config[key] = val;
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
  const date = config['publication-date'] || getMetadata('publication-date');
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
    // Avatar
    const avatar = document.createElement('div');
    avatar.className = 'author-avatar-placeholder';
    avatar.textContent = author.charAt(0);
    authorInfo.append(avatar);

    // Text Stack
    const textStack = document.createElement('div');
    textStack.className = 'author-text-stack';

    const paramName = document.createElement('div');
    paramName.className = 'author-name';
    paramName.textContent = author;
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
