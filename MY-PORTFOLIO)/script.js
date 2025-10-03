// ===== INITIALIZATION =====
document.addEventListener("DOMContentLoaded", function() {
  // Initialize gallery
  generateGallery();
  
  // Smooth scroll for hero button
  const heroBtn = document.querySelector(".hero-btn");
  
  heroBtn.addEventListener("click", function(e) {
    e.preventDefault();
    
    // Add click animation
    heroBtn.classList.add("clicked");
    setTimeout(() => heroBtn.classList.remove("clicked"), 200);
    
    // Show portfolio and scroll
    const portfolio = document.getElementById("portfolio");
    portfolio.style.display = "block";
    portfolio.scrollIntoView({ behavior: "smooth" });
    
    // Show all items initially
    setTimeout(() => filterSelection("all"), 300);
  });
  
  // Filter button active state management
  const buttons = document.querySelectorAll(".filter-buttons button");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      // Extract category from onclick attribute
      const onclickAttr = btn.getAttribute("onclick");
      const category = onclickAttr.match(/'(.+)'/)[1];
      updateCategoryText(category);
    });
  });
  // Sends form data to WhatsApp
const whatsappMessage = `New inquiry from ${formData.name}...`;
window.open(`https://wa.me/YOUR_NUMBER?text=${whatsappMessage}`, '_blank');
  // Initialize Intersection Observer for animations
  initIntersectionObserver();
  
  // Initialize navbar scroll behavior
  initNavbarScroll();
  
  // Preload critical images
  preloadImages();
});

// ===== FILTER FUNCTIONALITY =====
function filterSelection(category) {
  const items = document.getElementsByClassName("gallery-item");
  
  // Add staggered animation
  let delay = 0;
  for (let i = 0; i < items.length; i++) {
    if (category === "all") {
      setTimeout(() => {
        items[i].classList.add("visible");
      }, delay);
      delay += 50;
    } else {
      if (items[i].classList.contains(category)) {
        setTimeout(() => {
          items[i].classList.add("visible");
        }, delay);
        delay += 50;
      } else {
        items[i].classList.remove("visible");
      }
    }
  }
}

// ===== CATEGORY TEXT UPDATE =====
function updateCategoryText(category) {
  const categoryText = document.getElementById("category-text");
  const textMap = {
    "logo": "Professional Logo Design - Starting from R300",
    "flyer": "Eye-catching Flyer Design - Starting from R280",
    "social": "Social Media Graphics - Starting from R250",
    "all": "Browse our complete portfolio collection"
  };
  
  categoryText.style.animation = "none";
  setTimeout(() => {
    categoryText.textContent = textMap[category] || "";
    categoryText.style.animation = "slideIn 0.3s ease";
  }, 10);
}

// ===== LIGHTBOX FUNCTIONS =====
function openLightbox(src) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const downloadBtn = document.getElementById("lightbox-download");
  
  lightbox.style.display = "flex";
  lightboxImg.src = src;
  downloadBtn.href = src;
  
  // Add event listeners for closing
  setupLightboxClosing();
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  lightbox.style.display = "none";
  
  // Remove event listeners
  document.removeEventListener("keydown", handleEscapeKey);
}

function setupLightboxClosing() {
  const lightbox = document.getElementById("lightbox");
  
  // Close on background click
  lightbox.addEventListener("click", function(e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
  
  // Close on ESC key
  document.addEventListener("keydown", handleEscapeKey);
}

function handleEscapeKey(e) {
  if (e.key === "Escape") {
    closeLightbox();
  }
}

// ===== GALLERY GENERATION =====
function generateGallery() {
  const gallery = document.querySelector(".gallery");
  
  // Helper function to create gallery items
  function createGalleryItem(category, filename, title) {
    const div = document.createElement("div");
    div.className = `gallery-item ${category}`;
    
    const img = document.createElement("img");
    img.src = filename;
    img.alt = title || `${category} design`;
    img.loading = "lazy"; // Lazy loading for performance
    
    // Add error handling for missing images
    img.onerror = function() {
      this.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='20' fill='%23999' text-anchor='middle' dy='.3em'%3E${title}%3C/text%3E%3C/svg%3E`;
    };
    
    img.addEventListener("click", () => openLightbox(img.src));
    
    div.appendChild(img);
    gallery.appendChild(div);
  }
  
  // Generate Logo items (15 items)
  for (let i = 1; i <= 15; i++) {
    createGalleryItem("logo", `images/logo${i}.jpeg`, `Logo Design ${i}`);
  }
  
  // Generate Flyer items (9 items)
  for (let i = 1; i <= 9; i++) {
    createGalleryItem("flyer", `images/flyer${i}.jpeg`, `Flyer Design ${i}`);
  }
  
  // Generate Social Media items (19 items)
  for (let i = 1; i <= 19; i++) {
    createGalleryItem("social", `images/social${i}.jpeg`, `Social Media Design ${i}`);
  }
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
function initIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "fadeInUp 0.6s ease forwards";
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  // Observe gallery items when they're created
  setTimeout(() => {
    document.querySelectorAll('.gallery-item').forEach(item => {
      observer.observe(item);
    });
  }, 100);
}

// ===== NAVBAR HIDE/SHOW ON SCROLL =====
function initNavbarScroll() {
  let lastScroll = 0;
  const navbar = document.querySelector('.navbar');
  
  // Debounce scroll event for better performance
  let scrollTimeout;
  
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll <= 0) {
        navbar.style.transform = 'translateY(0)';
      } else if (currentScroll > lastScroll && currentScroll > 80) {
        // Scrolling down & past hero area
        navbar.style.transform = 'translateY(-100%)';
      } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
      }
      
      lastScroll = currentScroll;
    }, 10);
  });
}

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ===== PRELOAD CRITICAL IMAGES =====
function preloadImages() {
  // Preload first few images for better performance
  const imagesToPreload = [
    'images/logo1.jpeg',
    'images/logo2.jpeg',
    'images/logo3.jpeg',
    'images/flyer1.jpeg',
    'images/social1.jpeg'
  ];
  
  imagesToPreload.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

// ===== SMOOTH SCROLL FOR ALL INTERNAL LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== ADD LOADING STATE =====
function showLoading() {
  const loadingDiv = document.createElement('div');
  loadingDiv.className = 'loading';
  loadingDiv.id = 'loading-indicator';
  document.body.appendChild(loadingDiv);
}

function hideLoading() {
  const loadingDiv = document.getElementById('loading-indicator');
  if (loadingDiv) {
    loadingDiv.remove();
  }
}

// ===== TOUCH SUPPORT FOR MOBILE =====
let touchStartX = 0;
let touchEndX = 0;

function handleTouchStart(e) {
  touchStartX = e.changedTouches[0].screenX;
}

function handleTouchEnd(e) {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}

function handleSwipe() {
  const lightbox = document.getElementById("lightbox");
  if (lightbox.style.display === "flex") {
    if (touchEndX < touchStartX - 50) {
      // Swiped left - could navigate to next image
      console.log("Swiped left");
    }
    if (touchEndX > touchStartX + 50) {
      // Swiped right - could navigate to previous image
      console.log("Swiped right");
    }
  }
}

// Add touch listeners to lightbox
document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.getElementById('lightbox');
  lightbox.addEventListener('touchstart', handleTouchStart);
  lightbox.addEventListener('touchend', handleTouchEnd);
});

// ===== ANALYTICS TRACKING (Optional) =====
function trackEvent(category, action, label) {
  // If you have Google Analytics or other tracking
  if (typeof gtag !== 'undefined') {
    gtag('event', action, {
      'event_category': category,
      'event_label': label
    });
  }
}

// ===== LAZY LOAD BACKGROUND IMAGES =====
function lazyLoadBackgroundImages() {
  const elements = document.querySelectorAll('[data-bg]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const bgImage = element.getAttribute('data-bg');
        element.style.backgroundImage = `url(${bgImage})`;
        observer.unobserve(element);
      }
    });
  });
  
  elements.forEach(element => {
    imageObserver.observe(element);
  });
}

// ===== BROWSER COMPATIBILITY CHECK =====
function checkBrowserSupport() {
  const features = {
    'CSS Grid': CSS.supports('display', 'grid'),
    'CSS Variables': CSS.supports('--test', '0'),
    'Backdrop Filter': CSS.supports('backdrop-filter', 'blur(10px)'),
    'Intersection Observer': 'IntersectionObserver' in window
  };
  
  const unsupported = Object.entries(features)
    .filter(([feature, supported]) => !supported)
    .map(([feature]) => feature);
  
  if (unsupported.length > 0) {
    console.warn('Your browser does not support:', unsupported.join(', '));
  }
}

// Run browser check on load
checkBrowserSupport();

// ===== MEMORY CLEANUP =====
window.addEventListener('beforeunload', () => {
  // Clean up event listeners and observers
  document.removeEventListener("keydown", handleEscapeKey);
  
  // Clear any timers
  clearTimeout(scrollTimeout);
});

// Export functions for potential testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    filterSelection,
    openLightbox,
    closeLightbox,
    updateCategoryText,
    preloadImages
  };
}