import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const ul = document.createElement('ul');

  [...block.children].forEach((row, index) => {
    const li = document.createElement('li');
    const isHero = index === 0;

    // Column 1: Image
    const imgCol = row.children[0];
    const pic = imgCol.querySelector('picture');

    // Column 2: Text Content
    const textCol = row.children[1];

    // Common: Wrap image
    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'news-grid-image';

    if (pic) {
      // Optimize image
      // Hero: large, Standard: medium
      const optimizeOptions = isHero
        ? [{ width: '1200' }]
        : [{ width: '600' }];

      const img = pic.querySelector('img');
      const newPic = createOptimizedPicture(img.src, img.alt, isHero, optimizeOptions);
      imgWrapper.append(newPic);
    }

    // Common: Wrap content
    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'news-grid-content';

    // Move all text content
    while (textCol.firstChild) {
      const child = textCol.firstChild;

      // Identify Tags (UL)
      if (child.tagName === 'UL') {
        child.classList.add('news-grid-tags');
      }

      // Strip default button classes if present (Fixes blue background on links)
      if (child.nodeType === Node.ELEMENT_NODE && child.classList.contains('button-container')) {
        child.classList.remove('button-container');
        const a = child.querySelector('a');
        if (a) {
          a.classList.remove('button', 'primary', 'secondary');
        }
      }

      contentWrapper.append(child);
    }

    // Identify primary link for Clickable Card
    const mainLink = contentWrapper.querySelector('a');
    if (mainLink) {
      mainLink.classList.add('news-grid-link');
      li.classList.add('news-grid-clickable');
    }

    // Apply specific classes for styling hooks
    const paragraphs = contentWrapper.querySelectorAll('p');
    if (paragraphs.length > 0) {
      paragraphs[0].classList.add('news-grid-eyebrow'); // Category/Date
    }

    // DOM Assembly - Stacked Layout for ALL cards (Hero and Standard)
    if (isHero) {
      li.className = 'news-hero';
    } else {
      li.className = 'news-item';
    }

    // Stacked: Image Top, Content Bottom
    li.append(imgWrapper);
    li.append(contentWrapper);

    ul.append(li);
  });

  block.textContent = '';
  block.append(ul);
}
