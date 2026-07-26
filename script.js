// LocalStorage Keys Setup
const PRODUCTS_KEY = 'ecom_products';
const USERS_KEY = 'ecom_users';
const CURRENT_USER_KEY = 'ecom_current_user';
const CART_KEY = 'ecom_cart';

// Initial Mock Data Setup
function initStorage() {
    if (!localStorage.getItem(PRODUCTS_KEY)) {
        const initialProducts = [
            { id: 1, name: 'Wireless Headphones', price: 2999, img: 'https://via.placeholder.com/200' },
            { id: 2, name: 'Smartwatch', price: 4999, img: 'https://via.placeholder.com/200' },
            { id: 3, name: 'Bluetooth Speaker', price: 1999, img: 'https://via.placeholder.com/200' }
        ];
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(initialProducts));
    }
    if (!localStorage.getItem(USERS_KEY)) {
        localStorage.setItem(USERS_KEY, JSON.stringify([]));
    }
    if (!localStorage.getItem(CART_KEY)) {
        localStorage.setItem(CART_KEY, JSON.stringify([]));
    }
}

// Toggle Mobile Navigation Menu
function setupNavbar() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Dynamic Auth Link update
    const authLink = document.getElementById('auth-link');
    const currentUser = JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
    if (authLink) {
        if (currentUser) {
            authLink.textContent = 'Profile';
            authLink.href = 'user.html';
        } else {
            authLink.textContent = 'Login';
            authLink.href = 'login.html';
        }
    }
}

// Global Add To Cart Function
function addToCart(productId) {
    const products = JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || [];
    let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

    const product = products.find(p => p.id === productId);
    if (product) {
        const cartItem = cart.find(item => item.id === productId);
        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        alert(`${product.name} Added to Cart!`);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initStorage();
    setupNavbar();
});