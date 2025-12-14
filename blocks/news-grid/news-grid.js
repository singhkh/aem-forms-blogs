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
      // Hero: large, Standard: thumbnail
      const optimizeOptions = isHero
        ? [{ width: '1200' }]
        : [{ width: '300' }]; // Thumbnail size

      const img = pic.querySelector('img');
      const newPic = createOptimizedPicture(img.src, img.alt, isHero, optimizeOptions);
      imgWrapper.append(newPic);
    } else {
      // Remove empty wrapper if no image?
      // Reference design always has images. Keep empty or placeholder if needed.
      // For strict parity, we assume images exist.
    }

    // Common: Wrap content
    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'news-grid-content';

    // Move all text content
    while (textCol.firstChild) {
      contentWrapper.append(textCol.firstChild);
    }

    // Apply specific classes for styling hooks if needed
    // Identify links to make the whole card clickable (optional, but good UX)

    // DOM Assembly
    if (isHero) {
      li.className = 'news-hero';
      li.append(imgWrapper);
      li.append(contentWrapper);

      // Attempt to identify Category (First P usually)
      const firstP = contentWrapper.querySelector('p');
      if (firstP) firstP.classList.add('category');

      // Identify Description (Last P usually)
      // Hero often has: Category(p) -> Title(h1/h2) -> Description(p)
    } else {
      li.className = 'news-item';
      // Standard: Text Left, Image Right
      li.append(contentWrapper);
      li.append(imgWrapper);

      // Metadata formatting
      const firstP = contentWrapper.querySelector('p');
      if (firstP) firstP.classList.add('metadata');
    }

    ul.append(li);
  });

  block.textContent = '';
  block.append(ul);
}
