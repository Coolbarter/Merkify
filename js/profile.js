document.addEventListener('DOMContentLoaded', function() {
    const avatarElement = document.querySelector('.nav-item.avatar');
    const profileMenu = document.getElementById('profileMenu');
    let isMenuOpen = false;

    // Toggle menu on avatar click
    avatarElement.addEventListener('click', function(e) {
        e.stopPropagation();
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            profileMenu.classList.add('active');
        } else {
            profileMenu.classList.remove('active');
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!avatarElement.contains(e.target)) {
            profileMenu.classList.remove('active');
            isMenuOpen = false;
        }
    });

    // Prevent menu from closing when clicking inside it
    profileMenu.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});
