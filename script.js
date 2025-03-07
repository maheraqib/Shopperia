
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
    { name: "Sky Check Classic Fit Shirt", price: "$20", image: "images/products images/p1.jpg" },
    { name: "Navy Printed Tailored Smart Fit Shirt", price: "$25", image: "images/products images/p2.jpg" },
    { name: "Yellow Stripe Tailored Smart Fit Shirt", price: "$20", image: "images/products images/p3.jpg" },
    { name: "Maroon Stripe Classic Fit Shirt", price: "$40", image: "images/products images/p4.jpg" },
    { name: "Green Check Classic Fit Shirt", price: "$30", image: "images/products images/p5.jpg" },
    { name: "White Printed Band Collar T-shirt", price: "$15", image: "images/products images/p6.jpg" },
];

const productGrid = document.getElementById("productGrid");

function displayProducts() {
    productGrid.innerHTML = ""; // Clear previous content
    products.forEach(product => {
        productGrid.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-name">${product.name}</div>
                <div class="product-price">${product.price}</div>
                <button class="add-to-cart">Add to Cart</button>
            </div>
        `;
    });
}

displayProducts();

// Categories Section start here 

const categories = [
    { name: "Business suits", image: "images/products images/Categories Section/suits/p1.png" },
    { name: "Jeans", image: "images/products images/Categories Section/jeans/p1.png" },
    { name: "Hoodies", image: "images/products images/Categories Section/hoodies/p3.png" },
    { name: "Sneakers", image: "images/products images/Categories Section/sneakers/p1.png" },
    { name: "Joggers", image: "images/products images/Categories Section/p5.png" },
    { name: "Caps", image: "images/products images/Categories Section/P6.jpg" }
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

// Sample Prod

// Function to Display Products

