// toggle class active
const navbarNav = document.querySelector('.navbar-nav');

//ketika humberger menu di klik
document.querySelector('#humberger-menu').onclick = () => {
    navbarNav.classList.toggle('active');
};