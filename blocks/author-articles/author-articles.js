export default async function decorate(block) {
  const ul = document.createElement('ul');

  // Extract links from the block
  const links = [...block.querySelectorAll('a')];

  const processLink = async (link) => {
    try {
      const resp = await fetch(link.href);
      if (!resp.ok) throw new Error(`${resp.status}`);
      const html = await resp.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      // Extract Metadata
      const title = doc.querySelector('h1')?.textContent.trim()
        || doc.querySelector('title')?.innerText
        || link.textContent.trim();

      // Robust Date Selector
      let dateStr = '';

      // 1. Try meta tags
      const dateMeta = doc.querySelector('meta[name="publication-date"]')
        || doc.querySelector('meta[property="article:published_time"]')
        || doc.querySelector('meta[name="date"]');

      if (dateMeta) {
        const d = new Date(dateMeta.content);
        if (!Number.isNaN(d.getTime())) {
          dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        }
      }

      // 2. Fallback: Try .blog-metadata block
      if (!dateStr) {
        const metadataBlock = doc.querySelector('.blog-metadata');
        if (metadataBlock) {
          [...metadataBlock.children].some((row) => {
            const label = row.children[0]?.textContent.trim();
            const value = row.children[1]?.textContent.trim();
            if (label === 'Date' && value) {
              const d = new Date(value);
              if (!Number.isNaN(d.getTime())) {
                dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
              } else {
                dateStr = value; // Use raw string if parsing fails
              }
              return true;
            }
            return false;
          });
        }
      }

      // 3. Fallback: Try finding a date structure in the first few paragraphs
      if (!dateStr) {
        const bodyText = doc.body.innerText.substring(0, 500); // Check only top content
        const match = bodyText.match(/([A-Z][a-z]+ \d{1,2}, \d{4})/); // "Jan 15, 2025"
        if (match) {
          [, dateStr] = match;
        }
      }

      // Robust Image Selector
      let image = doc.querySelector('meta[property="og:image"]')?.content
        || doc.querySelector('meta[name="twitter:image"]')?.content
        || doc.querySelector('main img')?.getAttribute('src');

      // Fix relative paths and localhost https issue
      if (image) {
        if (image.startsWith('/')) {
          image = new URL(image, link.href).href;
        }
        try {
          const url = new URL(image);
          if (url.hostname === 'localhost' && url.protocol === 'https:') {
            url.protocol = 'http:';
            image = url.href;
          }
        } catch (e) { /* ignore */ }
      }

      // Build Card LI
      const li = document.createElement('li');
      li.innerHTML = `
        <div class="author-articles-card-image">
            <a href="${link.href}" aria-label="${title}">
                ${image ? `<picture><img src="${image}" alt="${title}" loading="lazy"></picture>` : ''}
            </a>
        </div>
        <div class="author-articles-card-body">
          <h3><a href="${link.href}">${title}</a></h3>
          ${dateStr ? `<span class="author-articles-card-date">${dateStr}</span>` : ''}
          
          <a href="${link.href}" class="read-more" aria-label="Read more about ${title}">Read More</a>
          
          <div class="author-articles-card-footer">
            <!-- Footer links removed as per request -->
          </div>
        </div>
      `;
      return li;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('Failed to fetch article', link.href, e);
      // Fallback for failed fetch
      const li = document.createElement('li');
      li.innerHTML = `<div class="author-articles-card-body"><h3><a href="${link.href}">${link.textContent}</a></h3></div>`;
      return li;
    }
  };

  // Process all links
  const promises = links.map(processLink);
  const items = await Promise.all(promises);

  items.forEach((li) => ul.append(li));

  block.textContent = '';
  block.append(ul);
}
