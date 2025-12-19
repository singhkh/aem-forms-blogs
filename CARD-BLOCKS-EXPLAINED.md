# Card Blocks Explained - Why You Have Three Different Card Blocks

## 🎯 **The Issue You Discovered**

You correctly noticed that cards on your **homepage** look different from cards on your **detail page**. This happened because your project has **THREE different card blocks**, and they were using different styling!

---

## 📦 **Three Card Blocks in Your Project**

| Block Name | Location | Purpose | Status |
|------------|----------|---------|--------|
| **`cards`** | `blocks/cards/` | Generic card grid (OLD block) | ✅ NOW UPDATED |
| **`blog-cards`** | `blocks/blog-cards/` | Landing page blog cards | ✅ UPDATED |
| **`related-stories`** | `blocks/related-stories/` | Detail page related posts | ✅ UPDATED |

---

## 🔍 **Why Three Blocks?**

### **1. `cards` - Generic Card Block**
- **Created by:** AEM Boilerplate (default block)
- **Originally used for:** General-purpose card layouts
- **Old styling:** Basic border, no gradients, minimal effects
- **Status:** ✅ **NOW UPDATED** with modern styling

### **2. `blog-cards` - Landing Page Cards**
- **Created by:** Our Figma implementation
- **Used for:** Blog post listings on landing pages
- **Styling:** Modern design with gradients, hover effects, 20px titles
- **Status:** ✅ Already updated

### **3. `related-stories` - Detail Page Cards**
- **Created by:** Our Figma implementation
- **Used for:** Related blog posts at bottom of detail pages
- **Styling:** Identical to `blog-cards` for consistency
- **Status:** ✅ Already updated

---

## 🎨 **Styling Now Consistent Across All Three**

All three blocks now have:

✅ **Typography:**
- Title: **20px bold** (not 18px)
- Description: **16px** (not 15px)
- Meta: **14px light gray**

✅ **Spacing:**
- Card padding: **24px** (not 20px or 16px)
- Title margin: **16px bottom**
- Description margin: **20px bottom**

✅ **Card Design:**
- Border radius: **12px** (not straight or 8px)
- Subtle border: **1px #f3f4f6**
- Gradient overlay on images
- Smooth hover effects (lift 4px)
- Soft shadows

✅ **Responsive:**
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 4 columns

---

## 📋 **Which Block to Use When**

### **Use `cards` for:**
- ❓ You're not sure which one to use
- 🌐 Generic card layouts anywhere on your site
- 📄 Project showcases, team members, testimonials
- 🔧 When you need a flexible card grid

### **Use `blog-cards` for:**
- 🏠 Landing pages
- 📰 Blog listing pages
- 🗂️ Archive/category pages
- 📊 Main blog content grids

### **Use `related-stories` for:**
- 📖 Bottom of blog detail pages
- 🔗 "Read more" sections
- 📚 Related content recommendations
- 🎯 Contextual blog suggestions

---

## 🚀 **How to Use Each Block**

### **Option A: In Google Docs / Word**

#### **Cards Block:**
```
## Cards

[Image] | [Title] | [Description] | [Meta]
[Image] | [Title] | [Description] | [Meta]
```

#### **Blog Cards Block:**
```
## Blog Cards

[Image] | [Title] | [Description] | [Meta]
[Image] | [Title] | [Description] | [Meta]
```

#### **Related Stories Block:**
```
## Related Stories

[Image] | [Title] | [Description] | [Meta]
[Image] | [Title] | [Description] | [Meta]
```

### **Option B: In Markdown**

#### **Cards Block:**
```markdown
## Cards

| ![Alt](/image.jpg) | ## Title | Description text | Date • Author |
| ![Alt](/image.jpg) | ## Title | Description text | Date • Author |
```

#### **Blog Cards Block:**
```markdown
## Blog Cards

| ![Alt](/image.jpg) | ## Title | Description text | Date • Author |
| ![Alt](/image.jpg) | ## Title | Description text | Date • Author |
```

#### **Related Stories Block:**
```markdown
## Related Stories

| ![Alt](/image.jpg) | ## Title | Description text | Date • Author |
| ![Alt](/image.jpg) | ## Title | Description text | Date • Author |
```

---

## ⚠️ **CRITICAL: Block Naming Rules**

The heading in your document **MUST EXACTLY MATCH** the block folder name:

| ❌ Wrong | ✅ Correct | Block Used |
|---------|-----------|------------|
| `## Card` | `## Cards` | `blocks/cards/` |
| `## Blog Card` | `## Blog Cards` | `blocks/blog-cards/` |
| `## Related Story` | `## Related Stories` | `blocks/related-stories/` |
| `## Latest Blogs` | `## Blog Cards` | `blocks/blog-cards/` |

**Case and pluralization matter!** AEM matches the heading to the folder name exactly (case-insensitive, but spaces must match).

---

## 🔧 **What Just Changed**

### **Before:**
- ❌ `cards` block had OLD styling (basic borders, no effects)
- ✅ `blog-cards` and `related-stories` had NEW styling
- ⚠️ **Result:** Cards looked different on different pages

### **After:**
- ✅ `cards` block has MODERN styling (matches Figma)
- ✅ `blog-cards` has MODERN styling
- ✅ `related-stories` has MODERN styling
- ✅ **Result:** All cards look consistent across your entire site!

---

## 📊 **Visual Comparison**

### **Old `cards` Block (Before Update):**
```
┌─────────────────────────┐
│                         │
│   [Image 4:3 ratio]     │ ← Old aspect ratio
│                         │
└─────────────────────────┘
┌─────────────────────────┐
│                         │ 16px padding
│ Title (18px, thin)      │ ← Too small, looked thin
│ Description (15px)      │
│ Date • Author           │
│                         │
└─────────────────────────┘
```

### **New `cards` Block (After Update):**
```
┌─────────────────────────┐
│                         │
│   [Image 16:9 ratio]    │ ← New aspect ratio
│   [Gradient Overlay]    │ ← Gradient effect
│                         │
└─────────────────────────┘
┌─────────────────────────┐
│                         │ 24px padding
│ Title (20px, BOLD)      │ ← Bigger, bolder
│ Description (16px)      │ ← More readable
│ Date • Author (light)   │ ← More subtle
│                         │
└─────────────────────────┘
```

---

## ✅ **All Changes Applied**

### **Files Updated:**
1. ✅ `blocks/cards/cards.css` - Complete redesign
2. ✅ `blocks/cards/cards.js` - Improved structure
3. ✅ `blocks/blog-cards/blog-cards.css` - Already updated
4. ✅ `blocks/blog-cards/blog-cards.js` - Already updated
5. ✅ `blocks/related-stories/related-stories.css` - Already updated
6. ✅ `blocks/related-stories/related-stories.js` - Already updated

### **Linting:**
- ✅ Zero CSS errors
- ✅ Zero JavaScript errors
- ✅ Production-ready

---

## 🚀 **Next Steps**

### **1. Commit & Deploy:**
```bash
git add blocks/cards/
git commit -m "Updated cards block to match blog-cards styling"
git push
```

### **2. Clear Cache:**
After deployment, force refresh:
- **Mac:** `⌘ + Shift + R`
- **Windows:** `Ctrl + Shift + R`
- Or visit: `https://main--aem-forms-blogs--singhkh.aem.page/?refresh=true`

### **3. Verify:**
Check these pages:
- ✅ Homepage: https://main--aem-forms-blogs--singhkh.aem.page/
- ✅ Detail page: https://main--aem-forms-blogs--singhkh.aem.page/when-universal-editor-and-form-fragments-change-the-game-for-enterprise-forms

All cards should now look identical!

---

## 💡 **Pro Tips**

### **Keep It Simple:**
- Use `cards` for most cases (it's the most flexible)
- Use `blog-cards` only on dedicated blog listing pages
- Use `related-stories` only at the bottom of blog posts

### **Future Maintenance:**
When you need to update card styling:
1. Update all three blocks consistently
2. Or consolidate to use just `cards` everywhere
3. The choice is yours!

### **Consolidation Option:**
If you want to simplify further, you could:
1. Use only `cards` block everywhere
2. Delete `blog-cards` and `related-stories` blocks
3. This reduces maintenance overhead

But having separate blocks gives you flexibility to style them differently in the future if needed.

---

## 🎉 **Summary**

**Problem:** Cards looked different on homepage vs detail page  
**Root Cause:** Three different card blocks with inconsistent styling  
**Solution:** Updated all three blocks with identical modern styling  
**Result:** Consistent, professional cards across your entire site!

---

## 📞 **Need Help?**

Refer to these guides:
- 📘 [Block Naming Reference](./BLOCK-NAMING-REFERENCE.md)
- 📋 [Block Syntax Reference](./BLOCK-SYNTAX-REFERENCE.md)
- 🎨 [Typography & Spacing Fixes](./TYPOGRAPHY-SPACING-FIXES.md)
- ✍️ [Authoring Guide](./AUTHORING-GUIDE.md)

**All three card blocks are now production-ready and pixel-perfect!** 🚀

