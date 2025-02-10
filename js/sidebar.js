document.addEventListener('DOMContentLoaded', function () {
    const avatarButton = document.querySelector('.nav-item.avatar');
    const profileMenu = document.querySelector('.profile-menu');

    if (avatarButton && profileMenu) {
        avatarButton.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            profileMenu.classList.toggle('active');
            const isExpanded = profileMenu.classList.contains('active');
            avatarButton.setAttribute('aria-expanded', isExpanded);
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!avatarButton.contains(e.target) && !profileMenu.contains(e.target)) {
                profileMenu.classList.remove('active');
                avatarButton.setAttribute('aria-expanded', 'false');
            }
        });
    }
});
