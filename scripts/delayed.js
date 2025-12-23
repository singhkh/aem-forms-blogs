// add delayed functionality here
import { loadScript } from './aem.js';

/**
 * Loads Adobe Analytics (Launch)
 * NOTE: Replace with actual Launch property script URL
 */
async function loadAdobeLaunch() {
  // const launchUrl = 'https://assets.adobedtm.com/launch-EN000000.min.js';
  // await loadScript(launchUrl, { async: true });
  // eslint-disable-next-line no-console
  console.log('Analytics: Adobe Launch loaded (Placeholder)');
}

/**
 * Loads Microsoft Clarity
 * NOTE: Replace 'projectId' with actual Clarity ID
 */
function loadClarity() {
  const clarityId = 'no-project-id'; // Placeholder
  if (clarityId !== 'no-project-id') {
    (function initClarity(c, l, a, r, i) {
      c[a] = c[a] || function clarityQueue(...args) {
        (c[a].q = c[a].q || []).push(args);
      };
      const t = l.createElement(r);
      t.async = 1;
      t.src = `https://www.clarity.ms/tag/${i}`;
      const y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    }(window, document, 'clarity', 'script', clarityId));
  } else {
    // eslint-disable-next-line no-console
    console.log('Analytics: Clarity skipped (No ID provided)');
  }
}

/**
 * Loads Google Analytics (GA4)
 * NOTE: Replace 'G-XXXXXX' with actual Measurement ID
 */
async function loadGA4() {
  const gaId = 'G-PLACEHOLDER';
  if (gaId !== 'G-PLACEHOLDER') {
    await loadScript(`https://www.googletagmanager.com/gtag/js?id=${gaId}`, { async: true });
    window.dataLayer = window.dataLayer || [];
    // eslint-disable-next-line no-inner-declarations
    function gtag(...args) {
      window.dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', gaId);
  } else {
    // eslint-disable-next-line no-console
    console.log('Analytics: GA4 skipped (No ID provided)');
  }
}

/**
 * Tracks Time on Page and pushes to Data Layer
 * Heartbeat every 30 seconds
 */
function trackTimeOnPage() {
  let seconds = 0;
  setInterval(() => {
    seconds += 30;
    window.adobeDataLayer = window.adobeDataLayer || [];
    window.adobeDataLayer.push({
      event: 'time-spent',
      data: {
        seconds,
        category: 'engagement',
      },
    });
    // eslint-disable-next-line no-console
    console.debug(`Analytics: Time on page ${seconds}s`);
  }, 30000);
}

// Load Analytics
loadAdobeLaunch();
loadClarity();
loadGA4();
trackTimeOnPage();
