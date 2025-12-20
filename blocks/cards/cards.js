import { createOptimizedPicture } from '../../scripts/aem.js';

export default async function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');

  // Process rows asynchronously
  const rows = [...block.children];
  const promises = [];

  const processRow = (row) => {
    // Check for Auto Mode (Single column, just a link)
    // Criteria: 1 div, contains 'a'
    const isAuto =
      row.children.length === 1 &&
      row.querySelector('a');

    if (isAuto) {
      const link = row.querySelector('a');
      return fetch(link.href)
        .then((resp) => {
          if (resp.ok) return resp.text();
          throw new Error(`${resp.status} ${resp.statusText}`);
        })
        .then((html) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');

          // Extract Content
          const title =
            doc.querySelector('h1')?.textContent.trim() ||
            doc.querySelector('title')?.innerText ||
            link.textContent.trim();

          const description =
            doc.querySelector('meta[name="description"]')?.content ||
            doc.querySelector('p')?.textContent.trim() ||
            '';

          const image =
            doc.querySelector('meta[property="og:image"]')?.content ||
            doc.querySelector('meta[name="twitter:image"]')?.content ||
            doc.querySelector('img')?.src;

          const date = doc.querySelector('meta[name="publish-date"]')?.content || '';
          const author = doc.querySelector('meta[name="author"]')?.content || '';

          // Build Card
          const li = document.createElement('li');
          li.innerHTML = `
              <div class="cards-card-image">
                <a href="${link.href}" aria-label="${title}">
                  <picture><img src="${image}" alt="${title}" loading="lazy"></picture>
                </a>
              </div>
              <div class="cards-card-body">
                <h3><a href="${link.href}">${title}</a></h3>
                <p class="cards-card-Description">${description}</p>
                <div class="cards-card-meta">
                    ${author ? `<span>${author}</span>` : ''}
                    ${date ? `<span>${date}</span>` : ''}
                </div>
                <a href="${link.href}" class="button read-more">Read More</a>
              </div>
            `;
          return li;
        })
        .catch((err) => {
          // Fallback for failed fetch (render as simple link)
          const li = document.createElement('li');
          li.innerHTML = `
                <div class="cards-card-body">
                    <h3><a href="${link.href}">${link.textContent}</a></h3>
                    <p>Failed to load content.</p>
                </div>
            `;
          return li;
        });
    } else {
      // Manual Mode
      // User provides Image (col 1) and Body (col 2)
      const li = document.createElement('li');

      // Ensure we have 2 columns. If not, just clone logic.
      const cols = [...row.children];
      const imageDiv = cols[0];
      const bodyDiv = cols[1] || document.createElement('div');

      imageDiv.className = 'cards-card-image';
      bodyDiv.className = 'cards-card-body';

      // 1. Identify Title
      // Look for H1-H6, or p > strong > a, or p > strong
      let titleEl = bodyDiv.querySelector('h1, h2, h3, h4, h5, h6');
      let titleText = '';
      let titleHref = '';

      if (!titleEl) {
        // Fallback search
        const strongLink = bodyDiv.querySelector('p > strong > a') || bodyDiv.querySelector('p > strong');
        if (strongLink) {
          titleEl = strongLink.closest('p');
          titleText = strongLink.textContent;
          titleHref = strongLink.href || strongLink.querySelector('a')?.href || '';
        } else {
          // Last resort: the first paragraph as title if it contains a link?
          const firstLink = bodyDiv.querySelector('a');
          if (firstLink && !firstLink.classList.contains('read-more')) {
            titleEl = firstLink.closest('p') || firstLink.parentElement;
            titleText = firstLink.textContent;
            titleHref = firstLink.href;
          }
        }
      } else {
        titleText = titleEl.textContent;
        titleHref = titleEl.querySelector('a')?.href || '';
      }

      // If we found a title element, extract it and remove from flow
      if (titleEl) {
        titleEl.remove();
      }

      // Create standardized H3
      const h3 = document.createElement('h3');
      if (titleHref) {
        const a = document.createElement('a');
        a.href = titleHref;
        a.textContent = titleText || 'Untitled';
        h3.appendChild(a);
      } else {
        h3.textContent = titleText || 'Untitled';
      }

      // 2. Identify "Read More" link
      let readMore = bodyDiv.querySelector('.read-more') || Array.from(bodyDiv.querySelectorAll('a')).find(a => a.textContent.toLowerCase().includes('read more'));

      if (readMore) {
        readMore.remove();
        readMore.className = 'button read-more';
        if (!readMore.getAttribute('href') && titleHref) readMore.href = titleHref;
      } else if (titleHref) {
        // Create one if valid link exists
        readMore = document.createElement('a');
        readMore.href = titleHref;
        readMore.textContent = 'Read More';
        readMore.className = 'button read-more';
      }

      // 3. Assemble Body
      bodyDiv.prepend(h3);
      if (readMore) bodyDiv.appendChild(readMore);

      li.appendChild(imageDiv);
      li.appendChild(bodyDiv);

      // Image Link Logic (for manual)
      if (titleHref && imageDiv.querySelector('picture')) {
        const imgLink = document.createElement('a');
        imgLink.href = titleHref;
        imgLink.setAttribute('aria-label', titleText);
        while (imageDiv.firstChild) imgLink.appendChild(imageDiv.firstChild);
        imageDiv.appendChild(imgLink);
      }

      return Promise.resolve(li);
    }
  };

  rows.forEach(row => {
    promises.push(processRow(row));
  });

  const lis = await Promise.all(promises);
  lis.forEach((li) => {
    if (li) ul.append(li);
  });

  ul.querySelectorAll('img').forEach((img) => {
    if (img.src.startsWith('/') || img.src.includes(window.location.hostname)) {
      img.closest('picture')?.replaceWith(
        createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]),
      ) || img.replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]));
    }
  });

  block.textContent = '';
  block.append(ul);
}
