export default function decorate(block) {
  const nav = document.createElement('nav');
  nav.setAttribute('aria-label', 'Breadcrumb');

  const ol = document.createElement('ol');
  ol.className = 'breadcrumb-list';

  // 1. Home Link
  const homeLi = document.createElement('li');
  homeLi.className = 'breadcrumb-item';
  const homeLink = document.createElement('a');
  homeLink.href = '/';
  homeLink.textContent = 'Home';
  homeLi.append(homeLink);
  ol.append(homeLi);

  // 2. Path Segments
  const path = window.location.pathname;
  // Filter empty and common index files if any
  const segments = path.split('/').filter((s) => s.length > 0 && s !== 'index.html');

  let currentPath = '';

  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === segments.length - 1;

    const li = document.createElement('li');
    li.className = 'breadcrumb-item';

    // Format Title: 'my-page-name' -> 'My Page Name'
    // Exception: Keep short words like 'a', 'of' lowercase? Standard Title Case logic is complex.
    // Simple Capitalize First Letter of each word is standard fallback.
    const title = segment.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

    if (isLast) {
      li.setAttribute('aria-current', 'page');
      li.textContent = title;
    } else {
      const a = document.createElement('a');
      a.href = currentPath;
      a.textContent = title;
      li.append(a);
    }

    ol.append(li);
  });

  nav.append(ol);
  block.textContent = '';
  block.append(nav);
}
