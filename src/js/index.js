import '../../src/styles/scss/main.scss';
import glider from './glider';

let cart = [];

// ***** Get the products from contentful *****
class Products {
    async getProducts() {
        try {
            let result = await fetch("../../products.json");
            let data = await result.json();
            let products = data.items;
            products = products.map(item => {
                const { type, brand, model, oldPrice, newPrice } = item.fields
                const { id } = item.sys
                const image = item.fields.image.fields.file.url;
                return {type, brand, model, oldPrice, newPrice, id, image}
            })
            return products;
        } catch (error) {
            console.log(error)
        }
    }
}

// ***** Display the product to UI *****
class UI {}

// ***** Work with local storage *****
class Storage {}

document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI();
    const products = new Products();

    // get all products
    products.getProducts().then(products => console.log(products));
});

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
    
    mobileLinks.addEventListener('click', () => {
        CloseMobileNav();
    });

    overlay.addEventListener('click', () => {
        CloseMobileNav();
    });
}

// ***** Basket Open Close Toggle *****
const toggleBasket = () => {
    const basket = document.querySelector('.fa-shopping-basket');
    const cart = document.querySelector('.cart');
    const closeCart = document.querySelector('.close-basket');
    const basketNum = document.querySelector('.basket-num');
    const overlay = document.querySelector('.overlay');

    function OpenBasket() {
        cart.style.transform = "translateX(0)";
        overlay.classList.add('overlay-active');
    }

    function CloseBasket() {
        cart.style.transform = "translateX(100%)";
        overlay.classList.remove('overlay-active');
    }

    basket.addEventListener('click', () => {
        OpenBasket();
    });

    basketNum.addEventListener('click', () => {
        OpenBasket();
    });

    closeCart.addEventListener('click', () => {
        CloseBasket();
    });

    overlay.addEventListener('click', () => {
        CloseBasket();
    });
}

// ***** Glider *****
const glide = () => {
    const body = document.querySelector('body');
    const glider = document.querySelector('.glider-wrap');
    if (body.contains(glider)) {
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
    }
}

// ***** Landing page modal *****
const newsletterModal = () => {
    const body = document.querySelector('body');
    const modal = document.querySelector('#mainModal');
    const modalBtn = document.querySelector('#modalBtn');
    const closeModal = document.querySelector('.close');
    const subscribeBtn = document.querySelector('.modal-btn');

    if (body.contains(modal)) {
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
}

navSlide();
toggleBasket();
newsletterModal();
glide();