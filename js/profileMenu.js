function initializeProfileMenu() {
    const avatarButton = document.querySelector('.nav-item.avatar');
    const profileMenu = document.querySelector('.profile-menu');

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
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeProfileMenu);
