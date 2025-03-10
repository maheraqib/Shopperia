
window.addEventListener("scroll", function () {
    let header = document.querySelector(".sticky-header");
    
    if (window.scrollY > 50) {
        header.style.background = "#222";
        header.style.padding = "10px 15px"; // Reduce padding for a compact look
        // header.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)"; // Add shadow
    } else {
        header.style.background = "#333";
        header.style.padding = "15px 20px"; // Reset padding
        header.style.boxShadow = "none"; // Remove shadow
    }
});


// Adding fade-in effect on page load for navigation items
document.addEventListener('DOMContentLoaded', () => {
    let navItems = document.querySelectorAll('.nav-menu li');
    navItems.forEach((item, index) => {
        item.style.animationDelay = `${0.3 + index * 0.1}s`;
    });
});

const images = [
    "images/banner1.avif", 
    "images/banner2.avif", 
    "images/banner3.jpg"  
];

let currentIndex = 0;
const banner = document.getElementById("banner");

function changeBackground() {
    banner.style.backgroundImage = `url(${images[currentIndex]})`;
    banner.style.backgroundSize = "cover";  // Ensures image covers the banner
    banner.style.backgroundPosition = "center"; // Keeps the focus in the center
    banner.style.transition = "background-image 2s ease-in-out"; // Smooth transition effect

    currentIndex = (currentIndex + 1) % images.length; // Loop back to first image
}

// Set the initial background and start the interval
changeBackground(1);
setInterval(changeBackground, 4000); // Change image every 5 seconds

// Make it responsive for mobile
window.addEventListener("resize", () => {
    if (window.innerWidth < 768) {
        banner.style.backgroundSize = "contain"; // Adjusts for smaller screens
    } else {
        banner.style.backgroundSize = "cover";
    }
});

// Featured Products section

const products = [
    { id: 1, name: "Sky Check Classic Fit Shirt", price: 20, image: "images/products images/p1.jpg" },
    { id: 2, name: "Navy Printed Tailored Smart Fit Shirt", price: 25, image: "images/products images/p2.jpg" },
    { id: 3, name: "Yellow Stripe Tailored Smart Fit Shirt", price: 39.99, image: "images/products images/p3.jpg" },
    { id: 4, name: "Maroon Stripe Classic Fit Shirt", price: 30.99, image: "images/products images/p4.jpg" },
    { id: 5, name: "Green Check Classic Fit Shirt", price: 39.99, image: "images/products images/p5.jpg" },
    { id: 6, name: "White Printed Band Collar T-shirt", price: 14.99, image: "images/products images/p6.jpg" },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to Display Products
function displayProducts() {
    const productGrid = document.getElementById("productGrid");
    productGrid.innerHTML = "";

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: $${product.price.toFixed(2)}</p>
            <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
        `;

        productGrid.appendChild(productCard);
    });

    updateCartCount();
}

// Function to Add Product to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    // updateCart();

    // ✅ Call Notification Function Here
    showNotification();
}

// Function to Show Notification
function showNotification() {
    const notification = document.getElementById("cart-notification");

    if (!notification) {
        console.error("Notification element not found!");
        return;
    }

    // Show notification
    notification.style.display = "block";
    notification.style.opacity = "1";

    // Hide notification after 2 seconds
    setTimeout(() => {
        notification.style.opacity = "0";
        setTimeout(() => {
            notification.style.display = "none";
        }, 500); // Wait for fade out
    }, 1000);
}

// Function to Update Cart Count in Header
function updateCartCount() {
    document.getElementById("cartCount").textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

// Load Products on Page Load
displayProducts();



// Categories Section start here 

const categories = [
    { name: "Business suits", image: "images/products images/Categories Section/suits/p1.png" },
    { name: "Jeans", image: "images/products images/Categories Section/jeans/p1.png" },
    { name: "Hoodies", image: "images/products images/Categories Section/hoodies/p3.png" },
    { name: "Sneakers", image: "images/products images/Categories Section/sneakers/p1.png" },
    { name: "Joggers", image: "images/products images/Categories Section/joggers/p1.jpg" },
    { name: "Caps", image: "images/products images/Categories Section/caps/P1.jpg" }
];

const categoriesGrid = document.getElementById("categoriesGrid");

// Function to display categories
function displayCategories() {
    categoriesGrid.innerHTML = ""; // Clear previous content
    categories.forEach(category => {
        categoriesGrid.innerHTML += `
            <div class="category-card">
                <img src="${category.image}" alt="${category.name}">
                <div class="category-name">${category.name}</div>
            </div>
        `;
    });
}

displayCategories();

// newsletter statr here 

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".newsletter-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form from refreshing the page

        const emailInput = form.querySelector("input");
        const email = emailInput.value.trim();

        if (validateEmail(email)) {
            alert("Thank you for subscribing! 🎉");
            emailInput.value = ""; // Clear input field
        } else {
            alert("Please enter a valid email address.");
        }
    });

    function validateEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }
});

