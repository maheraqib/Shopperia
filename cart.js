// Load Cart from Local Storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to Display Cart Items
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
            <img src="${item.image}" alt="${item.name}">
            <p>${item.name}</p>
            <p>Price: $${item.price.toFixed(2)}</p>
            <p>Quantity: ${item.quantity}</p>
            <button onclick="removeFromCart(${index})">❌</button>
        `;

        cartItemsContainer.appendChild(cartItem);
    });

    totalPriceElement.textContent = total.toFixed(2);
    cartCount.textContent = totalItems;
}

// Function to Remove Item from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

// Function to Clear Entire Cart
document.getElementById("clearCart").addEventListener("click", function () {
    showConfirmBox();
});

function showConfirmBox() {
    // Check if the confirm box already exists
    if (document.getElementById("confirm-box")) return;

    // Create the confirmation box
    const confirmBox = document.createElement("div");
    confirmBox.id = "confirm-box";
    confirmBox.innerHTML = `
        <div class="confirm-content">
            <p>🛒 Are you sure you want to clear your cart?</p>
            <button id="confirm-yes">Yes, Clear</button>
            <button id="confirm-no">Cancel</button>
        </div>
    `;

    // Append the confirm box to the body
    document.body.appendChild(confirmBox);

    // Handle button clicks
    document.getElementById("confirm-yes").onclick = function () {
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
        confirmBox.remove();
        showSuccessNotification("✅ Your cart has been cleared!");
    };

    document.getElementById("confirm-no").onclick = function () {
        confirmBox.remove(); // Remove box when cancel is clicked
    };
}

function showSuccessNotification(message) {
    const notification = document.createElement("div");
    notification.classList.add("success-notification");
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 2000); // Hide after 2 seconds
}

displayCart();
