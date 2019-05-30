import '../../src/styles/scss/main.scss';

const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.mobile-menu');
    const closeNav = document.querySelector('.fa-times');
    const overlay = document.querySelector('.overlay');

    // Toggle mobile nav
    burger.addEventListener('click', () => {
        nav.classList.add('mobile-nav-slide');
        overlay.classList.add('overlay-active');
    });

    closeNav.addEventListener('click', () => {
        nav.classList.remove('mobile-nav-slide');
        overlay.classList.remove('overlay-active');
    });
}

navSlide();
