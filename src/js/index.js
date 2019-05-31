import '../../src/styles/scss/main.scss';

const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.mobile-menu');
    const closeNav = document.querySelector('.fa-times');
    const overlay = document.querySelector('.overlay');
    const activeOverlay = document.querySelector('.overlay-active')

    // Toggle mobile nav

    function CloseMobileNav() {
        nav.classList.remove('mobile-nav-slide');
        overlay.classList.remove('overlay-active');
    }

    function OpenMobileNav() {
        nav.classList.add('mobile-nav-slide');
        overlay.classList.add('overlay-active');
    }

    burger.addEventListener('click', () => {
        OpenMobileNav();
    });

    closeNav.addEventListener('click', () => {
        CloseMobileNav();
    });

    overlay.addEventListener('click', () => {
        CloseMobileNav();
    });
}

navSlide();