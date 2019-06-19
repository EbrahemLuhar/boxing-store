export default class Basket {
    constructor() {}

    // ***** Basket Open Close Toggle *****
    toggleBasket() {
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
}