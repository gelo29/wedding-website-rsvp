const hamburger = document.getElementById("hamburger");
const sideMenu = document.getElementById("side-menu");
const closeBtn = document.getElementById("close-btn");

// Scroll behavior
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.remove("transparent");
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.add("transparent");
    navbar.classList.remove("scrolled");
  }
});

// Initial state
window.dispatchEvent(new Event("scroll"));

// Open menu
hamburger.addEventListener("click", (e) => {
  e.stopPropagation();
  sideMenu.classList.add("open");
});

// Close menu
closeBtn.addEventListener("click", () => {
  sideMenu.classList.remove("open");
});

// Close when clicking outside
document.addEventListener("click", (e) => {
  if (!sideMenu.contains(e.target) && !hamburger.contains(e.target)) {
    sideMenu.classList.remove("open");
  }
});

// Countdown Timer
const weddingDate = new Date("2025-12-26T00:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours
    .toString()
    .padStart(2, "0");
  document.getElementById("minutes").innerText = minutes
    .toString()
    .padStart(2, "0");
  document.getElementById("seconds").innerText = seconds
    .toString()
    .padStart(2, "0");
}

setInterval(updateCountdown, 1000);
updateCountdown(); // run immediately

const swiper = new Swiper(".gallery-swiper", {
  slidesPerView: 1.2,
  spaceBetween: 20,
  loop: true,
  grabCursor: true,
  centeredSlides: true,
  autoplay: {
    delay: 3000, // 3 seconds
    disableOnInteraction: false,
  },
  breakpoints: {
    640: {
      slidesPerView: 2.2,
    },
    1024: {
      slidesPerView: 3.2,
    },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// Initialize GLightbox
const lightbox = GLightbox({
  selector: ".glightbox",
  touchNavigation: true,
  loop: true,
});

// FAQ
document.querySelectorAll(".faq-question").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("active");
    let answer = btn.nextElementSibling;

    if (btn.classList.contains("active")) {
      answer.style.maxHeight = answer.scrollHeight + "px";
      answer.style.paddingTop = "1rem";
      answer.style.paddingBottom = "1rem";
    } else {
      answer.style.maxHeight = null;
      answer.style.paddingTop = "0";
      answer.style.paddingBottom = "0";
    }
  });
});

// Invitation turn book effect
document.addEventListener("DOMContentLoaded", function () {
  const flipArea = document.querySelector(".flip-area");
  const page = document.querySelector(".page");
  let isFlipping = false;

  flipArea.addEventListener("click", function () {
    if (isFlipping) return;
    isFlipping = true;

    // Create shadow element for bending effect
    const shadow = document.createElement("div");
    shadow.className = "page-shadow";
    page.appendChild(shadow);

    // Animate the flip
    let angle = 0;
    const flipInterval = setInterval(() => {
      angle += 5;

      // Main page rotation
      page.style.transform = `rotateY(-${angle}deg)`;

      // Shadow intensity changes during flip
      if (angle < 90) {
        shadow.style.opacity = angle / 180;
      } else {
        shadow.style.opacity = (180 - angle) / 180;
      }

      // Additional bending effect at peak
      if (angle > 45 && angle < 135) {
        const bendFactor = Math.sin(((angle - 45) * Math.PI) / 90) * 10;
        page.style.transform = `rotateY(-${angle}deg) translateZ(${bendFactor}px)`;
      }

      if (angle >= 180) {
        clearInterval(flipInterval);
        page.style.transform = "rotateY(-180deg)";
        shadow.remove();
        isFlipping = false;

        // Swap front and back after flip
        const front = page.querySelector(".front");
        const back = page.querySelector(".back");
        front.classList.remove("front");
        front.classList.add("back");
        back.classList.remove("back");
        back.classList.add("front");

        // Reset transform for next flip
        setTimeout(() => {
          page.style.transform = "rotateY(0deg)";
        }, 50);
      }
    }, 20);
  });

  // Touch support for mobile devices
  flipArea.addEventListener("touchstart", function (e) {
    e.preventDefault();
    flipArea.click();
  });
});
