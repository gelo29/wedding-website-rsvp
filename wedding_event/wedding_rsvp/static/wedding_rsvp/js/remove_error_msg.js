// remove error message
document.addEventListener("DOMContentLoaded", function () {
  const code_input = document.getElementById("confirm-guest-input");
  const errorbox = document.getElementById("error-box");
  if (code_input && errorbox) {
    code_input.addEventListener("focus", function () {
      errorbox.style.display = "none";
    });
  }
});
