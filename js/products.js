import { products } from "./data.js";

function displayProductDetails (){
    const params = new URLSearchParams(window.location.search)
    const id = params.get("id")
    const product = products.find(product => product.id === id)

    if (product) {
    document.getElementById("main-image").src = product.image;
    document.getElementById("product-name").innerHTML = product.name;
    document.getElementById("product-price").innerHTML = `Price: ${product.price} $`;
    document.getElementById("product-description").innerHTML = product.description;
}


}
displayProductDetails()