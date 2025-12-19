# Block Syntax Quick Reference

Copy-paste these templates for quick block creation.

---

## Featured Blog Block

**Block Name:** `featured-blog`

**Syntax:**
```markdown
---

## Featured Blog

| ![Alt Text](image-url.png) | ## Blog Title<br><br>Blog description text goes here. You can have multiple sentences.<br><br>*Date • Read Time* |

---
```

**Example:**
```markdown
## Featured Blog

| ![Universal Editor](/assets/hero.png) | ## Universal Editor for Adaptive Forms<br><br>Discover how Universal Editor can reduce form maintenance by 90%.<br><br>*November 11, 2025 • 15 min read* |
```

**Notes:**
- Use `<br><br>` for paragraph breaks in table cells
- Italic date/time using `*text*`
- Image will have gradient overlay automatically

---

## Blog Cards Block

**Block Name:** `blog-cards`

**Syntax:**
```markdown
---

## Section Title

| ![Image](url) | ## Title | Description text | Date • Author |
| ![Image](url) | ## Title | Description text | Date • Author |
| ![Image](url) | ## Title | Description text | Date • Author |

---
```

**Example:**
```markdown
## Latest Blogs

| ![Universal Editor](/assets/thumb1.png) | ## Universal Editor for Forms | Discover how Universal Editor can reduce maintenance by 90%. | Nov 11, 2025 • Anurag Sharma |
| ![Content Fragments](/assets/thumb2.png) | ## Building Scalable Content | Learn how to create reusable content components. | Oct 28, 2025 • Sarah Chen |
| ![Headless Forms](/assets/thumb3.png) | ## Going Headless with Forms | Explore how headless forms enable omnichannel experiences. | Oct 15, 2025 • Michael Torres |
```

**Notes:**
- Each row = one card
- Images automatically get gradient overlay
- Creates 4-column grid on desktop, 2 on tablet, 1 on mobile

---

## Blog Metadata Block

**Block Name:** `blog-metadata`

**Syntax:**
```markdown
---

## Metadata

| Date     | November 11, 2025              |
| ReadTime | 15 min read                    |
| Author   | Author Name                    |
| Role     | Job Title                      |
| Avatar   | ![Author](avatar-url.png)      |

---
```

**Example:**
```markdown
## Metadata

| Date     | November 11, 2025                       |
| ReadTime | 15 min read                             |
| Author   | Anurag Sharma                           |
| Role     | Senior Manager, Product Management      |
| Avatar   | ![Anurag Sharma](/assets/authors/anurag.png) |
```

**Notes:**
- Must use exact field names: `Date`, `ReadTime`, `Author`, `Role`, `Avatar`
- Avatar is optional but recommended
- Displays author info with share button

---

## Hero Image Block

**Block Name:** `hero-image`

**Syntax:**
```markdown
---

## Hero

| ![Alt Text](image-url.png) |

---
```

**Example:**
```markdown
## Hero

| ![Universal Editor Interface](/assets/blog/universal-editor-hero.png) |
```

**Notes:**
- Single image only
- Gets gradient overlay automatically
- 16:9 aspect ratio enforced
- Full-width on all devices

---

## Related Stories Block

**Block Name:** `related-stories`

**Syntax:**
```markdown
---

## Related Stories

| ![Image](url) | ## Title | Description | Date • Author |
| ![Image](url) | ## Title | Description | Date • Author |
| ![Image](url) | ## Title | Description | Date • Author |

---
```

**Example:**
```markdown
## Related Stories

| ![Content Fragments](/assets/story1.png) | ## Building Scalable Content | Learn how to create reusable components. | Oct 28, 2025 • Sarah Chen |
| ![Headless Forms](/assets/story2.png) | ## Going Headless with Forms | Explore headless form architectures. | Oct 15, 2025 • Michael Torres |
| ![Analytics](/assets/story3.png) | ## Mastering Form Analytics | Deep dive into form analytics. | Sep 30, 2025 • Lisa Wong |
```

**Notes:**
- Same structure as Blog Cards
- Typically shows 4 related articles
- Automatically styled with gradient overlays

---

## Complete Page Templates

### Landing Page Template

```markdown
# Page Title

---

## Featured Blog

| ![Featured Image](featured.png) | ## Featured Article Title<br><br>Featured article description with multiple sentences.<br><br>*Date • Read Time* |

---

## Latest Blogs

| ![Image](img1.png) | ## Article Title 1 | Description 1 | Date • Author |
| ![Image](img2.png) | ## Article Title 2 | Description 2 | Date • Author |
| ![Image](img3.png) | ## Article Title 3 | Description 3 | Date • Author |
| ![Image](img4.png) | ## Article Title 4 | Description 4 | Date • Author |
| ![Image](img5.png) | ## Article Title 5 | Description 5 | Date • Author |
| ![Image](img6.png) | ## Article Title 6 | Description 6 | Date • Author |
| ![Image](img7.png) | ## Article Title 7 | Description 7 | Date • Author |
| ![Image](img8.png) | ## Article Title 8 | Description 8 | Date • Author |
```

---

### Detail Page Template

```markdown
# Article Title

---

## Metadata

| Date     | Date                          |
| ReadTime | X min read                    |
| Author   | Author Name                   |
| Role     | Job Title                     |
| Avatar   | ![Author](avatar.png)         |

---

## Hero

| ![Hero Image](hero.png) |

---

Article introduction paragraph...

## Section Heading

Article content goes here...

## Another Section

More article content...

---

## Related Stories

| ![Image](story1.png) | ## Related Article 1 | Description 1 | Date • Author |
| ![Image](story2.png) | ## Related Article 2 | Description 2 | Date • Author |
| ![Image](story3.png) | ## Related Article 3 | Description 3 | Date • Author |
| ![Image](story4.png) | ## Related Article 4 | Description 4 | Date • Author |
```

---

## Common Patterns

### Title Truncation
For card titles that are too long:
```markdown
## Universal Editor for Adaptive Forms and Form Fragm...
```

### Date Formats
```markdown
Nov 11, 2025
November 11, 2025
Sept 18 2027
```

### Author Attribution
```markdown
Date • Author Name
Nov 11, 2025 • Anurag Sharma
```

### Multiple Paragraphs in Tables
```markdown
| Column 1 | First paragraph.<br><br>Second paragraph.<br><br>Third paragraph. |
```

### Links in Cards
```markdown
| ![Image](url) | ## [Linked Title](article-url) | Description | Meta |
```

---

## Block Detection Rules

AEM Edge Delivery automatically detects blocks based on:

1. **Section with heading `## BlockName`**
2. **Followed by a table**
3. **Block name must match folder name** (e.g., `## Blog Cards` → `blocks/blog-cards/`)

**Case sensitivity:** Block names are converted to lowercase with hyphens
- "Blog Cards" → `blog-cards`
- "Featured Blog" → `featured-blog`
- "Related Stories" → `related-stories`

---

## Troubleshooting

### Block Not Rendering

**Problem:** Block shows as plain text/table
**Solution:**
- Check block name spelling (must match exactly)
- Ensure table is immediately after heading
- Verify block folder exists in `blocks/` directory

### Images Not Showing

**Problem:** Images don't load
**Solution:**
- Use absolute URLs: `https://...` or `/assets/...`
- Check image file exists
- Verify image format (JPG, PNG, WEBP)

### Metadata Not Parsing

**Problem:** Author info not displaying correctly
**Solution:**
- Use exact field names: `Date`, `ReadTime`, `Author`, `Role`, `Avatar`
- Check table formatting (pipes `|`)
- Ensure Avatar uses image markdown: `![Alt](url)`

### Gradient Not Showing

**Problem:** Card images don't have gradient overlay
**Solution:**
- Gradient is automatic (CSS `::before` pseudo-element)
- Check browser DevTools for CSS conflicts
- Verify block CSS file is loading

---

## Best Practices

1. **Image Optimization:**
   - Use 1200px width for hero/featured images
   - Use 750px width for card thumbnails
   - Maintain 16:9 aspect ratio
   - Compress images (WebP preferred)

2. **Content Length:**
   - Card titles: 50-60 characters
   - Card descriptions: 120-150 characters
   - Featured blog excerpt: 200-250 characters

3. **Consistency:**
   - Use same date format across all cards
   - Keep author names consistent
   - Maintain similar description lengths

4. **Accessibility:**
   - Always include image alt text
   - Use descriptive link text
   - Ensure heading hierarchy (H1 → H2 → H3)

---

## Testing Your Blocks

```bash
# Start local development
aem up

# Visit in browser
open http://localhost:3000

# Check specific page
open http://localhost:3000/your-page-name
```

**Preview URLs:**
- Local: `http://localhost:3000`
- Dev: `https://main--aem-forms-blogs--singhkh.aem.page`
- Live: `https://main--aem-forms-blogs--singhkh.aem.live`

