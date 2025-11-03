if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark-mode');
}

const toggleBtn = document.getElementById('theme-toggle');
const html = document.documentElement;

toggleBtn.addEventListener('click', () => {
    html.classList.toggle('dark-mode');
    localStorage.setItem('theme', html.classList.contains('dark-mode') ? 'dark' : 'light');
});
