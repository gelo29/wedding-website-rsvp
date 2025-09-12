document.addEventListener("DOMContentLoaded", () => {
  // Initial activation (fade in when page loads)
  document.querySelectorAll("section.page-trans").forEach((section) => {
    setTimeout(() => {
      section.classList.add("active");
    }, 50);
  });

  // Normal link navigation with transition
  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (e) => {
      const isInternal =
        link.hostname === window.location.hostname &&
        link.getAttribute("target") !== "_blank" &&
        !link.hasAttribute("hx-get"); // skip HTMX links

      if (isInternal) {
        e.preventDefault();
        document.querySelectorAll("section.page-trans").forEach((section) => {
          section.classList.remove("active"); // fade out
        });
        setTimeout(() => {
          window.location = link.href; // then navigate
        }, 600); // match your CSS transition time
      }
    });
  });

  // HTMX: fade out before request
  document.body.addEventListener("htmx:beforeRequest", () => {
    document.querySelectorAll("section.page-trans").forEach((section) => {
      section.classList.remove("active"); // fade out
    });
  });

  // HTMX: fade in after swap
  document.body.addEventListener("htmx:afterSwap", (e) => {
    const newSections = e.target.querySelectorAll("section.page-trans");
    newSections.forEach((section) => {
      setTimeout(() => {
        section.classList.add("active"); // fade in
      }, 50);
    });
  });
});
