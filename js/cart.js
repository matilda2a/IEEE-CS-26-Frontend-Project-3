const HOME_PAGE = "index.html";
const PRODUCTS_PAGE = "products.html";

document.getElementById("homeLink").href = HOME_PAGE;
document.getElementById("productsLink").href = PRODUCTS_PAGE;
document.getElementById("goShoppingBtn").href = HOME_PAGE;

/* Elements */
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


/* Get Cart From Storage */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* Save Cart */

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

/* Update Summary */

function updateSummary() {

    let total = 0;
    let quantity = 0;

    cart.forEach(product => {
        total += product.price * product.quantity;
        quantity += product.quantity;
    });

    totalPrice.textContent = "$" + total.toFixed(2);
    totalQuantity.textContent = quantity;
    totalProducts.textContent = cart.length;
    cartCount.textContent = quantity;
}

/* Display Products */

function displayCart() {
    cartItems.innerHTML = "";
    if (cart.length === 0) {
        emptyCart.style.display = "flex";
        cartSection.style.display = "none";
        updateSummary();
        return;
    }
    emptyCart.style.display = "none";
    cartSection.style.display = "flex";

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

                <button class="remove-btn"onclick="removeProduct(${product.id})">Remove</button>
            </div>
        </div>
        `;
    });
    updateSummary();
}

/* Increase Quantity */
function increase(id) {
    let product = cart.find(item => item.id == id);
    if (product) {
        product.quantity++;
        saveCart();
        displayCart();
    }
}

/* Decrease Quantity */

function decrease(id) {
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

/* Remove Product */

function removeProduct(id) {
    cart = cart.filter(item => item.id != id);
    saveCart();
    displayCart();
}

/* Clear Cart */

clearCartBtn.onclick = function () {
    let check = confirm("Do you want to clear your cart ?");
    if (check) {
        cart = [];
        saveCart();
        displayCart();
    }
};


/*
            Checkout */

checkoutBtn.onclick = function () {
    if (cart.length == 0) return;
    checkoutModal.style.display = "flex";
};

/* Close Modal */

closeModal.onclick = function () {
    checkoutModal.style.display = "none";
    cart = [];
    saveCart();
    displayCart();
};

window.onclick = function (e) {
    if (e.target == checkoutModal) {
        checkoutModal.style.display = "none";
    }
};
displayCart();