import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');

    // Column 1: Image
    const imgCol = row.children[0];
    const imgDiv = document.createElement('div');
    imgDiv.className = 'blog-card-image';

    if (imgCol) {
      const pic = imgCol.querySelector('picture');
      if (pic) {
        const img = pic.querySelector('img');
        const newPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        imgDiv.append(newPic);
      }
    }

    // Column 2: Body
    const bodyCol = row.children[1];
    const bodyDiv = document.createElement('div');
    bodyDiv.className = 'blog-card-body';

    if (bodyCol) {
      // Move all content
      while (bodyCol.firstChild) {
        const child = bodyCol.firstChild;

        // Strip default button classes for cleaner look
        if (child.nodeType === Node.ELEMENT_NODE && child.classList.contains('button-container')) {
          child.classList.remove('button-container');
          const a = child.querySelector('a');
          if (a) a.classList.remove('button', 'primary', 'secondary');
        }

        bodyDiv.append(child);
      }
    }

    // Clickable Card Logic (Stretched Link)
    const mainLink = bodyDiv.querySelector('a');
    if (mainLink) {
      mainLink.classList.add('blog-card-link');
      li.classList.add('blog-card-clickable');
    }

    // Append to LI
    if (imgDiv.hasChildNodes()) li.append(imgDiv);
    li.append(bodyDiv); // Always append body

    ul.append(li);
  });

  block.textContent = '';
  block.append(ul);
}
