document.addEventListener('DOMContentLoaded', () => {
    updateNavbar();
    updateCartCount();
    initHamburger();
});

function initHamburger() {
    const menuBtn  = document.getElementById('menu');
    const navLinks = document.getElementById('navLinks');
    const overlay  = document.getElementById('navOverlay');
    if (!menuBtn) return;

    function openMenu() {
        menuBtn.classList.add('open');
        navLinks.classList.add('open');
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        menuBtn.classList.remove('open');
        navLinks.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.contains('open') ? closeMenu() : openMenu();
    });

    overlay.addEventListener('click', closeMenu);

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

function updateNavbar() {
    const authContainer = document.getElementById('authContainer');
    if (!authContainer) return;

    const loggedInUser = localStorage.getItem('loggedInUser');

    if (loggedInUser) {
        const user = JSON.parse(loggedInUser);
        authContainer.innerHTML = `
            <div style="display: flex; align-items: center; gap: 1rem;">
                <span style="font-weight: 600; color: var(--secondary-color);">Hi, ${user.name.split(' ')[0]}</span>
                <button onclick="logout()" class="btn btn-secondary" style="padding: 0.4rem 1rem;">Logout</button>
            </div>
        `;
    } else {
        authContainer.innerHTML = `
            <a href="login.html" class="btn btn-primary">Login</a>
        `;
    }
}

window.logout = function () {
    localStorage.removeItem('loggedInUser');
    window.location.reload();
};

function updateCartCount() {
    const cartCountElement = document.getElementById('cartCount');
    if (!cartCountElement) return;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    cartCountElement.textContent = `(${totalItems})`;
}


import { products } from "./data.js";

function displayProducts (){
    const container = document.getElementById("products-container")
    const params = new URLSearchParams(window.location.search)
    const type = params.get("category")

    let filtered =[]
    if (type === "SpongeBob"){
        filtered = products.filter(product => product.category === "SpongeBob")
    }
    else if(type === "Patrick") {
        filtered = products.filter(p => p.category === "Patrick")
    }
    else if(type === "Mr. Krabs") {
        filtered = products.filter(p => p.category === "Mr. Krabs")
    }
    else if(type === "Squidward") {
        filtered = products.filter(p => p.category === "Squidward")
    }
    else{
        filtered = products
    }

    container.innerHTML = filtered.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: ${product.price} $</p>
            <p>Category: ${product.category}</p>
          <button class="details"><a href="product-details.html?id=${product.id}">Show Details</a></button>
        </div>
        `
    ).join("")
}
displayProducts()