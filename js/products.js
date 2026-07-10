import { products } from "./data.js";

const productsContainer = document.getElementById("products-container");
const categoryFilter = document.getElementById("categoryFilter");
const priceSort = document.getElementById("priceSort");
const globalSearch = document.getElementById("globalSearch");

function renderProducts(productsToRender) {
    if (!productsContainer) return;
    
    productsContainer.innerHTML = "";
    
    if (productsToRender.length === 0) {
        productsContainer.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">No products found.</p>`;
        return;
    }

    productsToRender.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-category">${product.category}</p>
                <div class="product-bottom">
                    <span class="price">$${product.price}</span>
                    <button class="btn btn-add-to-cart" data-id="${product.id}">
                        <i class="fa-solid fa-cart-plus"></i> Add
                    </button>
                </div>
            </div>
            <a href="product-details.html?id=${product.id}" class="view-details-overlay">View Details</a>
        `;
        productsContainer.appendChild(productCard);
    });

    const addToCartBtns = document.querySelectorAll(".btn-add-to-cart");
    addToCartBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const id = parseInt(btn.getAttribute("data-id"));
            addToCart(id);
        });
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = cart.findIndex(item => item.id === productId);
    
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCounter();
}

function updateCartCounter() {
    const cartCountElement = document.getElementById("cartCount");
    if (!cartCountElement) return;
    
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = totalItems;
}

function filterAndSortProducts() {
    let filteredProducts = [...products];
    
    if (globalSearch && globalSearch.value) {
        const searchTerm = globalSearch.value.toLowerCase().trim();
        filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(searchTerm) || 
            p.description.toLowerCase().includes(searchTerm)
        );
    }
    
    if (categoryFilter && categoryFilter.value !== "All") {
        filteredProducts = filteredProducts.filter(p => p.category === categoryFilter.value);
    }
    
    if (priceSort) {
        if (priceSort.value === "lowToHigh") {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (priceSort.value === "highToLow") {
            filteredProducts.sort((a, b) => b.price - a.price);
        }
    }
    
    renderProducts(filteredProducts);
}

function checkQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get("category");
    if (categoryParam && categoryFilter) {
        categoryFilter.value = categoryParam;
    }
}

function displayProductDetails() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));
    const product = products.find(product => product.id === id);

    if (product) {
        const mainImage = document.getElementById("main-image");
        const productName = document.getElementById("product-name");
        const productPrice = document.getElementById("product-price");
        const productDescription = document.getElementById("product-description");
        
        if (mainImage) mainImage.src = product.image;
        if (productName) productName.innerHTML = product.name;
        if (productPrice) productPrice.innerHTML = `$${product.price}`;
        if (productDescription) productDescription.innerHTML = product.description;
        
        const detailsAddToCartBtn = document.getElementById("details-add-to-cart");
        if (detailsAddToCartBtn) {
            detailsAddToCartBtn.addEventListener("click", () => addToCart(product.id));
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateCartCounter();
    
    if (document.getElementById("products-container")) {
        checkQueryParams();
        filterAndSortProducts();
        
        if (categoryFilter) categoryFilter.addEventListener("change", filterAndSortProducts);
        if (priceSort) priceSort.addEventListener("change", filterAndSortProducts);
        if (globalSearch) globalSearch.addEventListener("input", filterAndSortProducts);
    } else {
        displayProductDetails();
    }
});