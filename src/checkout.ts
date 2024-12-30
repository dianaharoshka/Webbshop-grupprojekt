document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector<HTMLFormElement>(".checkout-form form");
  const mainContainer = document.querySelector("main");

  if (form && mainContainer) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      mainContainer.innerHTML = `
            <section class="confirmation-message">
              <h2>Thank you for your purchase!</h2>
              <p>Your order has been successfully processed.</p>
            </section>
          `;
    });
  }
});
