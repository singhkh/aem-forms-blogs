import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Decorates the featured-article block.
 * @param {Element} block The featured-article block element
 */
export default async function decorate(block) {
    const children = [...block.children];
    let content = {};

    // Check for manual authoring (Standard: Image, Content)
    // If multiple rows or columns with content, treat as manual.
    // If single cell with just a link, treat as auto-fetch.
    const isManual = children.length > 1 || (children[0] && children[0].children.length > 1);

    if (isManual) {
        // Manual Mode
        const row = children[0];
        if (row.children.length >= 2) {
            const imgCol = row.children[0];
            const textCol = row.children[1];

            // Extract Image
            const imgC = imgCol.querySelector('img');
            content.image = imgC ? imgC.src : null;

            // Extract Title
            const titleEl = textCol.querySelector('h1, h2, h3, h4, h5, h6, strong');
            content.title = titleEl?.textContent.trim();

            // Extract Link/CTA
            const link = textCol.querySelector('a.button') || textCol.querySelector('a');
            content.path = link?.href;
            content.ctaText = link?.textContent;

            // Extract Description
            const clone = textCol.cloneNode(true);

            if (titleEl) {
                const cloneTitle = clone.querySelector(titleEl.nodeName);
                if (cloneTitle && cloneTitle.textContent.trim() === content.title) {
                    cloneTitle.remove();
                }
            }

            if (link) {
                const cloneLink = clone.querySelector('a');
                if (cloneLink && cloneLink.href === content.path) {
                    cloneLink.remove();
                }
            }

            clone.querySelectorAll('br').forEach(br => br.remove());
            content.desc = clone.textContent.trim();
        }
    } else {
        // Auto Mode (Fetch Metadata)
        const link = block.querySelector('a');
        content.path = link ? link.getAttribute('href') : block.textContent.trim();

        if (!content.path) return;

        // DEBUG LOGGING
        console.log('[FeaturedArticle] Processing Auto Mode for:', content.path);

        try {
            const resp = await fetch(content.path);
            console.log('[FeaturedArticle] Fetch Status:', resp.status);

            if (resp.ok) {
                const html = await resp.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');

                content.title = doc.querySelector('h1')?.textContent.trim();
                content.desc = doc.querySelector('meta[name="description"]')?.content;

                console.log('[FeaturedArticle] Title found:', content.title);
                console.log('[FeaturedArticle] Desc found:', content.desc);

                content.image = doc.querySelector('meta[property="og:image"]')?.content
                    || doc.querySelector('meta[name="twitter:image"]')?.content;
                content.author = doc.querySelector('meta[name="author"]')?.content;
                content.date = doc.querySelector('meta[name="publication-date"]')?.content;
                content.ctaText = 'Read the Full Story';
            } else {
                console.error(`Failed to fetch featured article: ${content.path}`);
            }
        } catch (e) {
            console.error('Error fetching featured article:', e);
        }
    }

    // Clear block
    block.textContent = '';

    if (!content.title && !content.image) {
        return;
    }

    // --- Build DOM ---
    const container = document.createElement('div');
    container.className = 'featured-article-container';

    // 1. Image Column (Left)
    const imageCol = document.createElement('div');
    imageCol.className = 'featured-image';
    if (content.image) {
        const isExternal = content.image.startsWith('http') && !content.image.includes(window.location.hostname);

        if (isExternal) {
            const img = document.createElement('img');
            img.src = content.image;
            img.alt = content.title || '';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            imageCol.append(img);
        } else {
            const picture = createOptimizedPicture(content.image, content.title, true, [{ width: '750' }]);
            imageCol.append(picture);
        }
    }

    // 2. Content Column (Right)
    const contentCol = document.createElement('div');
    contentCol.className = 'featured-content';

    if (content.title) {
        const h2 = document.createElement('h2');
        h2.textContent = content.title;
        contentCol.append(h2);
    }

    if (content.author || content.date) {
        const metaRow = document.createElement('p');
        metaRow.className = 'featured-meta';
        const parts = [];
        if (content.author) parts.push(content.author);
        if (content.date) parts.push(content.date);
        metaRow.textContent = parts.join(' | ');
        contentCol.append(metaRow);
    }

    if (content.desc) {
        const p = document.createElement('p');
        p.className = 'featured-desc';
        p.textContent = content.desc;
        contentCol.append(p);
    }

    if (content.path) {
        const btnContainer = document.createElement('div');
        btnContainer.className = 'featured-action';
        const readMore = document.createElement('a');
        readMore.href = content.path;
        readMore.textContent = content.ctaText || 'Read the Full Story';
        readMore.className = 'button primary';
        readMore.style.backgroundColor = 'transparent';
        readMore.style.color = 'var(--adobe-red)';

        btnContainer.append(readMore);
        contentCol.append(btnContainer);
    }

    container.append(imageCol, contentCol);
    block.append(container);
}
