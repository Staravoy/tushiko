document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".php-email-form");
  const loading = form.querySelector(".loading");
  const sentMessage = form.querySelector(".sent-message");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Показуємо "Loading..."
    loading.style.display = "block";
    sentMessage.style.display = "none";

    // Збираємо дані форми
    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      tel: formData.get("tel"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    // Відправляємо дані на Telegram
    const botToken = "7628656589:AAEKjsfsG3VXPVdi2XcOy0SnLhPZHHj855Y";
    const chatId = "743364707"; // Ваш chat_id
    const text = `
      📝 *Повідомлення з сайту візитки:*
      - 👤 *Ім'я:* ${data.name}
      - 📞 *Телефон:* ${data.tel}
      - 📨 *Тема:* ${data.subject}
      - 💬 *Опис:* ${data.message}
    `;

    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: "Markdown",
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        loading.style.display = "none"; // Приховуємо "Loading..."
        if (result.ok) {
          sentMessage.style.display = "block"; // Показуємо повідомлення про успіх
          form.reset(); // Очищаємо форму
        } else {
          alert("Помилка відправки. Спробуйте ще раз.");
        }
      })
      .catch((error) => {
        loading.style.display = "none"; // Приховуємо "Loading..."
        alert("Не вдалося відправити повідомлення. Спробуйте ще раз.");
        console.error(error);
      });
  });
});
