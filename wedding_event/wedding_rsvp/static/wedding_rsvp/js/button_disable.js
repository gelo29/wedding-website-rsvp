// button disable when confirm guest input is empty
document.addEventListener("DOMContentLoaded", function () {
  const confirm_guest_input = document.getElementById("confirm-guest-input");
  const confirm_guest_btn = document.getElementById("confirm-guest-btn");

  function toggleBtn() {
    const hasValue = confirm_guest_input.value.trim().length > 0;
    confirm_guest_btn.disabled = !hasValue;
  }
  toggleBtn();
  confirm_guest_input.addEventListener("input", toggleBtn);
});
