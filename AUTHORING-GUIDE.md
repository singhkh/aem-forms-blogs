# Content Authoring Guide

Quick reference for content authors creating blog pages.

---

## Landing Page Template

```markdown
Title of the feature Blog

Block: Featured Blog
| ![Featured Image](https://example.com/image.png) | ## Adobe Stock turn 10: How we are empowering Contributors and Creators<br><br>This year, Adobe Stock celebrated 10 years of connecting creative people through content. This year, Adobe Stock celebrated 10 years of connecting creative people through content. |

---

## Latest Blogs

Block: Blog Cards
| ![Image](https://example.com/img1.png) | ## Indiana University nurture Facult... | Adobe and Indiana University have been close... | Date of published • Name of the Author |
| ![Image](https://example.com/img2.png) | ## Indiana University nurture Facult... | Adobe and Indiana University have been close... | Date of published • Name of the Author |
| ![Image](https://example.com/img3.png) | ## Indiana University nurture Facult... | Adobe and Indiana University have been close... | Date of published • Name of the Author |
| ![Image](https://example.com/img4.png) | ## Indiana University nurture Facult... | Adobe and Indiana University have been close... | Date of published • Name of the Author |
| ![Image](https://example.com/img5.png) | ## Indiana University nurture Facult... | Adobe and Indiana University have been close... | Date of published • Name of the Author |
| ![Image](https://example.com/img6.png) | ## Indiana University nurture Facult... | Adobe and Indiana University have been close... | Date of published • Name of the Author |
| ![Image](https://example.com/img7.png) | ## Indiana University nurture Facult... | Adobe and Indiana University have been close... | Date of published • Name of the Author |
| ![Image](https://example.com/img8.png) | ## Indiana University nurture Facult... | Adobe and Indiana University have been close... | Date of published • Name of the Author |
```

---

## Detail Page Template

```markdown
# Adobe Stock turn 10: How we are empowering Contributors and Creators in a new Era

Block: Blog Metadata
| Date     | Sept 18 2027                        |
| ReadTime | 3 mins read                         |
| Author   | Utkarsha Sharma                     |
| Role     | Experience Designer, India          |
| Avatar   | ![Avatar](https://example.com/avatar.png) |

---

Block: Hero Image
| ![Hero](https://example.com/hero.png) |

---

This year, Adobe Stock celebrated 10 years of connecting creative people through content. This year, Adobe Stock celebrated 10 years of connecting creative people through content. This year, Adobe Stock celebrated 10 years of connecting creative people through content. This year, Adobe Stock celebrated 10 years of connecting creative people through content. This year, Adobe Stock celebrated 10 years of connecting creative people through content. This year, Adobe Stock celebrated 10 years of connecting creative people through content.

## Adobe Stock turn 10: How we are empowering Contributors and Creators in a new Era

This year, Adobe Stock celebrated 10 years of connecting creative people through content. This year, Adobe Stock celebrated 10 years of connecting creative people through content. This year, Adobe Stock celebrated 10 years of connecting creative people through content. This year, Adobe Stock celebrated 10 years of connecting creative people through content. This year, Adobe Stock celebrated 10 years of connecting creative people through content. This year, Adobe Stock celebrated 10 years of connecting creative people through content.

## Adobe Stock turn 10: How we are empowering Contributors and Creators in a new Era

This year, Adobe Stock celebrated 10 years of connecting creative people through content. This year, Adobe Stock celebrated 10 years of connecting creative people through content. This year, Adobe Stock celebrated 10 years of connecting creative people through content. This year, Adobe Stock celebrated 10 years of connecting creative people through content. This year, Adobe Stock celebrated 10 years of connecting creative people through content. This year, Adobe Stock celebrated 10 years of connecting creative people through content.

---

## Related Stories

Block: Related Stories
| ![Story 1](https://example.com/story1.png) | ## Indiana University nurture Facult... | Adobe and Indiana University have been close... | Date of published • Name of the Author |
| ![Story 2](https://example.com/story2.png) | ## Indiana University nurture Facult... | Adobe and Indiana University have been close... | Date of published • Name of the Author |
| ![Story 3](https://example.com/story3.png) | ## Indiana University nurture Facult... | Adobe and Indiana University have been close... | Date of published • Name of the Author |
| ![Story 4](https://example.com/story4.png) | ## Indiana University nurture Facult... | Adobe and Indiana University have been close... | Date of published • Name of the Author |
```

---

## Block Usage

### Blog Cards
**Purpose:** Display a grid of blog posts

**Columns:**
1. **Image** - Blog post thumbnail (16:9 ratio recommended)
2. **Title** - Blog post title (use `##` for H2)
3. **Description** - Short excerpt or description
4. **Meta** - Date and author info (format: `Date • Author`)

---

### Featured Blog
**Purpose:** Highlight a featured blog post with large image

**Columns:**
1. **Image** - Large featured image (16:9 ratio recommended)
2. **Content** - Title (##) and description with line breaks (`<br><br>`)

---

### Blog Metadata
**Purpose:** Show article metadata (author info, date, read time)

**Rows:**
- `Date | Sept 18 2027`
- `ReadTime | 3 mins read`
- `Author | Author Name`
- `Role | Author Title/Role`
- `Avatar | ![Image](url)`

---

### Hero Image
**Purpose:** Display article hero image

**Column:**
- Single column with image: `![Alt Text](image-url)`

---

### Related Stories
**Purpose:** Show related blog posts at article end

**Columns:** Same as Blog Cards
1. Image
2. Title
3. Description
4. Meta

---

## Image Guidelines

### Recommended Sizes
- **Blog Cards:** 750px width, 16:9 aspect ratio
- **Featured Blog:** 1200px width, 16:9 aspect ratio
- **Hero Image:** 1200px width, 16:9 aspect ratio
- **Author Avatar:** 96px x 96px, square

### Image URLs
- Use absolute URLs: `https://example.com/image.png`
- Or relative paths: `/images/blog/image.png`

### Alt Text
- Always include descriptive alt text
- Format: `![Description](url)`

---

## Formatting Tips

### Headings
```markdown
# Page Title (H1)
## Section Title (H2)
### Subsection (H3)
```

### Line Breaks
- Use `<br>` for single line break
- Use `<br><br>` for paragraph spacing in tables

### Links
```markdown
[Link Text](https://example.com)
```

### Bold/Italic
```markdown
**Bold Text**
*Italic Text*
```

---

## Common Patterns

### Truncated Titles
Use ellipsis for long titles in cards:
```
Indiana University nurture Facult...
```

### Date Format
```
Sept 18 2027
```

### Read Time
```
3 mins read
```

### Author Meta
```
Date of published • Name of the Author
```

---

## Preview & Publishing

### Local Preview
1. Start AEM CLI: `aem up`
2. Open browser: `http://localhost:3000`
3. Navigate to your page

### Publishing
1. Preview: https://main--aem-forms-blogs--singhkh.aem.page
2. Live: https://main--aem-forms-blogs--singhkh.aem.live

---

## Troubleshooting

### Images Not Showing
- Check URL is correct and accessible
- Verify image format (JPG, PNG, WEBP)
- Check image size (not too large)

### Block Not Rendering
- Verify block name spelling
- Check table format (pipes `|`)
- Ensure proper markdown syntax

### Layout Issues
- Check responsive breakpoints
- Verify column count matches block requirements
- Test on multiple devices

---

## Support

For technical issues or questions:
- See [FIGMA-IMPLEMENTATION.md](./FIGMA-IMPLEMENTATION.md)
- Check [AEM Documentation](https://www.aem.live/docs/)
- Review [Figma Design](https://www.figma.com/design/b6Z39lwLFKImgqfi2PFZKl/Blog)

