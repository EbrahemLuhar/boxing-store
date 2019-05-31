import '../../src/styles/scss/main.scss';

const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.mobile-menu');
    const closeNav = document.querySelector('.fa-times');
    const overlay = document.querySelector('.overlay');
    const activeOverlay = document.querySelector('.overlay-active')

    // Toggle mobile nav
    burger.addEventListener('click', () => {
        nav.classList.add('mobile-nav-slide');
        overlay.classList.add('overlay-active');
    });

    closeNav.addEventListener('click', () => {
        CloseMobileNav();
    });

    overlay.addEventListener('click', () => {
        CloseMobileNav();
    });

    function CloseMobileNav() {
        nav.classList.remove('mobile-nav-slide');
        overlay.classList.remove('overlay-active');
    }
}

navSlide();
