(function(){
    // Immediately apply saved theme preference before CSS loads
    try {
        if (localStorage.getItem('theme') === 'dark') {
            document.documentElement.classList.add('dark-mode');
        }
    } catch (e) {
        // Silently handle privacy mode or blocked storage
    }
})();