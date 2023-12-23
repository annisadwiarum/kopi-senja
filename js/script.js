// toggle class active untuk hamburger menu
const navbarNav = document.querySelector('.navbar-nav');

//ketika humberger menu di klik
document.querySelector('#hamburger-menu').onclick = (e) => {
    navbarNav.classList.toggle('active');
    e.preventDefault();
};

//toggle active untuk search form
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');

//ketika icons search di klik
document.querySelector('#search-button').onclick = (e) => {
    searchForm.classList.toggle('active');
    e.preventDefault();
    searchBox.focus();
};

// toggle tuk shopping cart 
const shoppingCart = document.querySelector('.shopping-cart');

//ketika icon cart di klik
document.querySelector('#shopping-cart-button').onclick = (e) => {
    shoppingCart.classList.toggle('active');
    e.preventDefault();
}

//klik sembarang untuk mengclose
const hamburger = document.querySelector('#hamburger-menu');
const sb = document.querySelector('#search-button');
const sc = document.querySelector('#shopping-cart-button');

document.addEventListener('click', function (e) {
    if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active');
    }
    if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
        searchForm.classList.remove('active');
    }
    if (!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
        shoppingCart.classList.remove('active');
    }
})