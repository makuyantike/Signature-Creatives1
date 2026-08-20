// ===== INITIALIZATION =====
document.addEventListener("DOMContentLoaded", function() {
  generateGallery();
  filterSelection("all");
  
  // Smooth scroll for hero button
  const heroBtn = document.querySelector(".hero-btn");
  if (heroBtn) {
    heroBtn.addEventListener("click", function(e) {
      e.preventDefault();
      heroBtn.classList.add("clicked");
      setTimeout(() => heroBtn.classList.remove("clicked"), 200);
      
      const portfolio = document.getElementById("portfolio");
      if (portfolio) {
        portfolio.style.display = "block";
        portfolio.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setTimeout(() => filterSelection("all"), 300);
    });
  }
  
  // Filter button active state management
  const buttons = document.querySelectorAll(".filter-buttons button");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      const onclickAttr = btn.getAttribute("onclick");
      if (onclickAttr) {
        const match = onclickAttr.match(/'(.+)'/);
        if (match) {
          updateCategoryText(match[1]);
        }
      }
    });
  });

  // Setup Lightbox Click & Key listeners once on page load
  setupLightboxListeners();

  initIntersectionObserver();
  initNavbarScroll();
  preloadImages();
});

// ===== FILTER FUNCTIONALITY =====
function filterSelection(category) {
  const items = document.getElementsByClassName("gallery-item");
  let delay = 0;
  
  for (let i = 0; i < items.length; i++) {
    if (category === "all") {
      setTimeout(() => {
        items[i].classList.add("visible");
      }, delay);
      delay += 30;
    } else {
      if (items[i].classList.contains(category)) {
        setTimeout(() => {
          items[i].classList.add("visible");
        }, delay);
        delay += 30;
      } else {
        items[i].classList.remove("visible");
      }
    }
  }
}

// ===== CATEGORY TEXT UPDATE =====
function updateCategoryText(category) {
  const categoryText = document.getElementById("category-text");
  if (!categoryText) return;
  
  const textMap = {
    "all": "Browse our complete portfolio collection",
    "logo": "Professional Logo Design - Starting from R300",
    "social-flyer": "Vibrant Social Media Flyers - Starting from R250",
    "brand-identity": "Full Brand Identity Packages - Starting from R2500",
    "business-flyer": "Corporate Business Flyers - Starting from R280",
    "menu": "Elegant Restaurant Menus - Starting from R350",
    "business-card": "Professional Business Cards - Starting from R200",
    "church-flyer": "Graceful Church Flyers - Starting from R280",
    "song-art": "Creative Song Art Work - Starting from R2800",
    "billboard": "High-Impact Billboard Design - Starting from R280"
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
  
  if (lightbox && lightboxImg) {
    lightboxImg.src = src;
    lightbox.classList.add("active");
    lightbox.style.display = "flex";
    document.body.style.overflow = "hidden";
  }
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    lightbox.classList.remove("active");
    lightbox.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

function setupLightboxListeners() {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  // Close when clicking anywhere outside the actual image
  lightbox.addEventListener("click", function(e) {
    if (e.target !== document.getElementById("lightbox-img")) {
      closeLightbox();
    }
  });

  // Close on Escape key
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
      closeLightbox();
    }
  });
}

// ===== GALLERY GENERATION =====
function generateGallery() {
  const gallery = document.querySelector(".gallery");
  if (!gallery) return;
  
  gallery.innerHTML = "";
  
  function createGalleryItem(category, filename, title) {
    const div = document.createElement("div");
    div.className = `gallery-item ${category}`;
    
    const img = document.createElement("img");
    img.src = filename;
    img.alt = title || `${category} design`;
    img.loading = "lazy";
    
    img.onerror = function() {
      this.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23213c4d'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='%23fb802c' text-anchor='middle' dy='.3em'%3E${title}%3C/text%3E%3C/svg%3E`;
    };
    
    // Open image directly when clicked
    img.addEventListener("click", (e) => {
      e.stopPropagation();
      openLightbox(img.src);
    });
    
    div.appendChild(img);
    gallery.appendChild(div);
  }
  
  // 1. LOGOS
  for (let i = 1; i <= 13; i++) {
    createGalleryItem("logo", `images/logo${i}.jpeg`, `Logo Design ${i}`);
  }
  
  // 2. SOCIAL MEDIA FLYERS
  for (let i = 1; i <= 13; i++) {
    createGalleryItem("social-flyer", `images/socialflyer${i}.jpeg`, `Social Flyer ${i}`);
  }

  // 3. BRAND IDENTITY
  for (let i = 1; i <= 3; i++) {
    createGalleryItem("brand-identity", `images/brandidentity${i}.jpeg`, `Brand Identity ${i}`);
  }

  // 4. BUSINESS FLYERS
  for (let i = 1; i <= 6; i++) {
    createGalleryItem("business-flyer", `images/bflyer${i}.jpeg`, `Business Flyer ${i}`);
  }

  // 5. MENUS
  for (let i = 1; i <= 3; i++) {
    createGalleryItem("menu", `images/menu${i}.jpeg`, `Menu Design ${i}`);
  }
  
  // 6. BUSINESS CARDS
  for (let i = 1; i <= 3; i++) {
    createGalleryItem("business-card", `images/businesscard${i}.jpeg`, `Business Card ${i}`);
  }

  // 7. CHURCH FLYERS
  createGalleryItem("church-flyer", "images/churchflyer1.jpeg", "Church Flyer 1");
  
  // 8. SONG ARTWORK
  for (let i = 1; i <= 4; i++) {
    createGalleryItem("song-art", `images/songart${i}.jpeg`, `Song Artwork ${i}`);
  }
}

// ===== ANIMATIONS & SCROLL UTILITIES =====
function initIntersectionObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "fadeInUp 0.6s ease forwards";
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  setTimeout(() => {
    document.querySelectorAll('.gallery-item').forEach(item => observer.observe(item));
  }, 100);
}

function initNavbarScroll() {
  let lastScroll = 0;
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll <= 0) {
      navbar.style.transform = 'translateY(0)';
    } else if (currentScroll > lastScroll && currentScroll > 80) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
  });
}

function preloadImages() {
  ['images/logo1.jpeg', 'images/socialflyer1.jpeg', 'images/brandidentity1.jpeg'].forEach(src => {
    const img = new Image();
    img.src = src;
  });
}