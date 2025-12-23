import {
  buildBlock,
  loadHeader,
  loadFooter,
  decorateButtons,
  decorateIcons,
  decorateSections,
  decorateBlocks,
  decorateBlock,
  loadBlock,
  decorateTemplateAndTheme,
  waitForFirstImage,
  loadSection,
  loadSections,
  loadCSS,
  getMetadata,
} from './aem.js';

/**
 * Builds hero block and prepends to main in a new section.
 * @param {Element} main The container element
 */
function buildHeroBlock(main) {
  const h1 = main.querySelector('h1');
  const picture = main.querySelector('picture');
  // eslint-disable-next-line no-bitwise
  if (h1 && picture && (h1.compareDocumentPosition(picture) & Node.DOCUMENT_POSITION_PRECEDING)) {
    const section = document.createElement('div');
    section.append(buildBlock('hero', { elems: [picture, h1] }));
    main.prepend(section);
  }
}

/**
 * load fonts.css and set a session storage flag
 */
async function loadFonts() {
  await loadCSS(`${window.hlx.codeBasePath}/styles/fonts.css`);
  try {
    if (!window.location.hostname.includes('localhost')) sessionStorage.setItem('fonts-loaded', 'true');
  } catch (e) {
    // do nothing
  }
}

/**
 * Builds a two-column layout for pages with TOC.
 * @param {Element} main The container element
 */
function buildBlogLayout(main) {
  const toc = main.querySelector('.toc');
  if (toc) {
    // Find the section (now guaranteed to exist)
    const section = toc.closest('.section');
    if (section) {
      // 0. Extract Header (Global Search in Section)
      const headerBlock = section.querySelector('.blog-header');

      // Elements to identify (Global Search)
      const tocBlock = toc.closest('.toc-wrapper') || toc;
      const relatedPosts = section.querySelector('.related-posts-wrapper') || section.querySelector('.related-posts');

      // Create Grid Containers
      const layoutContainer = document.createElement('div');
      layoutContainer.classList.add('blog-layout-container');

      const sidebar = document.createElement('div');
      sidebar.classList.add('sidebar-col');

      const content = document.createElement('div');
      content.classList.add('content-col');

      // Layout Assembly
      // 1. Sidebar Content
      if (tocBlock) sidebar.append(tocBlock);
      if (relatedPosts) sidebar.append(relatedPosts);

      // 2. Main Content Consolidation
      // Header goes FIRST in content column
      if (headerBlock) {
        content.append(headerBlock);
      }

      // Find ALL content wrappers in the section to ensure we catch split content
      const contentWrappers = [...section.querySelectorAll('.default-content-wrapper')];

      contentWrappers.forEach((wrapper) => {
        while (wrapper.firstChild) {
          content.append(wrapper.firstChild);
        }
        wrapper.remove(); // Clean up empty wrapper
      });

      // Append Grid Columns
      layoutContainer.append(content);
      layoutContainer.append(sidebar);

      // Append Grid to Section
      section.append(layoutContainer);
    }
  }
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
function buildAutoBlocks(main) {
  try {
    // auto block `*/fragments/*` references
    const fragments = main.querySelectorAll('a[href*="/fragments/"]');
    if (fragments.length > 0) {
      // eslint-disable-next-line import/no-cycle
      import('../blocks/fragment/fragment.js').then(({ loadFragment }) => {
        fragments.forEach(async (fragment) => {
          try {
            const { pathname } = new URL(fragment.href);
            const frag = await loadFragment(pathname);
            fragment.parentElement.replaceWith(frag.firstElementChild);
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Fragment loading failed', error);
          }
        });
      });
    }

    buildHeroBlock(main);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auto Blocking failed', error);
  }
}

/**
 * Builds author profile block if on author page.
 * @param {Element} main The container element
 */
function buildAuthorProfile(main) {
  if (window.location.pathname.startsWith('/authors/')) {
    // Only build on the primary main element (avoid fragments)
    if (main !== document.querySelector('main')) {
      return;
    }

    // Check if explicit block exists anywhere in main to prevent duplication
    if (main.querySelector('.author-profile')) {
      return;
    }

    const section = main.querySelector('.section');
    if (section) {
      // Find author name source
      let nameSrc = section.querySelector('h1');
      if (!nameSrc) {
        // Fallback for p > code pattern
        const code = section.querySelector('p > code');
        if (code) nameSrc = code.closest('p');
      }

      const authorName = nameSrc ? nameSrc.textContent.trim() : document.title;

      if (nameSrc && nameSrc.tagName === 'H1') nameSrc.remove(); // Remove raw H1 if that was the source

      const block = buildBlock('author-profile', [[authorName]]);
      block.classList.add('header'); // Default to header variant
      section.prepend(block);
      decorateBlock(block);
      loadBlock(block);

      // Transform original name source (if it was p>code) into Articles Header
      if (nameSrc && nameSrc.tagName !== 'H1') {
        const articlesHeader = document.createElement('h2');
        articlesHeader.className = 'articles-by-header';
        articlesHeader.textContent = `Articles by ${authorName}`;
        articlesHeader.style.color = '#000';
        articlesHeader.style.fontSize = '36px';
        articlesHeader.style.marginTop = '40px';
        articlesHeader.style.marginBottom = '24px';
        nameSrc.replaceWith(articlesHeader);
      }
    }
  }
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
// eslint-disable-next-line import/prefer-default-export
export function decorateMain(main) {
  // hopefully forward compatible button decoration
  decorateButtons(main);
  decorateIcons(main);
  buildAutoBlocks(main);
  decorateSections(main);
  decorateBlocks(main); // blocks are decorated
  buildAuthorProfile(main); // Auto-inject author profile if missing
  buildAuthorProfile(main); // Auto-inject author profile if missing
  buildBlogLayout(main);

  // Accessibility: Ensure Hero/First Image has Alt Text
  const firstImg = main.querySelector('img');
  if (firstImg && !firstImg.alt) {
    firstImg.alt = document.title || 'Hero Image';
  }
}

/**
 * Loads everything needed to get to LCP.
 * @param {Element} doc The container element
 */
async function loadEager(doc) {
  // Analytics: Initialize Data Layer
  window.adobeDataLayer = window.adobeDataLayer || [];
  window.adobeDataLayer.push({
    event: 'page-loaded',
    page: {
      url: window.location.href,
      title: document.title,
      lastModified: document.lastModified,
      template: getMetadata('template'),
    },
  });

  document.documentElement.lang = 'en';
  decorateTemplateAndTheme();
  const main = doc.querySelector('main');
  if (main) {
    decorateMain(main);
    document.body.classList.add('appear');
    await loadSection(main.querySelector('.section'), waitForFirstImage);
  }

  try {
    /* if desktop (proxy for fast connection) or fonts already loaded, load fonts.css */
    if (window.innerWidth >= 900 || sessionStorage.getItem('fonts-loaded')) {
      loadFonts();
    }
  } catch (e) {
    // do nothing
  }
}

/**
 * Loads everything that doesn't need to be delayed.
 * @param {Element} doc The container element
 */
async function loadLazy(doc) {
  const main = doc.querySelector('main');
  await loadSections(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

  loadHeader(doc.querySelector('header'));
  loadFooter(doc.querySelector('footer'));

  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  loadFonts();
}

/**
 * Loads everything that happens a lot later,
 * without impacting the user experience.
 */
function loadDelayed() {
  // eslint-disable-next-line import/no-cycle
  window.setTimeout(() => import('./delayed.js'), 3000);
  // load anything that can be postponed to the latest here
}

async function loadPage() {
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

loadPage();
