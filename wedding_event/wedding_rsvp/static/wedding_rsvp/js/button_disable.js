function initConfirmGuestForm(root = document) {
  const confirm_guest_input = root.querySelector("#confirm-guest-input");
  const confirm_guest_btn = root.querySelector("#confirm-guest-btn");

  if (
    confirm_guest_input &&
    confirm_guest_btn &&
    !confirm_guest_input.dataset.listenerAttached
  ) {
    function toggleBtn() {
      const hasValue = confirm_guest_input.value.trim().length > 0;
      confirm_guest_btn.disabled = !hasValue;
    }

    toggleBtn();
    confirm_guest_input.addEventListener("input", toggleBtn);
    confirm_guest_input.dataset.listenerAttached = "true"; // prevent double binding
  }
}

// First page load
document.addEventListener("DOMContentLoaded", () => {
  initConfirmGuestForm();
});

// When HTMX swaps content
document.body.addEventListener("htmx:afterSettle", (e) => {
  initConfirmGuestForm(e.target);
});
