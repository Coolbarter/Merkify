document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('expertForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send this to your backend
        console.log('Expert application data:', data);
        
        // For demo purposes, show success message
        alert('Thank you for your application! We will review it and get back to you soon.');
        window.location.href = 'home_page.html';
    });
});
