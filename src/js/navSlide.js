export default class NavSlide {
    constructor() {}

    navSlide() {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.mobile-menu');
        const closeNav = document.querySelector('.fa-times');
        const mobileLinks = document.querySelector('.mobile-menu-container a');
        const overlay = document.querySelector('.overlay');
    
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
        
        mobileLinks.addEventListener('click', () => {
            CloseMobileNav();
        });
    
        overlay.addEventListener('click', () => {
            CloseMobileNav();
        });
    }
}