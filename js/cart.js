const cartItems = document.getElementById("cartItems");
const totalPrice = document.getElementById("totalPrice");
const totalQuantity = document.getElementById("totalQuantity");
const totalProducts = document.getElementById("totalProducts");
const cartCount = document.getElementById("cartCount");
const emptyCart = document.getElementById("emptyCart");
const cartSection = document.getElementById("cartSection");
const clearCartBtn = document.getElementById("clearCartBtn");
const checkoutBtn = document.getElementById("checkoutBtn");
const checkoutModal = document.getElementById("checkoutModal");
const closeModal = document.getElementById("closeModal");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    if (window.updateCartCount) {
        window.updateCartCount();
    }
}

function updateSummary() {

    let total = 0;
    let quantity = 0;

    cart.forEach(product => {
        total += product.price * product.quantity;
        quantity += product.quantity;
    });

    if (totalPrice) totalPrice.textContent = "$" + total.toFixed(2);
    if (totalQuantity) totalQuantity.textContent = quantity;
    if (totalProducts) totalProducts.textContent = cart.length;
    if (cartCount) cartCount.textContent = quantity;
}

function displayCart() {
    if (!cartItems) return;
    cartItems.innerHTML = "";
    if (cart.length === 0) {
        if (emptyCart) emptyCart.style.display = "flex";
        if (cartSection) cartSection.style.display = "none";
        updateSummary();
        return;
    }
    if (emptyCart) emptyCart.style.display = "none";
    if (cartSection) cartSection.style.display = "flex";

    cart.forEach(product => {

        cartItems.innerHTML += `

        <div class="cart-item">

            <img src="${product.image}" alt="${product.name}">

            <div class="item-info">

                <h3>${product.name}</h3>

                <p class="price">$${product.price}</p>

                <p>Quantity : ${product.quantity}</p>

                <div class="quantity">

                    <button onclick="decrease(${product.id})">-</button>

                    <span>${product.quantity}</span>

                    <button onclick="increase(${product.id})">+</button>

                </div>

                <button class="remove-btn" onclick="removeProduct(${product.id})">Remove</button>
            </div>
        </div>
        `;
    });
    updateSummary();
}

window.increase = function(id) {
    let product = cart.find(item => item.id == id);
    if (product) {
        product.quantity++;
        saveCart();
        displayCart();
    }
}

window.decrease = function(id) {
    let product = cart.find(item => item.id == id);
    if (!product) return;
    if (product.quantity > 1) {
        product.quantity--;
    } else {
        cart = cart.filter(item => item.id != id);
    }
    saveCart();
    displayCart();
}

window.removeProduct = function(id) {
    cart = cart.filter(item => item.id != id);
    saveCart();
    displayCart();
}

if (clearCartBtn) {
    clearCartBtn.onclick = function () {
        let check = confirm("Do you want to clear your cart ?");
        if (check) {
            cart = [];
            saveCart();
            displayCart();
        }
    };
}
if (checkoutBtn) {
    checkoutBtn.onclick = function () {
        if (cart.length == 0) return;
        checkoutModal.style.display = "flex";
    };
}

if (closeModal) {
    closeModal.onclick = function () {
        checkoutModal.style.display = "none";
        cart = [];
        saveCart();
        displayCart();
    };
}

window.onclick = function (e) {
    if (e.target == checkoutModal) {
        checkoutModal.style.display = "none";
    }
};

document.addEventListener("DOMContentLoaded", () => {
    displayCart();
});