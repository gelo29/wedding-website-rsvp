document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("section.page-trans").forEach((section) => {
    setTimeout(() => {
      section.classList.add("active");
    }, 50);
  });
});
document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", (e) => {
    if (
      link.hostname === window.location.hostname &&
      link.getAttribute("target") !== "_blank"
    ) {
      e.preventDefault();
      document.querySelectorAll("section.page-trans").forEach((section) => {
        section.classList.remove("active");
      });
      setTimeout(() => {
        window.location = link.href;
      }, 600);
    }
  });
});
