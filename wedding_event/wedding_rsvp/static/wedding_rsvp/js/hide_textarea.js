document.addEventListener("DOMContentLoaded", function () {
  const radios = document.querySelectorAll("input[name='guest_reply']");
  const messageTextArea = document.getElementById("id_reason_msg");
  const reason_paragraph = document.getElementById("reason-para-id");
  const rsvp_wrapper = document.getElementById("rsvp-wrapper-id");

  function toggleMessageTextArea() {
    const selected = document.querySelector(
      "input[name='guest_reply']:checked"
    );
    if (selected && selected.value === "False") {
      messageTextArea.style.display = "block";
      messageTextArea.setAttribute("required", "required");
      reason_paragraph.style.display = "block";
      rsvp_wrapper.style.marginTop = "60px";
      rsvp_wrapper.style.marginBottom = "40px";
    } else {
      messageTextArea.style.display = "none";
      messageTextArea.removeAttribute("required");
      reason_paragraph.style.display = "none";
      messageTextArea.value = "";
      rsvp_wrapper.style.marginTop = "0";
      rsvp_wrapper.style.marginBottom = "0";
    }
  }
  toggleMessageTextArea();

  radios.forEach((radio) => {
    radio.addEventListener("change", toggleMessageTextArea);
  });
});
