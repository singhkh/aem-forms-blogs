# Block Naming Reference - Critical for Proper Rendering!

## ⚠️ The #1 Rule: Block Names MUST Match Folder Names

AEM Edge Delivery automatically converts heading text to block folder names:

```
## Your Heading Text  →  your-heading-text  →  blocks/your-heading-text/
```

**If they don't match, your block won't render with styling!**

---

## ✅ Correct Block Headings for This Project

Copy these EXACTLY:

### Detail Page Blocks

```markdown
## Blog Metadata
| Date | November 11, 2025 |
| ReadTime | 15 min read |
| Author | Your Name |
| Role | Your Title |
| Avatar | ![Alt](url) |
```
→ Loads: `blocks/blog-metadata/blog-metadata.{css,js}`

---

```markdown
## Hero Image
| ![Alt Text](image-url.png) |
```
→ Loads: `blocks/hero-image/hero-image.{css,js}`

---

```markdown
## Related Stories
| ![Image](url) | ## Title | Description | Date • Author |
```
→ Loads: `blocks/related-stories/related-stories.{css,js}`

---

### Landing Page Blocks

```markdown
## Featured Blog
| ![Image](url) | ## Title<br><br>Description |
```
→ Loads: `blocks/featured-blog/featured-blog.{css,js}`

---

```markdown
## Blog Cards
| ![Image](url) | ## Title | Description | Date • Author |
```
→ Loads: `blocks/blog-cards/blog-cards.{css,js}`

---

## ❌ Common Mistakes

| ❌ Wrong | ✅ Correct | Why |
|----------|-----------|-----|
| `## Metadata` | `## Blog Metadata` | Folder is `blog-metadata/` |
| `## Hero` | `## Hero Image` | Folder is `hero-image/` |
| `## Related` | `## Related Stories` | Folder is `related-stories/` |
| `## Latest Blogs` | `## Blog Cards` | Folder is `blog-cards/` |
| `## Featured` | `## Featured Blog` | Folder is `featured-blog/` |

---

## 🔍 How AEM Converts Headings to Block Names

**Conversion Rules:**
1. Take heading text after `##`
2. Convert to lowercase
3. Replace spaces with hyphens (`-`)
4. Remove special characters

**Examples:**

| Heading | Converts To | Must Match Folder |
|---------|-------------|-------------------|
| `## Blog Metadata` | `blog-metadata` | `blocks/blog-metadata/` |
| `## Hero Image` | `hero-image` | `blocks/hero-image/` |
| `## Related Stories` | `related-stories` | `blocks/related-stories/` |
| `## Blog Cards` | `blog-cards` | `blocks/blog-cards/` |
| `## Featured Blog` | `featured-blog` | `blocks/featured-blog/` |

---

## 🛠️ Troubleshooting: Block Not Rendering?

### Symptom: Block shows as plain table or text

**Check:**
1. ✅ Is the heading spelled EXACTLY like the folder name?
2. ✅ Does the folder exist in `blocks/`?
3. ✅ Do both `.css` and `.js` files exist in the folder?
4. ✅ Is the table structure correct?

### Example Issue:

```markdown
## Metadata  ← ❌ WRONG!
| Date | November 11, 2025 |
```

**What happens:**
- AEM looks for: `blocks/metadata/metadata.{css,js}`
- But folder is: `blocks/blog-metadata/blog-metadata.{css,js}`
- Result: ❌ Renders as plain table

**Fix:**
```markdown
## Blog Metadata  ← ✅ CORRECT!
| Date | November 11, 2025 |
```

---

## 📋 Complete Block Name Checklist

Before publishing, verify:

- [ ] `## Blog Metadata` (not "Metadata")
- [ ] `## Hero Image` (not "Hero")
- [ ] `## Related Stories` (not "Related")
- [ ] `## Blog Cards` (not "Latest Blogs" or "Cards")
- [ ] `## Featured Blog` (not "Featured")

---

## 🎯 Quick Verification

**To check if a block will work:**

1. Look at your heading: `## Your Block Name`
2. Convert to lowercase with hyphens: `your-block-name`
3. Check if folder exists: `blocks/your-block-name/`
4. Verify files exist:
   - `blocks/your-block-name/your-block-name.css`
   - `blocks/your-block-name/your-block-name.js`

**All 4 must match exactly!**

---

## 📦 Available Blocks in This Project

| Block Folder | Correct Heading | Purpose |
|--------------|-----------------|---------|
| `blog-cards/` | `## Blog Cards` | 4-column blog grid |
| `blog-metadata/` | `## Blog Metadata` | Author info, date, share |
| `featured-blog/` | `## Featured Blog` | Landing page hero |
| `hero-image/` | `## Hero Image` | Article hero image |
| `related-stories/` | `## Related Stories` | Related posts grid |
| `header/` | Auto-loaded | Site header |
| `footer/` | Auto-loaded | Site footer |
| `hero/` | `## Hero` | Generic hero |
| `cards/` | `## Cards` | Generic cards |
| `columns/` | `## Columns` | Column layout |

---

## 💡 Pro Tips

1. **Copy-paste headings** from this document to avoid typos
2. **Use exact capitalization** (AEM ignores it, but good for consistency)
3. **Check folder names** before creating documents
4. **Test in preview** before going live
5. **When creating new blocks**, match heading to folder name EXACTLY

---

## 🚀 Testing Your Blocks

### Local Testing
```bash
aem up
open http://localhost:3000/your-page
```

### Check Browser Console
If block doesn't load, check for:
- 404 errors for CSS/JS files
- Block name mismatches
- JavaScript errors

### Visual Check
- ✅ Styled block = Correct heading
- ❌ Plain table = Wrong heading or missing files

---

## 📞 Still Not Working?

1. **Clear browser cache**
2. **Check file names** in `blocks/` folder
3. **Verify table structure** matches block's expected format
4. **Check browser DevTools** console for errors
5. **Compare with sample documents**:
   - [sample-landing-page.md](./sample-landing-page.md)
   - [sample-detail-page.md](./sample-detail-page.md)

---

## 🎓 Remember

**The golden rule:**

```
Heading Name → lowercase-with-hyphens → blocks/folder-name/
```

**They MUST match or your beautiful blocks become ugly tables!**

---

**Last Updated:** November 13, 2025  
**For:** AEM Forms Blog Implementation

