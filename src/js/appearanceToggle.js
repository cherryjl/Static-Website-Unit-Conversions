// Selectors and variables.
const toggleBtn = document.getElementById('modeIcon');
const html = document.documentElement;
const savedTheme = localStorage.getItem('theme');

// Initial theme setup based on saved preference.
if (savedTheme === 'dark') {
    html.classList.add('dark-mode');
    toggleBtn.src = 'images/moon_icon.png';
} else {
    html.classList.remove('dark-mode');
    toggleBtn.src = 'images/sun_icon.png';
}

// Event listener for toggle button.
toggleBtn.addEventListener('click', () => {
    html.classList.toggle('dark-mode');

    if (html.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        toggleBtn.src = 'images/moon_icon.png';
    } else {
        localStorage.setItem('theme', 'light');
        toggleBtn.src = 'images/sun_icon.png';
    }
});
