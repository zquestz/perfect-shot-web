const galleryImages = [
  {
    image: "img/screenshots/1.webp",
    alt: "Perfect Shot Screenshot 1",
  },
  {
    image: "img/screenshots/2.webp",
    alt: "Perfect Shot Screenshot 2",
  },
  {
    image: "img/screenshots/3.webp",
    alt: "Perfect Shot Screenshot 3",
  },
];

let currentImageIndex = 0;
let touchStartX = 0;
let touchEndX = 0;
let modalImage = null;

function initializeModal() {
  modalImage = document.getElementById("modalImage");
  const modal = document.getElementById("imageModal");

  modal.addEventListener("touchstart", handleTouchStart, { passive: true });
  modal.addEventListener("touchend", handleTouchEnd, { passive: true });
  modal.addEventListener("touchmove", handleTouchMove, { passive: false });
}

function handleTouchStart(e) {
  touchStartX = e.touches[0].clientX;
}

function handleTouchMove(e) {
  if (!document.getElementById("imageModal").classList.contains("hidden")) {
    e.preventDefault();
  }
}

function handleTouchEnd(e) {
  touchEndX = e.changedTouches[0].clientX;
  const swipeDistance = touchEndX - touchStartX;
  const minSwipeDistance = 50;

  if (Math.abs(swipeDistance) >= minSwipeDistance) {
    if (swipeDistance > 0) {
      navigateImage(-1);
    } else {
      navigateImage(1);
    }
  }
}

function showLoading() {
  document.getElementById("loadingSpinner").classList.remove("hidden");
}

function hideLoading() {
  document.getElementById("loadingSpinner").classList.add("hidden");
}

function openModal(imageSrc, imageAlt) {
  const modal = document.getElementById("imageModal");
  modal.classList.remove("hidden");
  currentImageIndex = galleryImages.findIndex((img) => img.image === imageSrc);
  showLoading();
  updateModalImage();
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("imageModal");
  modal.classList.add("hidden");
  document.body.style.overflow = "";
}

function navigateImage(direction) {
  showLoading();
  currentImageIndex =
    (currentImageIndex + direction + galleryImages.length) %
    galleryImages.length;
  updateModalImage();
}

function updateModalImage() {
  const modalImage = document.getElementById("modalImage");
  const currentImage = galleryImages[currentImageIndex];

  modalImage.onload = () => {
    hideLoading();
  };

  modalImage.onerror = () => {
    console.error("Error loading image:", currentImage.image);
    hideLoading();
  };

  modalImage.src = currentImage.image;
  modalImage.alt = currentImage.alt;
}

document.addEventListener("DOMContentLoaded", initializeModal);
