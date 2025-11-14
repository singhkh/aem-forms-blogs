export default function decorate(block) {
  const metadataHeader = document.createElement('div');
  metadataHeader.className = 'metadata-header';

  const dateReadtime = document.createElement('div');
  dateReadtime.className = 'date-readtime';

  const authorInfo = document.createElement('div');
  authorInfo.className = 'author-info';

  const authorDetails = document.createElement('div');
  authorDetails.className = 'author-details';

  [...block.children].forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const label = cells[0].textContent.trim().toLowerCase();

      if (label === 'date' || label === 'published') {
        const span = document.createElement('span');
        span.textContent = cells[1].textContent;
        dateReadtime.append(span);
      } else if (label === 'readtime' || label === 'read time') {
        const span = document.createElement('span');
        span.textContent = cells[1].textContent;
        dateReadtime.append(span);
      } else if (label === 'author') {
        const authorText = document.createElement('div');
        authorText.className = 'author-text';

        const authorName = document.createElement('h3');
        authorName.textContent = cells[1].textContent;
        authorText.append(authorName);

        authorDetails.append(authorText);
      } else if (label === 'avatar' || label === 'author image') {
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'author-avatar';
        avatarDiv.append(cells[1].firstElementChild);
        authorDetails.prepend(avatarDiv);
      } else if (label === 'role' || label === 'title') {
        const roleP = document.createElement('p');
        roleP.textContent = cells[1].textContent;
        authorDetails.querySelector('.author-text')?.append(roleP);
      }
    }
  });

  if (dateReadtime.children.length > 0) {
    metadataHeader.append(dateReadtime);
  }

  if (authorDetails.children.length > 0) {
    authorInfo.append(authorDetails);

    const shareButton = document.createElement('button');
    shareButton.className = 'share-button';
    shareButton.innerHTML = '<span>Share</span>';
    shareButton.addEventListener('click', () => {
      if (navigator.share) {
        navigator.share({
          title: document.title,
          url: window.location.href,
        });
      }
    });
    authorInfo.append(shareButton);

    metadataHeader.append(authorInfo);
  }

  block.textContent = '';
  block.append(metadataHeader);
}
