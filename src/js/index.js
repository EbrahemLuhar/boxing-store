import '../../src/styles/scss/main.scss';
import glider from './glider';
import NewsLetterModal from './newsletterModal';
import Basket from './basket';
import NavSlide from './navSlide';
import Blog from './blogToggle';

const contentful = require('contentful');
const client = contentful.createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: "ercjdc305ovv",
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: "Ub2F2PVq7L4EH4_pw7xGhFw7qGytTJCxny0Tj_87YMI"
});

const body = document.querySelector('body');
const productsDOM = document.querySelector('.product-listings');
const cartTotal = document.querySelector('.cart-total');
const cartContainer = document.querySelector('.cart-container');
const cartItemsNum = document.querySelector('.basket-num');
const clearCartBtn = document.querySelector('.clear-cart');

// cart
let cart = [];
// buttons
let buttonsDOM = [];

// ***** Get the products from contentful *****
class Products {
    async getProducts() {
        try {
            let contentful = await client.getEntries({
                content_type: 'boxingStore'
            });
            
            // let result = await fetch("../../products.json");
            // let data = await result.json();

            let products = contentful.items;
            products = products.map(item => {
                const { type, brand, model, oldPrice, newPrice } = item.fields
                const { id } = item.sys
                const image = item.fields.image.fields.file.url;
                return {type, brand, model, oldPrice, newPrice, id, image}
            });
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


        if (body.contains(productsDOM) && products.length !== 0) {
            productsDOM.innerHTML = result;
        } else if (products.length == 0 || products == undefined) {
            productsDOM.innerHTML = "No products found";
        }
    }
    

    getBasketButtons() {
        const addToCartBtns = [...document.querySelectorAll('.basket-btn')];
        buttonsDOM = addToCartBtns;
        addToCartBtns.forEach(button => {
            let id = button.dataset.id;
            let inCart = cart.find(item => item.id === id);
            if(inCart) {
                button.innerText = "In Cart";
                button.disabled = true;
            } 
            button.addEventListener('click', event => {
                event.target.innerText = "In Cart";
                event.target.disabled = true;

                // get the product from products based on id from button
                let cartItem = {...Storage.getProduct(id), amount: 1};
                // add product to the cart
                cart = [...cart, cartItem];
                // save the cart in local storage
                Storage.saveCart(cart);
                // set cart values 
                this.setCartValues(cart);
                // display the cart item
                this.addCartItem(cartItem);
                // show the cart
            });
        });
    }

    setCartValues(cart) {
        let tempTotal = 0;
        let itemsTotal = 0;
        cart.map(item => {
            tempTotal += item.newPrice * item.amount;
            itemsTotal += item.amount
        });
        cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
        cartItemsNum.innerHTML = itemsTotal;
    }

    addCartItem(item) {
        const div = document.createElement('div');
        div.classList.add('cart-content');
        div.innerHTML = `
            <img src="${item.image}" alt="${item.brand} ${item.model}">
            <div class="cart-info">
                <h4>${item.brand} ${item.model}</h4>
                <h5>${item.newPrice}</h5>
                <span class="remove-item" data-id=${item.id}>remove</span>
            </div>
            <div class="cart-up-down">
                <i class="fas fa-chevron-up" data-id=${item.id}></i>
                <p class="item-amount">${item.amount}</p>
                <i class="fas fa-chevron-down" data-id=${item.id}></i>
            </div>
        `;
        cartContainer.appendChild(div);
    }

    setupApp() {
        cart = Storage.getCart();
        this.setCartValues(cart);
        this.populateCart(cart);
    }

    populateCart(cart) {
        cart.forEach(item => this.addCartItem(item));
    }

    cartLogic() {
        // clear cart button
        clearCartBtn.addEventListener('click', () => {
            this.clearCart();
        });

        // cart functionality (event delegation)
        cartContainer.addEventListener('click', event => {
            if(event.target.classList.contains('remove-item')) {
                let removeItem = event.target;
                let id = removeItem.dataset.id;
                cartContainer.removeChild(removeItem.parentElement.parentElement);
                this.removeItem(id);
            }
            else if (event.target.classList.contains("fa-chevron-up")) {
                let addAmount = event.target;
                let id = addAmount.dataset.id;
                let tempItem = cart.find(item => item.id === id);
                tempItem.amount = tempItem.amount + 1;
                Storage.saveCart(cart);
                this.setCartValues(cart);
                addAmount.nextElementSibling.innerText = tempItem.amount;
            }
            else if (event.target.classList.contains("fa-chevron-down")) {
                let lowerAmount = event.target;
                let id = lowerAmount.dataset.id;
                let tempItem = cart.find(item => item.id === id);
                tempItem.amount = tempItem.amount -1;
                if (tempItem.amount > 0) {
                    Storage.saveCart(cart);
                    this.setCartValues(cart);
                    lowerAmount.previousElementSibling.innerText = tempItem.amount;
                } 
                else {
                    cartContainer.removeChild(lowerAmount.parentElement.parentElement);
                    this.removeItem(id);
                }
            }
        });
    }

    clearCart() {
        let cartItems = cart.map(item => item.id);
        cartItems.forEach(id => this.removeItem(id));
        console.log(cartContainer.children);

        while(cartContainer.children.length > 0) {
            cartContainer.removeChild(cartContainer.children[0])
        }
    }

    removeItem(id) {
        cart = cart.filter(item => item.id !== id);
        this.setCartValues(cart);
        Storage.saveCart(cart);
        let button = this.getSingleButton(id);
        button.disabled = false;
        button.innerHTML = `<i class="fas fa-shopping-cart"></i>ADD TO CART`
    }

    getSingleButton(id) {
        return buttonsDOM.find(button => button.dataset.id === id);
    }
}

// ***** Work with local storage *****
class Storage {
    // Using static methods so there is no need to create an instance
    static saveProducts(products) {
        localStorage.setItem("products", JSON.stringify(products));
    }
    static getProduct(id) {
        let products = JSON.parse(localStorage.getItem('products'));
        return products.find(product => product.id === id);
    }
    static saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    static getCart() {
        return localStorage.getItem('cart') ? 
            JSON.parse(localStorage.getItem('cart')) : [];
    }
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

document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI();
    const products = new Products();
    const newsLetter = new NewsLetterModal();
    const basket = new Basket();
    const nav = new NavSlide();
    const blog = new Blog();

    // setup app
    ui.setupApp();

    // get all products
    products.getProducts().then(products => {
        ui.displayProducts(products);
        Storage.saveProducts(products);
    }).then(() => {
        ui.getBasketButtons();
        ui.cartLogic();
    });

    nav.navSlide();
    basket.toggleBasket();
    newsLetter.newsletterModal();
    glide();
    blog.toggleBlog();
    
});