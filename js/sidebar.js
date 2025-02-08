document.addEventListener('DOMContentLoaded', function() {
    // Ensure sidebar container exists
    let sidebarContainer = document.getElementById('sidebar-container');
    if (!sidebarContainer) {
        sidebarContainer = document.createElement('div');
        sidebarContainer.id = 'sidebar-container';
        document.body.insertBefore(sidebarContainer, document.body.firstChild);
    }

    // Load sidebar with proper path handling
    const loadSidebar = () => {
        const paths = [
            '/Marketplace/components/sidebar.html',
            '../components/sidebar.html',
            './components/sidebar.html',
            '/components/sidebar.html'
        ];
        let loadedSidebar = false;

        const tryLoadPath = (index) => {
            if (index >= paths.length || loadedSidebar) return;

            fetch(paths[index])
                .then(response => {
                    if (!response.ok) throw new Error('Not found');
                    return response.text();
                })
                .then(data => {
                    if (!loadedSidebar) {
                        sidebarContainer.innerHTML = data;
                        initializeSidebar();
                        loadedSidebar = true;
                    }
                })
                .catch(() => tryLoadPath(index + 1));
        };

        tryLoadPath(0);
    };

    if (!document.querySelector('.sidebar')) {
        loadSidebar();
    } else {
        initializeSidebar();
    }

    function initializeSidebar() {
        const sidebar = document.querySelector('.sidebar');
        if (!sidebar) return;

        // Profile menu handling
        const avatarButton = document.querySelector('.nav-item.avatar');
        const profileMenu = document.getElementById('profileMenu');

        if (avatarButton && profileMenu) {
            // Direct click handler
            avatarButton.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                profileMenu.classList.toggle('active');
                
                // Toggle aria-expanded
                const isExpanded = profileMenu.classList.contains('active');
                this.setAttribute('aria-expanded', isExpanded);
            };

            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!profileMenu.contains(e.target) && !avatarButton.contains(e.target)) {
                    profileMenu.classList.remove('active');
                    avatarButton.setAttribute('aria-expanded', 'false');
                }
            });

            // Prevent menu from closing when clicking inside
            profileMenu.onclick = function(e) {
                e.stopPropagation();
            };
        }

        // Initialize toggle button
        const toggleButton = document.createElement('button');
        toggleButton.className = 'sidebar-toggle';
        toggleButton.innerHTML = '→';
        document.body.appendChild(toggleButton);

        toggleButton.onclick = function() {
            sidebar.classList.toggle('collapsed');
            this.classList.toggle('collapsed');
            this.innerHTML = sidebar.classList.contains('collapsed') ? '←' : '→';
            localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
        };

        // Restore sidebar state
        if (localStorage.getItem('sidebarCollapsed') === 'true') {
            sidebar.classList.add('collapsed');
            toggleButton.classList.add('collapsed');
            toggleButton.innerHTML = '←';
        }
    }
});
