if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark-mode');
    document.getElementById('modeIcon').src = 'images/moon_png';
}

const toggleBtn = document.getElementById('modeIcon');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
    html.classList.add('dark-mode');
    toggleBtn.src = 'images/moon_icon.png';
} else {
    html.classList.remove('dark-mode');
    toggleBtn.src = 'images/sun_icon.png';
}

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
