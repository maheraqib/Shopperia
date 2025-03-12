window.addEventListener("scroll", function () {
    let header = document.querySelector(".sticky-header");
    
    if (window.scrollY > 50) {
        header.style.background = "#222";
        header.style.padding = "10px 15px"; // Reduce padding for a compact look
        header.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)"; // Add shadow
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

// Change Main Image in Gallery
function changeImage(imageSrc) {
    document.getElementById("mainImage").src = imageSrc;
}

// Add to Cart
function addToCart() {
    alert("Product added to cart!");
}

// Add to Wishlist
function addToWishlist() {
    alert("Product added to wishlist!");
}

// Add Review
function addReview() {
    const reviewText = document.getElementById("reviewInput").value;
    if (reviewText.trim() === "") return;
    const reviewList = document.getElementById("reviewList");
    const newReview = document.createElement("p");
    newReview.textContent = reviewText;
    reviewList.appendChild(newReview);
    document.getElementById("reviewInput").value = "";
}


const mainImage = document.getElementById("mainImage");
const magnifier = document.createElement("div");
magnifier.classList.add("magnifier");
document.querySelector(".image-container").appendChild(magnifier);

mainImage.addEventListener("mousemove", function (e) {
    const { left, top, width, height } = mainImage.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;

    magnifier.style.backgroundImage = `url(${mainImage.src})`;
    magnifier.style.display = "block";
    magnifier.style.left = `${e.pageX - 200}px`;
    magnifier.style.top = `${e.pageY - 150}px`;
    magnifier.style.backgroundPosition = `${x}% ${y}%`;
});

mainImage.addEventListener("mouseleave", function () {
    magnifier.style.display = "none";
});

function addReview() {
    const reviewText = document.getElementById("reviewInput").value;
    if (reviewText.trim() === "") return;

    const reviewList = document.getElementById("reviewList");
    const newReview = document.createElement("div");
    newReview.classList.add("review-item");

    newReview.innerHTML = `
        <div class="review-avatar">U</div>
        <div class="review-content">
            <div class="review-stars">⭐⭐⭐⭐⭐</div>
            <p>${reviewText}</p>
        </div>
    `;

    reviewList.appendChild(newReview);
    document.getElementById("reviewInput").value = "";

    // Smoothly scroll to the latest review
    newReview.scrollIntoView({ behavior: "smooth" });
}

