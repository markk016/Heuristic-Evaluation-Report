// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const nav = document.querySelector("nav")

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      nav.classList.toggle("active")

      // Change hamburger to X
      const spans = this.querySelectorAll("span")
      if (nav.classList.contains("active")) {
        spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
        spans[1].style.opacity = "0"
        spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)"
      } else {
        spans[0].style.transform = "none"
        spans[1].style.opacity = "1"
        spans[2].style.transform = "none"
      }
    })
  }

  // DECIDE Framework Accordion
  const stepHeaders = document.querySelectorAll(".step-header")

  stepHeaders.forEach((header) => {
    header.addEventListener("click", function (e) {
      // Don't toggle if clicking on buttons
      if (e.target.tagName === "BUTTON") {
        return
      }

      const contentId = this.parentElement.id + "-content"
      const content = document.getElementById(contentId)

      // Toggle the active class
      content.classList.toggle("active")
    })
  })

  // Filter Issues by Heuristic
  const heuristicFilter = document.getElementById("heuristic-filter")

  if (heuristicFilter) {
    heuristicFilter.addEventListener("change", filterIssues)
  }

  // Create status message element
  const statusMessage = document.createElement("div")
  statusMessage.className = "status-message"
  document.body.appendChild(statusMessage)

  // Initialize notes from localStorage if available
  initializeNotes()

  // Set up image preview functionality
  setupImagePreviews()
})

// Function to toggle DECIDE framework steps
function toggleStep(contentId) {
  const content = document.getElementById(contentId)
  content.classList.toggle("active")

  const stepHeader = content.previousElementSibling
  const toggleIcon = stepHeader.querySelector(".toggle-icon")

  if (content.classList.contains("active")) {
    toggleIcon.textContent = "-"
  } else {
    toggleIcon.textContent = "+"
  }
}

// Function to filter issues by heuristic
function filterIssues() {
  const filter = document.getElementById("heuristic-filter").value
  const issueCards = document.querySelectorAll(".issue-card")

  issueCards.forEach((card) => {
    if (filter === "all" || card.getAttribute("data-heuristic") === filter) {
      card.style.display = "block"
    } else {
      card.style.display = "none"
    }
  })
}

// Function to filter improvements by heuristic
function filterImprovements() {
  const filter = document.getElementById("improvement-filter").value
  const improvementCards = document.querySelectorAll(".main-improvement")

  improvementCards.forEach((card) => {
    if (filter === "all" || card.getAttribute("data-heuristic") === filter) {
      card.style.display = "block"
    } else {
      card.style.display = "none"
    }
  })
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()

    const targetId = this.getAttribute("href")
    if (targetId === "#") return

    const targetElement = document.querySelector(targetId)
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 100,
        behavior: "smooth",
      })
    }
  })
})

// Add animation to cards on scroll
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(
    ".card, .team-member, .issue-card, .improvement-card, .reflection-card, .member-reflection, .main-improvement, .sub-improvement",
  )

  // Animate elements when they come into view
  function animateOnScroll() {
    cards.forEach((card) => {
      const cardPosition = card.getBoundingClientRect().top
      const screenPosition = window.innerHeight / 1.2

      if (cardPosition < screenPosition) {
        card.classList.add("animate")
      }
    })
  }

  // Add animation class to cards
  if (cards.length > 0) {
    // Add CSS for animation
    const style = document.createElement("style")
    style.textContent = `
      .card, .team-member, .issue-card, .improvement-card, .reflection-card, .member-reflection, .main-improvement, .sub-improvement {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
      }
      
      .card.animate, .team-member.animate, .issue-card.animate, .improvement-card.animate, .reflection-card.animate, .member-reflection.animate, .main-improvement.animate, .sub-improvement.animate {
          opacity: 1;
          transform: translateY(0);
      }
    `
    document.head.appendChild(style)

    // Run on load and scroll
    window.addEventListener("scroll", animateOnScroll)
    window.addEventListener("load", animateOnScroll)
  }
})

// Generate placeholder images for development
function generatePlaceholderSrc(width, height) {
  return `/placeholder.svg?height=${height}&width=${width}`
}

// Replace placeholder images with actual content when available
document.addEventListener("DOMContentLoaded", () => {
  // This function would be used to replace placeholder images with actual content
  // when the real images become available
})

// Note editing functions
function addEditorToolbar(contentId) {
  const contentElement = document.getElementById(contentId)
  const editDiv = contentElement.querySelector(".note-edit")
  const textarea = editDiv.querySelector("textarea")

  // Create toolbar if it doesn't exist
  if (!editDiv.querySelector(".editor-toolbar")) {
    const toolbar = document.createElement("div")
    toolbar.className = "editor-toolbar"

    // Add bullet point button
    const bulletBtn = document.createElement("button")
    bulletBtn.type = "button"
    bulletBtn.className = "toolbar-btn"
    bulletBtn.innerHTML = "• Bullet"
    bulletBtn.title = "Insert bullet point"
    bulletBtn.onclick = () => {
      insertBulletPoint(textarea)
    }

    // Add bold button
    const boldBtn = document.createElement("button")
    boldBtn.type = "button"
    boldBtn.className = "toolbar-btn"
    boldBtn.innerHTML = "<strong>B</strong>"
    boldBtn.title = "Bold text"
    boldBtn.onclick = () => {
      formatSelectedText(textarea, "**", "**")
    }

    // Add italic button
    const italicBtn = document.createElement("button")
    italicBtn.type = "button"
    italicBtn.className = "toolbar-btn"
    italicBtn.innerHTML = "<em>I</em>"
    italicBtn.title = "Italic text"
    italicBtn.onclick = () => {
      formatSelectedText(textarea, "_", "_")
    }

    // Add highlight button
    const highlightBtn = document.createElement("button")
    highlightBtn.type = "button"
    highlightBtn.className = "toolbar-btn"
    highlightBtn.innerHTML = '<span style="background-color: #ffff00;">H</span>'
    highlightBtn.title = "Highlight text"
    highlightBtn.onclick = () => {
      formatSelectedText(textarea, "==", "==")
    }

    // Add buttons to toolbar
    toolbar.appendChild(bulletBtn)
    toolbar.appendChild(boldBtn)
    toolbar.appendChild(italicBtn)
    toolbar.appendChild(highlightBtn)

    // Insert toolbar before textarea
    editDiv.insertBefore(toolbar, textarea)
  }
}

// Function to insert a bullet point at cursor position or at the beginning of each selected line
function insertBulletPoint(textarea) {
  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const text = textarea.value

  // If there's a selection spanning multiple lines
  if (start !== end && text.substring(start, end).includes("\n")) {
    const selectedText = text.substring(start, end)
    const lines = selectedText.split("\n")
    const bulletedLines = lines.map((line) => (line.trim() ? "• " + line : line))
    const newText = bulletedLines.join("\n")

    // Replace the selected text with bulleted text
    textarea.value = text.substring(0, start) + newText + text.substring(end)
    textarea.selectionStart = start
    textarea.selectionEnd = start + newText.length
  } else {
    // Find the beginning of the current line
    let lineStart = start
    while (lineStart > 0 && text.charAt(lineStart - 1) !== "\n") {
      lineStart--
    }

    // Insert bullet point at the beginning of the line
    const beforeBullet = text.substring(0, lineStart)
    const afterBullet = text.substring(lineStart)
    textarea.value = beforeBullet + "• " + afterBullet

    // Place cursor after the bullet point
    textarea.selectionStart = lineStart + 2
    textarea.selectionEnd = lineStart + 2
  }

  textarea.focus()
}

// Function to format selected text with given markers (bold, italic, highlight)
function formatSelectedText(textarea, openTag, closeTag) {
  const start = textarea.selectionStart
  const end = textarea.selectionEnd

  if (start !== end) {
    // There is selected text
    const selectedText = textarea.value.substring(start, end)
    const formattedText = openTag + selectedText + closeTag

    textarea.value = textarea.value.substring(0, start) + formattedText + textarea.value.substring(end)

    // Set selection to include the tags
    textarea.selectionStart = start
    textarea.selectionEnd = start + formattedText.length
  } else {
    // No selection, insert tags and place cursor between them
    textarea.value = textarea.value.substring(0, start) + openTag + closeTag + textarea.value.substring(end)

    // Place cursor between tags
    textarea.selectionStart = start + openTag.length
    textarea.selectionEnd = start + openTag.length
  }

  textarea.focus()
}

// Modify the toggleEditMode function to add the toolbar
function toggleEditMode(contentId) {
  const contentElement = document.getElementById(contentId)
  const viewDiv = contentElement.querySelector(".note-view")
  const editDiv = contentElement.querySelector(".note-edit")
  const editBtn = contentElement.parentElement.querySelector(".edit-btn")
  const saveBtn = contentElement.parentElement.querySelector(".save-btn")

  // Toggle visibility
  viewDiv.style.display = "none"
  editDiv.style.display = "block"
  editBtn.style.display = "none"
  saveBtn.style.display = "inline-block"

  // Add toolbar to the editor
  addEditorToolbar(contentId)

  // Focus on textarea
  const textarea = editDiv.querySelector("textarea")
  textarea.focus()
}

function saveNote(contentId) {
  const contentElement = document.getElementById(contentId)
  const viewDiv = contentElement.querySelector(".note-view")
  const editDiv = contentElement.querySelector(".note-edit")
  const editBtn = contentElement.parentElement.querySelector(".edit-btn")
  const saveBtn = contentElement.parentElement.querySelector(".save-btn")
  const textarea = editDiv.querySelector("textarea")

  // Get the content from textarea
  const content = textarea.value

  // Save to localStorage
  localStorage.setItem(contentId, content)

  // Convert textarea content to HTML
  const htmlContent = convertToHtml(content)

  // Update the view div
  viewDiv.innerHTML = htmlContent

  // Toggle visibility back
  viewDiv.style.display = "block"
  editDiv.style.display = "none"
  editBtn.style.display = "inline-block"
  saveBtn.style.display = "none"

  // Show status message
  showStatusMessage("Note saved successfully!")
}

// Modify the convertToHtml function to handle highlights and italics
function convertToHtml(text) {
  // Convert plain text to HTML
  let html = "<p>"

  // Split by double newlines for paragraphs
  const paragraphs = text.split("\n\n")

  for (let i = 0; i < paragraphs.length; i++) {
    const paragraph = paragraphs[i]

    if (paragraph.trim().startsWith("•")) {
      // This is a list
      html += "<ul>"
      const items = paragraph.split("\n")
      for (const item of items) {
        if (item.trim()) {
          const listItemContent = item.trim().substring(1).trim()
          html += `<li>${listItemContent}</li>`
        }
      }
      html += "</ul>"
    } else {
      // Regular paragraph
      html += paragraph.replace(/\n/g, "<br>")
      if (i < paragraphs.length - 1) {
        html += "</p><p>"
      }
    }
  }

  html += "</p>"

  // Convert bold text
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")

  // Convert italic text
  html = html.replace(/_(.*?)_/g, "<em>$1</em>")

  // Convert highlighted text
  html = html.replace(/==(.*?)==/g, "<mark>$1</mark>")

  return html
}

function showStatusMessage(message) {
  const statusMessage = document.querySelector(".status-message")
  statusMessage.textContent = message
  statusMessage.classList.add("show")

  setTimeout(() => {
    statusMessage.classList.remove("show")
  }, 3000)
}

function initializeNotes() {
  const contentIds = [
    "determine-content",
    "explore-content",
    "choose-content",
    "identify-content",
    "decide-ethical-content",
    "evaluate-content",
  ]

  contentIds.forEach((contentId) => {
    const savedContent = localStorage.getItem(contentId)
    if (savedContent) {
      const contentElement = document.getElementById(contentId)
      if (contentElement) {
        const viewDiv = contentElement.querySelector(".note-view")
        const textarea = contentElement.querySelector("textarea")

        // Update textarea
        textarea.value = savedContent

        // Update view
        viewDiv.innerHTML = convertToHtml(savedContent)
      }
    }
  })
}

// Image preview functionality
function setupImagePreviews() {
  // Get all preview images
  const previewImages = document.querySelectorAll(".preview-image")
  const lightbox = document.getElementById("imageLightbox")
  const lightboxImage = document.getElementById("lightboxImage")

  // Add click event to each preview image
  previewImages.forEach((image) => {
    image.addEventListener("click", function () {
      // Set the lightbox image source to the clicked image source
      lightboxImage.src = this.src
      lightboxImage.alt = this.alt

      // Show the lightbox
      lightbox.classList.add("active")

      // Prevent scrolling on the body
      document.body.style.overflow = "hidden"
    })
  })

  // Close lightbox when clicking outside the image
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox()
    }
  })

  // Close lightbox with escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      closeLightbox()
    }
  })
}

// Function to close the lightbox
function closeLightbox() {
  const lightbox = document.getElementById("imageLightbox")
  lightbox.classList.remove("active")

  // Re-enable scrolling
  document.body.style.overflow = ""
}
