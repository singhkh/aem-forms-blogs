import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');

    // Extract the link from the title cell (if it exists)
    let cardLink = null;
    const titleCell = row.children[1]; // Second column contains title
    if (titleCell) {
      const existingLink = titleCell.querySelector('a');
      if (existingLink) {
        cardLink = existingLink.href;
      }
    }

    while (row.firstElementChild) li.append(row.firstElementChild);

    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'story-image';
        // Make image clickable
        if (cardLink) {
          const imageLink = document.createElement('a');
          imageLink.href = cardLink;
          imageLink.setAttribute('aria-label', 'Read article');
          while (div.firstChild) imageLink.append(div.firstChild);
          div.append(imageLink);
        }
      } else {
        div.className = 'story-body';
      }
    });
    ul.append(li);
  });

  ul.querySelectorAll('picture > img').forEach((img) => {
    img.closest('picture').replaceWith(
      createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]),
    );
  });

  block.textContent = '';
  block.append(ul);
}
