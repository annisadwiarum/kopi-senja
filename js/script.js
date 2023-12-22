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

//klik sembarang untuk mengclose
const hamburger = document.querySelector('#hamburger-menu');
const sb = document.querySelector('#search-button');

document.addEventListener('click', function (e) {
    if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active');
    }
    if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
        searchForm.classList.remove('active');
    }
})