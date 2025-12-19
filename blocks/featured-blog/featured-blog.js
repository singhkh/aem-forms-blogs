import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const content = document.createElement('div');
  content.className = 'featured-content';

  [...block.children].forEach((row) => {
    if (row.querySelector('picture')) {
      const imageDiv = document.createElement('div');
      imageDiv.className = 'featured-image';
      imageDiv.append(row.firstElementChild);
      content.append(imageDiv);
    } else {
      const textDiv = document.createElement('div');
      textDiv.className = 'featured-text';
      while (row.firstElementChild) {
        textDiv.append(row.firstElementChild);
      }
      content.append(textDiv);
    }
  });

  content.querySelectorAll('picture > img').forEach((img) => {
    img.closest('picture').replaceWith(
      createOptimizedPicture(img.src, img.alt, false, [{ width: '1200' }]),
    );
  });

  block.textContent = '';
  block.append(content);
}
