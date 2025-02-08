document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const photoUpload = document.getElementById('photoUpload');
    const profileImage = document.getElementById('profileImage');
    const profileForm = document.getElementById('profileForm');
    const timezoneSelect = document.getElementById('timezone');

    // Theme Toggle
    themeToggle.addEventListener('click', () => {
        document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
        themeToggle.textContent = document.body.dataset.theme === 'dark' ? '☀️' : '🌙';
        localStorage.setItem('theme', document.body.dataset.theme);
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.dataset.theme = savedTheme;
        themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    }

    // Profile Photo Upload with validation
    photoUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert('Please upload an image file');
                return;
            }
            if (file.size > 5000000) { // 5MB limit
                alert('File size should be less than 5MB');
                return;
            }
            const reader = new FileReader();
            reader.onload = function(e) {
                profileImage.src = e.target.result;
                localStorage.setItem('profileImage', e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    // Populate Timezones
    const timezones = Intl.supportedValuesOf('timeZone');
    timezones.forEach(timezone => {
        const option = document.createElement('option');
        option.value = timezone;
        option.textContent = timezone;
        timezoneSelect.appendChild(option);
    });

    // Form Validation
    function validateForm() {
        const displayName = document.getElementById('displayName').value;
        const password = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (!displayName) {
            alert('Display name is required');
            return false;
        }

        if (password && password !== confirmPassword) {
            alert('Passwords do not match');
            return false;
        }

        return true;
    }

    // Load user data
    function loadUserData() {
        const savedImage = localStorage.getItem('profileImage');
        if (savedImage) {
            profileImage.src = savedImage;
        }

        // Load saved form data
        const savedData = JSON.parse(localStorage.getItem('userData') || '{}');
        Object.keys(savedData).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                if (element.type === 'checkbox') {
                    element.checked = savedData[key];
                } else {
                    element.value = savedData[key];
                }
            }
        });
    }

    // Form Submission
    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!validateForm()) return;

        // Collect form data
        const formData = new FormData(profileForm);
        const userData = {};
        formData.forEach((value, key) => {
            userData[key] = value;
        });

        // Save to localStorage (in real app, send to server)
        localStorage.setItem('userData', JSON.stringify(userData));
        alert('Profile updated successfully!');
    });

    // Initialize
    loadUserData();
});
