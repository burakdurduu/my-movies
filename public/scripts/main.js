document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.stars-filled').forEach(el => {
    const rating = el.dataset.rating; // Film puanını al
    const fullStars = Math.floor(rating); // Tam yıldız sayısını al
    const halfStar = rating % 1; // Yarım yıldız olup olmadığını kontrol et

    el.style.setProperty('--rating', fullStars); // Tam yıldızların genişliğini ayarla
    if (halfStar > 0) {
      const halfStarElement = document.createElement('div');
      halfStarElement.className = 'stars-half';
      halfStarElement.style.width = `${halfStar * 10}%`; // Yarım yıldızın genişliğini ayarla
      el.parentNode.appendChild(halfStarElement); // Yarım yıldızı ekle
    }
  });

  document.querySelectorAll('.btn-outline-info').forEach(button => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const card = button.closest('.movie-card');
      card.classList.toggle('flipped');
    });
  });

  // Add event listener for close buttons
  document.querySelectorAll('.close-btn').forEach(button => {
    button.addEventListener('click', (event) => {
      const card = button.closest('.movie-card');
      card.classList.remove('flipped');
    });
  });
});