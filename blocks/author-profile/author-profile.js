import { createOptimizedPicture } from '../../scripts/aem.js';

export default async function decorate(block) {
    // Config
    const authorName = block.textContent.trim();
    block.textContent = '';
    if (!authorName) return;

    // Fetch Author Data
    let authorData = null;
    try {
        const resp = await fetch('/authors.json');
        if (resp.ok) {
            const json = await resp.json();
            authorData = json.data.find((a) => a.name.toLowerCase() === authorName.toLowerCase());
        }
    } catch (e) {
        console.warn('Failed to load authors index', e);
    }

    // Fallback to name-only if fetch fails
    const name = authorData ? authorData.name : authorName;
    const title = authorData?.title || 'Contributor'; // "AEM Forms Expert"
    const bio = authorData?.bio || '';
    const image = authorData?.image;
    // Socials could be parsed from extra columns in spreadsheet
    const twitter = authorData?.twitter;
    const linkedin = authorData?.linkedin;

    const container = document.createElement('div');
    container.className = 'author-container';

    // 1. Avatar
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'author-avatar';
    if (image) {
        avatarDiv.append(createOptimizedPicture(image, name, false, [{ width: '300' }]));
    } else {
        // Placeholder
        avatarDiv.textContent = name.charAt(0);
        avatarDiv.classList.add('placeholder');
    }
    container.append(avatarDiv);

    // 2. Info
    const infoDiv = document.createElement('div');
    infoDiv.className = 'author-info';

    const h3 = document.createElement('h3');
    h3.textContent = name;
    infoDiv.append(h3);

    const roleMeta = document.createElement('p');
    roleMeta.className = 'author-role';
    roleMeta.textContent = title;
    infoDiv.append(roleMeta);

    if (bio) {
        const bioP = document.createElement('p');
        bioP.className = 'author-bio';
        bioP.textContent = bio;
        infoDiv.append(bioP);
    }

    // Socials (Basic)
    if (twitter || linkedin) {
        const socialDiv = document.createElement('div');
        socialDiv.className = 'author-socials';
        if (twitter) {
            const a = document.createElement('a');
            a.href = twitter;
            a.textContent = 'Twitter';
            socialDiv.append(a);
        }
        if (linkedin) {
            const a = document.createElement('a');
            a.href = linkedin;
            a.textContent = 'LinkedIn';
            socialDiv.append(a);
        }
        infoDiv.append(socialDiv);
    }

    container.append(infoDiv);
    block.append(container);
}
