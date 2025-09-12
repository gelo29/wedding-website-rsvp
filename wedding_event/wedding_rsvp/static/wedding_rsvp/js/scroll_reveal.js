function initRevealObserver(root = document) {
  const sections = root.querySelectorAll(".reveal-section");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          entry.target.style.transitionDelay = "0.2s"; // fixed from computedStyleMap
        } else {
          entry.target.classList.remove("show");
        }
      });
    },
    { threshold: 0.2 }
  );

  sections.forEach((section) => observer.observe(section));
}

document.addEventListener("DOMContentLoaded", () => {
  initRevealObserver();
});

// Re-run when HTMX swaps new content
document.body.addEventListener("htmx:afterSwap", (e) => {
  initRevealObserver(e.target); // only initialize in the swapped-in content
});
