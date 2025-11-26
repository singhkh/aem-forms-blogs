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

    const imgDiv = document.createElement('div');
    imgDiv.className = 'blog-card-image';

    const bodyDiv = document.createElement('div');
    bodyDiv.className = 'blog-card-body';

    [...row.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        // Move picture to imgDiv
        while (div.firstChild) imgDiv.append(div.firstChild);
      } else if (div.hasChildNodes()) {
        // Move content to bodyDiv
        const contentDiv = document.createElement('div');
        while (div.firstChild) contentDiv.append(div.firstChild);
        bodyDiv.append(contentDiv);
      }
    });

    // Make image clickable
    if (cardLink && imgDiv.querySelector('picture')) {
      const imageLink = document.createElement('a');
      imageLink.href = cardLink;
      imageLink.setAttribute('aria-label', 'Read article');
      // Wrap all children of imgDiv (should be just picture)
      while (imgDiv.firstChild) imageLink.append(imgDiv.firstChild);
      imgDiv.append(imageLink);
    }

    if (imgDiv.hasChildNodes()) li.append(imgDiv);
    if (bodyDiv.hasChildNodes()) li.append(bodyDiv);

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
