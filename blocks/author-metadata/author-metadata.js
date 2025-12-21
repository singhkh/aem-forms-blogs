// import { getMetadata } from '../../scripts/aem.js';

export default function decorate(block) {
    // Parse key-value pairs
    [...block.children].forEach((row) => {
        const key = row.children[0]?.textContent.trim().toLowerCase();
        const val = row.children[1]?.textContent.trim();
        if (key && val) {
            // Create element property based
            const meta = document.createElement('meta');
            meta.setAttribute('name', key);
            meta.setAttribute('content', val);
            document.head.append(meta);

            // Specifically handle image for Open Graph
            if (key === 'image') {
                const ogImg = document.createElement('meta');
                ogImg.setAttribute('property', 'og:image');
                ogImg.setAttribute('content', val);
                document.head.append(ogImg);
            }
        }
    });

    // Hide the block itself
    block.style.display = 'none';
}
