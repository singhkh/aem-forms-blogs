export default function decorate(block) {
  // 1. Extract Metadata from Block
  // Expecting rows like: Key | Value
  const metaData = {};
  const tags = [];

  [...block.children].forEach((row) => {
    const keyCell = row.children[0];
    const valCell = row.children[1];
    if (keyCell && valCell) {
      const key = keyCell.textContent.trim().toLowerCase().replace(':', '');
      if (key === 'tags') {
        // Assume comma separated
        valCell.textContent.split(',').forEach((tag) => tags.push(tag.trim()));
      } else {
        metaData[key] = valCell.innerHTML; // Keep HTML for links/images
      }
    }
  });

  // 3. Build Header Structure
  const headerDiv = document.createElement('div');
  headerDiv.className = 'blog-header-content';

  // Title (Get from H1 in the document if not in block)
  // Usually H1 is separate. We'll leave H1 alone in the content flow
  // OR move it here if we want strict control.
  // Google Dev Blog: Breadcrumb -> Title -> Metadata.

  // Let's find the H1 on the page and move it here if it exists outside
  const h1 = document.querySelector('main h1');
  if (h1 && !block.contains(h1)) {
    headerDiv.append(h1);
  }

  // Metadata Row
  const metaRow = document.createElement('div');
  metaRow.className = 'blog-meta-row';

  // Author & Date
  if (metaData.author || metaData.date) {
    const authorDate = document.createElement('div');
    authorDate.className = 'blog-author-date';
    if (metaData.author) {
      const authorSpan = document.createElement('span');
      authorSpan.className = 'blog-author';
      authorSpan.innerHTML = metaData.author;
      authorDate.append(authorSpan);
    }
    if (metaData.date) {
      const dateSpan = document.createElement('time');
      dateSpan.className = 'blog-date';
      dateSpan.innerHTML = metaData.date;
      authorDate.append(dateSpan);
    }
    metaRow.append(authorDate);
  }

  // Tags
  if (tags.length > 0) {
    const tagList = document.createElement('ul');
    tagList.className = 'blog-tags';
    tags.forEach((tag) => {
      const li = document.createElement('li');
      li.textContent = tag;
      tagList.append(li);
    });
    headerDiv.append(tagList);
  }

  headerDiv.append(metaRow);

  // 4. Assemble
  block.textContent = '';
  block.append(headerDiv);
}
