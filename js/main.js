document.addEventListener('DOMContentLoaded', () => {
    updateNavbar();
    updateCartCount();
    initHamburger();
});

window.updateCartCount = updateCartCount;

function initHamburger() {
    const menuBtn = document.getElementById('menu');
    const navLinks = document.getElementById('navLinks');
    const overlay = document.getElementById('navOverlay');
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
                <span style="font-weight: 600; color: var(--text-color);">Hi, ${user.name.split(' ')[0]}</span>
                <button onclick="logout()" class="btn btn-primary" style="padding: 0.4rem 1rem;">Logout</button>
            </div>
        `;
    } else {
        authContainer.innerHTML = `
            <a href="login.html" class="login-link"><i class="fa-regular fa-user"></i> Login</a>
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

    cartCountElement.textContent = totalItems;
}
