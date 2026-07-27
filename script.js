const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const bookBtn = document.getElementById("engineBookBtn");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");

function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function isValidPhone(phone) {
  const phonePattern = /^\+\d{1,3}[\s-]?\d{6,14}$/;
  return phonePattern.test(phone.trim());
}

function checkFields() {
  const nameValid = nameInput.value.trim() !== "";
  const emailValid = isValidEmail(emailInput.value.trim());
  const phoneValid = isValidPhone(phoneInput.value.trim());
  
  nameInput.classList.toggle("invalid", nameInput.value !== "" && !nameValid);
  emailInput.classList.toggle("invalid", emailInput.value !== "" && !emailValid);
  phoneInput.classList.toggle("invalid", phoneInput.value !== "" && !phoneValid);
  
  nameError.textContent = (nameInput.value !== "" && !nameValid) ? "Name is required" : "";
  emailError.textContent = (emailInput.value !== "" && !emailValid) ? "Enter a valid email" : "";
  phoneError.textContent = (phoneInput.value !== "" && !phoneValid) ? "Include country code, e.g. +1 4155551234" : "";
  
  bookBtn.disabled = !(nameValid && emailValid && phoneValid);
}

nameInput.addEventListener("input", checkFields);
emailInput.addEventListener("input", checkFields);
phoneInput.addEventListener("input", checkFields);

const bookingForm = document.getElementById("bookingForm");
const formSuccessMsg = document.getElementById("formSuccessMsg");

bookingForm.addEventListener("submit", function(e) {
  e.preventDefault();
  
  fetch(bookingForm.action, {
      method: "POST",
      body: new FormData(bookingForm),
      headers: { "Accept": "application/json" }
    })
    .then((response) => {
      if (response.ok) {
        bookingForm.reset();
        bookBtn.disabled = true;
        formSuccessMsg.textContent = "Thanks! We've got your info and will be in touch soon.";
        formSuccessMsg.classList.add("visible");
      } else {
        formSuccessMsg.textContent = "Something went wrong. Please try again.";
        formSuccessMsg.classList.add("visible");
      }
    })
    .catch(() => {
      formSuccessMsg.textContent = "Something went wrong. Please try again.";
      formSuccessMsg.classList.add("visible");
    });
});


const headerBookBtn = document.querySelector(".site-header .book-btn");
const otherBookButtons = document.querySelectorAll(".lesson-btn");

const observer = new IntersectionObserver((entries) => {
  const anyVisible = entries.some((entry) => entry.isIntersecting);
  headerBookBtn.style.opacity = anyVisible ? "0" : "1";
  headerBookBtn.style.pointerEvents = anyVisible ? "none" : "auto";
}, { threshold: 0.3 });

otherBookButtons.forEach((btn) => observer.observe(btn));