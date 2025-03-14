document.addEventListener("DOMContentLoaded", function () {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const orderItemsContainer = document.getElementById("orderItems");
    const totalAmountDisplay = document.getElementById("totalAmount");
    const placeOrderBtn = document.getElementById("placeOrder");
    const cartCounter = document.getElementById("cartCounter"); // Cart counter element
    const discountAmount = JSON.parse(localStorage.getItem("discount")) || 0; // Discount from coupon

    // Function to update cart counter
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

        let totalAmount = 0;
        orderItemsContainer.innerHTML = "";

        cartItems.forEach(item => {
            let itemTotal = item.price * item.quantity;
            totalAmount += itemTotal;

            let itemDiv = document.createElement("p");
            itemDiv.innerHTML = `${item.name} (x${item.quantity}) - $${itemTotal.toFixed(2)}`;
            orderItemsContainer.appendChild(itemDiv);
        });

        if (discountAmount > 0) {
            let discountValue = (totalAmount * discountAmount) / 100;
            totalAmount -= discountValue; // Apply discount
        }

        totalAmountDisplay.innerText = `$${totalAmount.toFixed(2)}`;
    }

    updateCartCounter();
    updateOrderSummary();

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
