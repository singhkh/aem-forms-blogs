import { getMetadata } from '../../scripts/aem.js';

/**
 * Decorates the blog-header block.
 * @param {Element} block The blog-header block element
 */
export default function decorate(block) {
  // Clear any existing content (this block is data-driven)
  block.textContent = '';

  const title = document.querySelector('h1')?.textContent || getMetadata('og:title');
  const author = getMetadata('author');
  const date = getMetadata('publication-date');
  // We can also fetch author image if we had an author index,
  // but for MVP we might just use a generic icon or initials if no image provided.
  // Or if the author metadata *is* the image (unlikely).
  // For now, we'll just render the text. as per "Mini photo" requirement,
  // we'd theoretically look up the author.
  // We'll leave a placeholder for the image or check if metadata has it.

  const container = document.createElement('div');
  container.className = 'blog-header-container';

  // 1. Title (H1) - Strict ownership
  // If there's already an H1 on the page (from content), we should use/move it
  // or this block *is* the H1 source.
  // Usually in AEM, the first H1 is the title.
  // Use H1 here.
  const h1 = document.createElement('h1');
  h1.textContent = title;
  container.append(h1);

  // 2. Metadata Row
  const metaRow = document.createElement('div');
  metaRow.className = 'blog-header-meta';

  // Author Section
  if (author) {
    const authorSpan = document.createElement('div');
    authorSpan.className = 'blog-author';

    // Placeholder Avatar (Circle)
    const avatar = document.createElement('div');
    avatar.className = 'author-avatar-placeholder';
    avatar.textContent = author.charAt(0); // Initials
    authorSpan.append(avatar);

    const nameSpan = document.createElement('span');
    nameSpan.textContent = author;
    authorSpan.append(nameSpan);

    metaRow.append(authorSpan);
  }

  // Date Section
  if (date) {
    const dateSpan = document.createElement('span');
    dateSpan.className = 'blog-date';
    dateSpan.textContent = date;

    // Separator
    if (author) {
      const sep = document.createElement('span');
      sep.className = 'meta-sep';
      sep.textContent = '|';
      metaRow.append(sep);
    }
    metaRow.append(dateSpan);
  }

  // Views / Share (Placeholders per Cards logic - strict data only for MVP)
  // We can add "Share" link though as that's functional
  const shareLink = document.createElement('a');
  shareLink.href = '#'; // Implement real share later
  shareLink.className = 'blog-share-icon';
  // Simple SVG or text
  shareLink.innerHTML = '<span class="icon icon-share"></span> Share';
  // Add separator
  if (author || date) {
    const sep = document.createElement('span');
    sep.className = 'meta-sep';
    sep.textContent = '|';
    metaRow.append(sep);
  }
  metaRow.append(shareLink);

  container.append(metaRow);
  block.append(container);
}
