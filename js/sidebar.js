document.addEventListener('DOMContentLoaded', function() {
    // Load sidebar
    fetch('./components/sidebar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('sidebar-container').innerHTML = data;
            
            // Setup profile menu toggle
            const avatar = document.querySelector('.nav-item.avatar');
            const profileMenu = document.getElementById('profileMenu');
            
            avatar.addEventListener('click', () => {
                profileMenu.classList.toggle('active');
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!avatar.contains(e.target)) {
                    profileMenu.classList.remove('active');
                }
            });
        });
});
