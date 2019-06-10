import '../../src/styles/scss/main.scss';
import glider from './glider';

// ***** Toggle mobile nav *****
const navSlide = () => {
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
    
    closeNav.addEventListener('click', () => {
        CloseMobileNav();
    });

    overlay.addEventListener('click', () => {
        CloseMobileNav();
    });
}

// ***** Glider *****
window.addEventListener('load', function(){
    new Glider(document.querySelector('.glider'), {
        slidesToShow: 1,
        dots: '#dots',
        draggable: false,
        arrows: {
            prev: '.glider-prev',
            next: '.glider-next'
        }
    });
});

// ***** Landing page modal *****
const newsletterModal = () => {
    const modal = document.querySelector('#mainModal');
    const modalBtn = document.querySelector('#modalBtn');
    const closeModal = document.querySelector('.close');
    const subscribeBtn = document.querySelector('.modal-btn');

    modalBtn.addEventListener('click', () => {
        modal.style.display = "block";
    }); 
    
    closeModal.addEventListener('click', () => {
        modal.style.display = "none";
    }); 

    subscribeBtn.addEventListener('click', () => {
        modal.style.display = "none";
    }); 
    
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }); 
}

navSlide();
newsletterModal();