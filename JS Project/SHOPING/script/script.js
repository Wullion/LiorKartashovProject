let totalPrice = 0;
const products = JSON.parse(localStorage.getItem("products")) || [];


function loadProducts() {
    const productTable = document.getElementById("products");
    productTable.innerHTML = "";
    totalPrice = 0;

    products.forEach((product, index) => {
        totalPrice += product.price;
        productTable.innerHTML += `
            <tr>
                <td>${product.name}</td>
                <td>$${product.price}</td>
                <td><button class="btn btn-danger btn-sm" onclick="removeItem(${index})">Remove</button></td>
            </tr>
        `;
    });

    document.getElementById("totalPrice").textContent = totalPrice;
}


function addItem() {
    const name = document.getElementById("name").value.trim();
    const price = parseFloat(document.getElementById("price").value);

    if (!name || isNaN(price) || price <= 0) {
        alert("Please enter a valid name and price.");
        return;
    }

    products.push({ name, price });
    localStorage.setItem("products", JSON.stringify(products));

    loadProducts();

    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
}


function removeItem(index) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    loadProducts();
}


document.addEventListener("DOMContentLoaded", loadProducts);