# AEM Forms Blog

A modern blog platform built with AEM Edge Delivery Services, featuring a beautiful gradient design system and responsive layout.

## Environments
- Preview: https://main--aem-forms-blogs--singhkh.aem.page
- Live: https://main--aem-forms-blogs--singhkh.aem.live

## Features

- 🎨 Modern gradient design system (purple → pink → red)
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Optimized performance with AEM Edge Delivery
- 🎯 Custom blocks for blog content
- ✨ Smooth hover effects and transitions
- 📝 Easy content authoring

## Available Blocks

### Blog Blocks
- **blog-cards** - Grid of blog post cards (4-column responsive)
- **featured-blog** - Featured blog hero section with image and text
- **blog-metadata** - Article metadata (author, date, read time, share)
- **hero-image** - Article hero image with gradient overlay
- **related-stories** - Related blog posts section

### Core Blocks
- **header** - Site header with navigation
- **footer** - Site footer with language selector
- **hero** - Hero section
- **cards** - Generic card grid
- **columns** - Multi-column layout

## Documentation

### 📚 Implementation Guides
- 📘 [Figma Implementation Guide](./FIGMA-IMPLEMENTATION.md) - Complete technical implementation details
- ✅ [Pixel-Perfect Validation](./PIXEL-PERFECT-VALIDATION.md) - Design accuracy validation methodology
- 📊 [Implementation Summary](./IMPLEMENTATION-SUMMARY.md) - Project overview and statistics

### ✍️ Author Guides
- 📝 [Authoring Guide](./AUTHORING-GUIDE.md) - Quick-start templates for content authors
- 📋 [Block Syntax Reference](./BLOCK-SYNTAX-REFERENCE.md) - Copy-paste block templates

### 📄 Sample Documents
- 🏠 [Sample Landing Page](./sample-landing-page.md) - Example landing page with Featured Blog + Blog Cards
- 📰 [Sample Detail Page](./sample-detail-page.md) - Example article page with full content

### 🎨 Design Resources
- [Figma Design](https://www.figma.com/design/b6Z39lwLFKImgqfi2PFZKl/Blog?node-id=24-6868&p=f&t=fmE0pAQtoK3YOk41-0) - Original design source

### AEM Edge Delivery Resources
1. [Developer Tutorial](https://www.aem.live/developer/tutorial)
2. [The Anatomy of a Project](https://www.aem.live/developer/anatomy-of-a-project)
3. [Web Performance](https://www.aem.live/developer/keeping-it-100)
4. [Markup, Sections, Blocks, and Auto Blocking](https://www.aem.live/developer/markup-sections-blocks)

## Installation

```sh
npm i
```

## Linting

```sh
npm run lint
```

## Local development

1. Create a new repository based on the `aem-boilerplate` template
1. Add the [AEM Code Sync GitHub App](https://github.com/apps/aem-code-sync) to the repository
1. Install the [AEM CLI](https://github.com/adobe/helix-cli): `npm install -g @adobe/aem-cli`
1. Start AEM Proxy: `aem up` (opens your browser at `http://localhost:3000`)
1. Open the `{repo}` directory in your favorite IDE and start coding :)
