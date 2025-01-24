document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".php-email-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = form.querySelector('input[name="name"]').value.trim();
    const tel = form.querySelector('input[name="tel"]').value.trim();
    const subject = form.querySelector('input[name="subject"]').value.trim();
    const message = form.querySelector('textarea[name="message"]').value.trim();

    const errorMessageDiv = form.querySelector(".error-message");
    const sentMessageDiv = form.querySelector(".sent-message");

    errorMessageDiv.style.display = "none";
    sentMessageDiv.style.display = "none";

    if (!name || !tel || !subject || !message) {
      errorMessageDiv.textContent = "Будь ласка, заповніть всі поля.";
      errorMessageDiv.style.display = "block";
      return;
    }

    const phoneRegex = /^\+?\d{10,15}$/; // Перевірка міжнародного формату телефону
    if (!phoneRegex.test(tel)) {
      errorMessageDiv.textContent = "Будь ласка, введіть коректний номер телефону.";
      errorMessageDiv.style.display = "block";
      return;
    }

    // Якщо все добре, відправляємо дані
    sendToTelegram(name, tel, subject, message, form);
  });
});
