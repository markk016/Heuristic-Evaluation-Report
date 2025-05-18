// Additional JavaScript for the improvements page

document.addEventListener("DOMContentLoaded", () => {
  // Initialize image preview functionality
  initializeImagePreviews()
})

// Initialize image previews
function initializeImagePreviews() {
  const previewImages = document.querySelectorAll(".preview-image")
  const lightbox = document.getElementById("image-lightbox")
  const lightboxImg = document.getElementById("lightbox-img")
  const closeBtn = document.getElementById("close-lightbox")

  // Set up image preview functionality
  previewImages.forEach((img) => {
    img.addEventListener("click", function () {
      lightboxImg.src = this.src
      lightboxImg.alt = this.alt
      lightbox.style.display = "flex"
    })
  })

  // Close lightbox when clicking the close button
  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none"
  })

  // Close lightbox when clicking outside the image
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none"
    }
  })

  // Close lightbox with escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.style.display === "flex") {
      lightbox.style.display = "none"
    }
  })
}

// Show status message
function showStatusMessage(message) {
  const statusMessage = document.querySelector(".status-message")
  if (statusMessage) {
    statusMessage.textContent = message
    statusMessage.classList.add("show")

    setTimeout(() => {
      statusMessage.classList.remove("show")
    }, 3000)
  }
}
