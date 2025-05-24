function initializeProfileMenu() {
    const avatarButton = document.querySelector('.avatar');
    const profileMenu = document.getElementById('profileMenu');

    if (!avatarButton || !profileMenu) {
        console.error('Profile menu elements not found');
        return;
    }

    function toggleMenu(event) {
        event.preventDefault();
        event.stopPropagation();

        const isActive = profileMenu.classList.contains('active');
        profileMenu.classList.toggle('active');
        avatarButton.setAttribute('aria-expanded', !isActive);
    }

    function closeMenuOnClickOutside(event) {
        if (!avatarButton.contains(event.target) && !profileMenu.contains(event.target)) {
            profileMenu.classList.remove('active');
            avatarButton.setAttribute('aria-expanded', 'false');
        }
    }

    // Event listeners
    avatarButton.addEventListener('click', toggleMenu);
    document.addEventListener('click', closeMenuOnClickOutside);

    // Prevent menu from closing when clicking inside it
    profileMenu.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeProfileMenu);

// Add scroll behavior for navbar
let lastScrollTop = 0;
const navbar = document.querySelector('.sidebar');
const scrollThreshold = 50; // Minimum scroll amount before hiding navbar

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
        // Scrolling down
        navbar.classList.add('hidden');
    } else {
        // Scrolling up
        navbar.classList.remove('hidden');
    }
    
    lastScrollTop = scrollTop;
});
