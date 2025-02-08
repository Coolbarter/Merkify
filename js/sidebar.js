document.addEventListener('DOMContentLoaded', function() {
    // Load sidebar
    fetch('./components/sidebar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('sidebar-container').innerHTML = data;
            
            // Handle avatar click for profile menu
            const avatar = document.querySelector('.nav-item.avatar');
            const profileMenu = document.querySelector('.profile-menu');

            if (avatar && profileMenu) {
                avatar.addEventListener('click', function(e) {
                    e.stopPropagation();
                    profileMenu.classList.toggle('active');
                });

                // Close menu when clicking outside
                document.addEventListener('click', function() {
                    profileMenu.classList.remove('active');
                });
            }
        });
});
