document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".stars-filled").forEach((el) => {
    const rating = el.dataset.rating;
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1;

    el.style.setProperty("--rating", fullStars);
    if (halfStar > 0) {
      const halfStarElement = document.createElement("div");
      halfStarElement.className = "stars-half";
      halfStarElement.style.width = `${halfStar * 10}%`;
      el.parentNode.appendChild(halfStarElement);
    }
  });

  document.querySelectorAll(".btn-outline-info").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const card = button.closest(".movie-card");
      card.classList.toggle("flipped");
    });
  });

  // Add event listener for close buttons
  document.querySelectorAll(".close-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const card = button.closest(".movie-card");
      card.classList.remove("flipped");
    });
  });
});
