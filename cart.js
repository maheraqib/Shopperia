// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to display cart items
function displayCart() {
    const cartItemsContainer = document.getElementById("cartItems");
    const totalPriceElement = document.getElementById("totalPrice");
    const cartCount = document.getElementById("cartCount");

    cartItemsContainer.innerHTML = "";

    let total = 0;
    let totalItems = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        totalItems += item.quantity;

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <img src="images/${item.image}" alt="${item.name}">
            <p>${item.name}</p>
            <p>Price: $${item.price.toFixed(2)}</p>
            <p>Quantity: ${item.quantity}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;

        cartItemsContainer.appendChild(cartItem);
    });

    totalPriceElement.textContent = total.toFixed(2);
    cartCount.textContent = totalItems;
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

// Clear entire cart
document.getElementById("clearCart").addEventListener("click", function() {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
});

// Display cart items on page load
displayCart();
