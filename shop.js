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

// Sample Product Data start
const products = [
    { id: 1, name: "Business suits", category: "Business suits", price: 199, popularity: 90, rating: 4.5, image: "images/products images/Categories Section/suits/p1.png", hoverImage: "images/products images/Categories Section/suits/p2.png" },

    { id: 2, name: "Jeans", category: "Jeans", price: 29, popularity: 85, rating: 4.7, image: "images/products images/Categories Section/jeans/P2.jpg", hoverImage: "images/products images/Categories Section/jeans/P3.jpg" },

    { id: 3, name: "Hoodies", category: "Hoodies", price: 110, popularity: 95, rating: 4.3, image: "images/products images/Categories Section/hoodies/p1.webp", hoverImage: "images/products images/Categories Section/hoodies/p2.webp" },

    { id: 4, name: "Sneakers", category: "Sneakers", price: 150, popularity: 80, rating: 4.6, image: "images/products images/Categories Section/sneakers/p1.png", hoverImage: "images/products images/Categories Section/sneakers/p2.png" },
    { id: 5, name: "Joggers", category: "Joggers", price: 60, popularity: 88, rating: 4.2, image: "sneakers.jpg", hoverImage: "headphones-hover.jpg" },
    { id: 6, name: "Caps", category: "Caps", price: 120, popularity: 92, rating: 4.8, image: "watch.jpg", hoverImage: "sneakers-hover.jpg" },
    { id: 7, name: "Hoodies", category: "Hoodies", price: 25, popularity: 99, rating: 4.7, image: "tshirt.jpg", hoverImage: "watch-hover.jpg" },
    { id: 8, name: "Jeans", category: "Jeans", price: 10, popularity: 80, rating: 4.5, image: "laptop.jpg", hoverImage: "watch-hover.jpg" },
    { id: 9, name: "Business suits", category: "Business suits", price: 10, popularity: 80, rating: 4.5, image: "laptop.jpg", hoverImage: "watch-hover.jpg" },

];

// Function to Display Products and Update Count
function displayProducts(filteredProducts) {
    const productGrid = document.getElementById("productGrid");
    const productCount = document.getElementById("productCount");
    
    productGrid.innerHTML = ""; // Clear previous products

    // Update the product count
    productCount.textContent = `Total Products: ${filteredProducts.length}`;

    filteredProducts.forEach(product => {
        productGrid.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" 
                     class="product-img"
                     onmouseover="this.src='${product.hoverImage}'" 
                     onmouseout="this.src='${product.image}'">
                <h3>${product.name}</h3>
                <p class="price">$${product.price}</p>
                <p class="rating">⭐ ${product.rating}</p>
                <p class="category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
                <button class="add-to-cart">Add to Cart</button>
            </div>
        `;
    });
}

// Initial Display of Products
displayProducts(products);

// Filtering & Sorting Functionality
document.getElementById("categoryFilter").addEventListener("change", function() {
    const selectedCategory = this.value;
    let filteredProducts = selectedCategory === "all" ? products : products.filter(p => p.category === selectedCategory);
    displayProducts(filteredProducts);
});

document.getElementById("sortOptions").addEventListener("change", function() {
    let sortedProducts = [...products];
    const sortBy = this.value;

    if (sortBy === "price-low") {
        sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
        sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === "popularity") {
        sortedProducts.sort((a, b) => b.popularity - a.popularity);
    } else if (sortBy === "rating") {
        sortedProducts.sort((a, b) => b.rating - a.rating);
    }

    displayProducts(sortedProducts);
});

// Sample Product Data ended here
