import '../../src/styles/scss/main.scss';
import glider from './glider';

const body = document.querySelector('body');
const productsDOM = document.querySelector('.product-listings');


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
class UI {
    displayProducts(products) {
        let result = '';
        products.forEach(product => {
            result += `
                <div class="item">
                    <div class="item-img-wrap">
                        <img src="${product.image}" 
                        alt="${product.brand} ${product.model}">
                    </div>
                    <div class="item-text-wrap">
                        <h3>${product.brand}</h3>
                        <div class="item-info">
                            <p>${product.model}</p>
                        </div>
                        <div class="item-price">
                            <span class="old-price"><del>${product.oldPrice}</del></span>
                            <span class="sale-price">${product.newPrice}</span>
                        </div>
                        <button class="basket-btn" data-id=${product.id}>
                            <i class="fas fa-shopping-cart"></i>
                            add to cart
                        </button>
                    </div>
                </div>
            `;
        });
        if (body.contains(productsDOM)) {
            productsDOM.innerHTML = result;
        }
    }

    getBasketButtons() {
            const addToCartBtns = [...document.querySelectorAll('.basket-btn')];
            console.log(addToCartBtns);
    }
}

// ***** Work with local storage *****
class Storage {
    // Using static methods so there is no need to create an instance
    static saveProducts(products) {
        localStorage.setItem("products", JSON.stringify(products));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI();
    const products = new Products();

    // get all products
    products.getProducts().then(products => {
        ui.displayProducts(products)
        Storage.saveProducts(products);
    }).then(() => {
        ui.getBasketButtons();
    });
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