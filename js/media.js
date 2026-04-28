document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Меняем иконку при открытии
            if (navLinks.classList.contains('active')) {
                menuToggle.innerHTML = '✕'; // Крестик
            } else {
                menuToggle.innerHTML = '☰'; // Бургер
            }
        });
    }

    // Закрываем меню при клике на любую ссылку
    const links = document.querySelectorAll('.menustyles');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '☰';
        });
    });
});