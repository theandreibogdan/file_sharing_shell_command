// Copy functionality
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        const copyButton = document.querySelector('.copy-button');
        const originalText = copyButton.textContent;
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
            copyButton.textContent = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.querySelector('[data-mobile-menu-button]');
    const closeMenuButton = document.querySelector('[data-close-menu-button]');
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    const backdrop = document.querySelector('[data-backdrop]');

    function toggleMenu() {
        mobileMenu.classList.toggle('hidden');
        backdrop.classList.toggle('hidden');
    }

    mobileMenuButton?.addEventListener('click', toggleMenu);
    closeMenuButton?.addEventListener('click', toggleMenu);
    backdrop?.addEventListener('click', toggleMenu);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (!mobileMenu.classList.contains('hidden')) {
                    toggleMenu();
                }
            }
        });
    });
}); 