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

// button disable when confirm guest input is empty
