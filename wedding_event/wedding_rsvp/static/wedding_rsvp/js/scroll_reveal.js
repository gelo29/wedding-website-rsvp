document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".reveal-section");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          entry.target.computedStyleMap.transitionDelay = "0.2s";
        } else {
          entry.target.classList.remove("show");
        }
      });
    },
    { threshold: 0.2 }
  );
  sections.forEach((section) => observer.observe(section));
});
