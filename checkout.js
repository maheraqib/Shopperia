document.addEventListener("DOMContentLoaded", function () {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const orderItemsContainer = document.getElementById("orderItems");
    const totalAmountDisplay = document.getElementById("totalAmount");
    const cartCounter = document.getElementById("cartCounter"); // Cart counter element
    const discountApplied = JSON.parse(localStorage.getItem("discountApplied")) || 0; // Discount percentage
    let totalAmount = JSON.parse(localStorage.getItem("discountedTotal")) || 0; // Retrieve discounted total

    //Function to update cart counter
    function updateCartCounter() {
        let totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCounter) {
            cartCounter.innerText = totalQuantity;
        }
    }

    // Function to update order summary
    function updateOrderSummary() {
        if (cartItems.length === 0) {
            orderItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
            totalAmountDisplay.innerText = "$0.00";
            return;
        }

        orderItemsContainer.innerHTML = "";

        cartItems.forEach(item => {
            let itemTotal = item.price * item.quantity;
            let itemDiv = document.createElement("p");
            itemDiv.innerHTML = `${item.name} (x${item.quantity}) - $${itemTotal.toFixed(2)}`;
            orderItemsContainer.appendChild(itemDiv);
        });

        totalAmountDisplay.innerText = `$${totalAmount.toFixed(2)}`; // Display the stored discounted total
    }

    // Initialize checkout page
    updateCartCounter();
    updateOrderSummary();
});


document.addEventListener("DOMContentLoaded", function () {
    const placeOrderBtn = document.getElementById("placeOrder"); // Ensure button exists

    if (!placeOrderBtn) {
        console.error("Error: 'placeOrder' button not found!");
        return; // Stop execution if button is missing
    }

    placeOrderBtn.addEventListener("click", function () {
        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const address = document.getElementById("address").value.trim();
        const paymentMethod = document.querySelector('input[name="payment"]:checked');

        if (!fullName || !email || !phone || !address || !paymentMethod) {
            alert("Please fill all billing details and select a payment method.");
            return;
        }

        alert(`Order placed successfully!\n
               Name: ${fullName}\n
               Email: ${email}\n
               Phone: ${phone}\n
               Address: ${address}\n
               Payment: ${paymentMethod.value.toUpperCase()}`);

        localStorage.removeItem("cart");  // Clear cart after order is placed
        localStorage.removeItem("discount");  // Clear discount after checkout
        window.location.href = "shop.html"; // Redirect back to shop
    });
});
