# Throttle individual network requests

| Breadcrumb |
| :--- |
| <!-- empty row for block detection --> |

| TOC |
| --- |

| Blog Header |
| :--- |
| **Tags:** Chrome, DevTools, Network |
| **Author:** Ewa Gasperowicz, Philip Pfaffe |
| **Date:** Dec 12, 2025 |

Previously, Chrome DevTools allowed you to [throttle network conditions](/docs/devtools/network/reference#throttling) globally for the entire session (affecting all requests) or [block specific requests](/docs/devtools/network-request-blocking#block_a_network_request) entirely. However, testing how your application handles specific slow resources, such as a third-party API struggling with latency or a large hero image loading on a slow connection, was difficult without slowing down the entire page.

## Overview

DevTools now supports **Individual Request Throttling**. You can pick individual network requests to apply specific network conditions to, alongside the existing capability to block them. This feature moves the capabilities formerly found in the "Network request blocking" drawer into a new, more comprehensive **Request conditions** drawer. This feature is more precise and allows debugging faster, by slowing down only requested resources and not the whole site.

### Throttle or block a request

To block or throttle a specific resource, right-click any request in the **Network** panel and select **Block request** or **Throttle request** for either the exact URL or the entire domain. This action automatically opens the **Request conditions** drawer, creates a new rule for the entry, and immediately applies the selected network constraints.

> **Note:** When requests are being modified, a warning icon appears on the Network panel tab. Hovering over this icon reminds you that "Request was throttled."

## Request conditions drawer

In the new **Request conditions** drawer, you can control which requests are affected and how much to slow them down.

![Request Conditions Drawer](/assets/blog/request-conditions-drawer.png)
_Request conditions drawer in DevTools._

You can customize throttling settings by selecting standard presets (like Slow 3G) or your own custom profiles, and edit URL patterns using wildcards (`*`) to apply these conditions to specific dynamic resources or groups of requests.

## Understand which requests are throttled or blocked

It's essential to distinguish between requests that are naturally slow and those that are being artificially throttled by DevTools. When you reload the page the new throttling rules get applied. You can easily spot the affected requests in the Network panel:

*   Blocked requests show in red and the status is `(blocked:devtools)` in the Status column.
*   Throttled requests show in yellow or gold and have a clock icon in the Time column.

```css
/* Example of status styling */
.status-column {
  color: gold;
  content: 'Throttled';
}
```

## Related content

| Related Stories |
| :--- |
| ![Related 1](/assets/blog/security-hero.png) | **Dec 10 * Chrome**<br>[New Security Features](/blog/security) |
| ![Related 2](/assets/blog/autofill.png) | **Dec 08 * DevTools**<br>[Autofill Updates](/blog/autofill) |

| Blog Metadata |
| :--- |
| Template | blog-post |
| Title | Throttle individual network requests |
| Description | Use the Request conditions tab to block specific URLs or apply custom network throttling profiles to individual resources. |
