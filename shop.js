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

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".banner").style.opacity = "1";
});

// Product Data start here and we can add more products here
const products = [
    { 
        id: 1, 
        name: "Blue Smart Fit Suit For Men", 
        category: "Business suits",  
        price: 199, 
        popularity: 90, 
        rating: 4.5, 
        image: "images/products images/Categories Section/suits/p1.png", 
        hoverImage: "images/products images/Categories Section/suits/p2.png",
    },
    { id: 2, name: "Dark Blue Smart Fit Denim", category: "Jeans", price: 29, popularity: 85, rating: 4.7, image: "images/products images/Categories Section/jeans/P2.jpg", hoverImage: "images/products images/Categories Section/jeans/P3.jpg" },

    { id: 3, name: "Pak Signature Stripe Sweatshirt", category: "Hoodies", price: 110, popularity: 95, rating: 4.3, image: "images/products images/Categories Section/hoodies/p1.webp", hoverImage: "images/products images/Categories Section/hoodies/p2.webp" },

    { id: 4, name: "Men's sports sneakers", category: "Sneakers", price: 150, popularity: 80, rating: 4.6, image: "images/products images/Categories Section/sneakers/p1.png", hoverImage: "images/products images/Categories Section/sneakers/p2.png" },
    
    { id: 5, name: "Black Orbit 7.0", category: "Joggers", price: 60, popularity: 88, rating: 4.2, image: "images/products images/Categories Section/joggers/p1.jpg", hoverImage: "images/products images/Categories Section/joggers/p2.jpg" },

    { id: 6, name: "Top Level Baseball Cap", category: "Caps", price: 120, popularity: 92, rating: 4.8, image: "images/products images/Categories Section/caps/P1.jpg", hoverImage: "images/products images/Categories Section/caps/p2.png" },

    { id: 7, name: "Life Is A Trip Printed Hoodie", category: "Hoodies", price: 25, popularity: 99, rating: 4.7, image: "images/products images/Categories Section/hoodies/p4.png", hoverImage: "images/products images/Categories Section/hoodies/p5.png" },

    { id: 8, name: "Stone Smart Fit Denim", category: "Jeans", price: 10, popularity: 80, rating: 4.5, image: "images/products images/Categories Section/jeans/p4.jpg", hoverImage: "images/products images/Categories Section/jeans/p5.jpg" },
    
    { id: 9, name: "Khaki Texture Classic Fit Suit", category: "Business suits", price: 199, popularity: 80, rating: 4.5, image: "images/products images/Categories Section/suits/p3.png", hoverImage: "images/products images/Categories Section/suits/p4.png" },
];



// Get cart from local storage or initialize empty cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];


// Function to Display Products and Update Count
function displayProducts(filteredProducts) {
    const productGrid = document.getElementById("productGrid");
    const productCount = document.getElementById("productCount");
    
    productGrid.innerHTML = ""; // Clear previous products

    // Update the product count
    productCount.textContent = `Total Products: ${filteredProducts.length}`;

    filteredProducts.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" 
                 class="product-img"
                 onmouseover="this.src='${product.hoverImage}'" 
                 onmouseout="this.src='${product.image}'">
            <h3>${product.name}</h3>
            <p class="price">$${product.price}</p>
            <p class="rating">⭐ ${product.rating}</p>
            <p class="category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
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

    showNotification();

    showCartPreview();
}

// Function to Show Notification
function showNotification() {
    const notification = document.getElementById("cart-notification");

    if (!notification) {
        console.error("Notification element not found!");
        return;
    }

    notification.style.display = "block";
    notification.style.opacity = "1";

    setTimeout(() => {
        notification.style.opacity = "0";
        setTimeout(() => {
            notification.style.display = "none";
        }, 500); // Fade out
    }, 1000);
}

// Function to Show the Cart Preview
function showCartPreview() {
    const cartPopup = document.getElementById("cartPopup");
    const cartItemsPreview = document.getElementById("cartItemsPreview");

    if (!cartPopup || !cartItemsPreview) {
        console.error("Cart preview elements not found!");
        return;
    }

    cartItemsPreview.innerHTML = `
        <button class="close-cart" onclick="closeCartPreview()">✖</button>
    `;

    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;

        cartItemsPreview.innerHTML += `
            <div class="cart-popup-item">
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <p>${item.name}</p>
                    <p>$${item.price} x ${item.quantity}</p>
                </div>
            </div>
        `;
    });

    cartItemsPreview.innerHTML += `
        <div class="cart-total">
            <strong>Total: $${totalPrice.toFixed(2)}</strong>
        </div>
    `;

    cartPopup.style.display = "block";

    // Auto-hide after 3 seconds (unless hovered)
    setTimeout(() => {
        if (!cartPopup.matches(":hover")) {
            cartPopup.style.display = "none";
        }
    }, 3000);
}

// Function to Close the Cart Preview
function closeCartPreview() {
    document.getElementById("cartPopup").style.display = "none";
}

// Close Cart Preview when clicking outside
document.addEventListener("click", function (event) {
    const cartPopup = document.getElementById("cartPopup");
    if (cartPopup && !cartPopup.contains(event.target) && !event.target.classList.contains("add-to-cart")) {
        cartPopup.style.display = "none";
    }
});


// Update Cart Count in Header
function updateCartCount() {
    document.getElementById("cartCount").textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

// searchBar Functionality here 
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchBar");
    const productsSection = document.querySelector(".product-section"); 
    const noResultsMessage = document.createElement("div"); 

    if (!searchInput || !productsSection) {
        console.error("Search bar or product section not found in the DOM!");
        return;
    }

    // ✅ Style for no results message
    noResultsMessage.id = "noResultsMessage";
    noResultsMessage.textContent = "No products found!";
    noResultsMessage.style.display = "none";
    noResultsMessage.style.textAlign = "center";
    noResultsMessage.style.padding = "20px";
    noResultsMessage.style.fontSize = "1.5rem";
    noResultsMessage.style.fontWeight = "bold";
    noResultsMessage.style.opacity = "0";
    noResultsMessage.style.transition = "opacity 1s ease-in-out";
    productsSection.appendChild(noResultsMessage); // Add message to products section

    searchInput.addEventListener("input", function () {
        const query = this.value.toLowerCase().trim();

        if (query === "") {
            displayProducts(products);
            hideNoResultsMessage();
            return;
        }

        const filteredProducts = products.filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.category.toLowerCase().includes(query)
        );

        if (filteredProducts.length === 0) {
            displayNoResultsMessage();
        } else {
            hideNoResultsMessage();
        }

        displayProducts(filteredProducts);
    });

    searchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            productsSection.scrollIntoView({ behavior: "smooth" });
            this.blur();
        }
    });

    // ✅ Function to show "No products found" message with animation
    function displayNoResultsMessage() {
        noResultsMessage.style.display = "block";
        setTimeout(() => {
            noResultsMessage.style.opacity = "1";
        }, 100);
    }

    // ✅ Function to hide message
    function hideNoResultsMessage() {
        noResultsMessage.style.opacity = "0";
        setTimeout(() => {
            noResultsMessage.style.display = "none";
        }, 1000);
    }
});


// Filtering & Sorting Functionality
document.addEventListener("DOMContentLoaded", () => {
    const categoryFilters = document.querySelectorAll(".categoryFilter");
    const ratingFilters = document.querySelectorAll(".ratingFilter");
    const priceRange = document.getElementById("priceRange");
    const priceValue = document.getElementById("priceValue");

    function filterProducts() {
        let selectedCategories = [...categoryFilters].filter(cb => cb.checked).map(cb => cb.value);
        let selectedRatings = [...ratingFilters].filter(cb => cb.checked).map(cb => parseFloat(cb.value));
        let maxPrice = parseFloat(priceRange.value);

        let filteredProducts = products.filter(product => {
            let matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
            let matchesRating = selectedRatings.length === 0 || selectedRatings.some(rating => product.rating >= rating);
            let matchesPrice = product.price <= maxPrice;

            return matchesCategory && matchesRating && matchesPrice;
        });

        displayProducts(filteredProducts);
    }

    // Category filter event
    categoryFilters.forEach(cb => cb.addEventListener("change", filterProducts));

    // Rating filter event
    ratingFilters.forEach(cb => cb.addEventListener("change", filterProducts));

    // Price range event
    priceRange.addEventListener("input", () => {
        priceValue.textContent = priceRange.value;
        filterProducts();
    });

    // Initial Display
    displayProducts(products);
});


displayProducts(products);

// Product Data section ended here

// Pagination section start here
let currentPage = 1;
const itemsPerPage = 6; // Show 6 products per page
let filteredProducts = []; // Store filtered products

// Function to Display Products with Pagination
function displayProductsPaginated(productsToDisplay) {
    const productGrid = document.getElementById("productGrid");
    const totalPages = Math.ceil(productsToDisplay.length / itemsPerPage);
    const productCount = document.getElementById("productCount"); // Get total item counter

    // Ensure currentPage is within bounds
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    // Slice products for current page
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedProducts = productsToDisplay.slice(start, end);

    // Update product grid
    productGrid.innerHTML = "";
    paginatedProducts.forEach(product => {
        productGrid.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-img"
                    onmouseover="this.src='${product.hoverImage}'" 
                    onmouseout="this.src='${product.image}'">
                <h3>${product.name}</h3>
                <p class="price">$${product.price}</p>
                <p class="rating">⭐ ${product.rating}</p>
                <p class="category">${product.category}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
    });

    // ✅ Show the number of currently displayed items
    productCount.textContent = `Showing ${paginatedProducts.length} of ${productsToDisplay.length} products`;

    // Update pagination controls
    document.getElementById("pageNumber").textContent = currentPage;
    document.getElementById("prevPage").disabled = (currentPage === 1);
    document.getElementById("nextPage").disabled = (productsToDisplay.length <= itemsPerPage || currentPage === totalPages);

    attachCartEventListeners(); // Ensure buttons work after pagination change
}

// Function to Handle Next Page
document.getElementById("nextPage").addEventListener("click", function () {
    currentPage++;
    displayProductsPaginated(filteredProducts.length ? filteredProducts : products);
});

// Function to Handle Previous Page
document.getElementById("prevPage").addEventListener("click", function () {
    currentPage--;
    displayProductsPaginated(filteredProducts.length ? filteredProducts : products);
});

// Ensure "Add to Cart" works after pagination
function attachCartEventListeners() {
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const productId = parseInt(this.getAttribute("onclick").match(/\d+/)[0]);
            addToCart(productId);
        });
    });
}

// ✅ Function to Handle Category Filter
document.getElementById("categoryFilter").addEventListener("change", function () {
    const selectedCategory = this.value;
    filteredProducts = selectedCategory === "all" ? products : products.filter(p => p.category === selectedCategory);
    currentPage = 1; // Reset to first page after filtering
    displayProductsPaginated(filteredProducts);
});

// ✅ Function to Handle Sorting
document.getElementById("sortOptions").addEventListener("change", function () {
    const sortBy = this.value;
    let sortedProducts = filteredProducts.length ? [...filteredProducts] : [...products];

    if (sortBy === "price-low") {
        sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
        sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === "popularity") {
        sortedProducts.sort((a, b) => b.popularity - a.popularity);
    } else if (sortBy === "rating") {
        sortedProducts.sort((a, b) => b.rating - a.rating);
    }

    currentPage = 1; // Reset to first page after sorting
    displayProductsPaginated(sortedProducts);
});

// ✅ Ensure Correct Initial Load
displayProductsPaginated(products);

