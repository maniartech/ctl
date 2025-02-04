// Initialize animations on scroll (AOS)
function initializeAOS() {
  AOS.init();
}

// Update the timeline navigation and scroll position
function updateTimeline(wrapper, points, prevBtn, nextBtn, currentIndex) {
  if (!wrapper) return;
  const pointWidth = wrapper.offsetWidth / points.length;
  wrapper.scrollTo({
    left: currentIndex * pointWidth,
    behavior: "smooth",
  });

  // Update button states
  if (prevBtn) prevBtn.style.opacity = currentIndex === 0 ? "0.5" : "1";
  if (nextBtn)
    nextBtn.style.opacity = currentIndex === points.length - 1 ? "0.5" : "1";
}

// Add event listeners for navigation buttons
function setupNavigation(wrapper, points, prevBtn, nextBtn) {
  let currentIndex = 0;

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateTimeline(wrapper, points, prevBtn, nextBtn, currentIndex);
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (currentIndex < points.length - 1) {
        currentIndex++;
        updateTimeline(wrapper, points, prevBtn, nextBtn, currentIndex);
      }
    });
  }

  // Handle responsive scrolling
  if (wrapper) {
    wrapper.addEventListener("scroll", () => {
      const pointWidth = wrapper.offsetWidth / points.length;
      currentIndex = Math.round(wrapper.scrollLeft / pointWidth);
      if (prevBtn) prevBtn.style.opacity = currentIndex === 0 ? "0.5" : "1";
      if (nextBtn)
        nextBtn.style.opacity =
          currentIndex === points.length - 1 ? "0.5" : "1";
    });
  }

  // Initial update
  updateTimeline(wrapper, points, prevBtn, nextBtn, currentIndex);
}

// Setup modal functionality for image previews
function setupImageModal() {
  const modal = document.getElementById("modal");
  const images = document.getElementsByClassName("images");
  const modalImg = document.getElementById("modal-content");
  const captionText = document.getElementById("caption");
  const span = document.getElementsByClassName("close")[0];

  // Add click listeners to all images
  for (let i = 0; i < images.length; i++) {
    images[i].onclick = function () {
      modal.style.display = "block";
      modalImg.src = this.src;
      captionText.innerHTML = this.alt;
    };
  }

  // Close modal on clicking the close button
  span.onclick = function () {
    modal.style.display = "none";
  };
}

// Main initialization function
function initializePage() {
  initializeAOS();

  const wrapper = document.querySelector(".timeline-wrapper");
  const prevBtn = document.querySelector(".nav-prev");
  const nextBtn = document.querySelector(".nav-next");
  const points = document.querySelectorAll(".timeline-point");

  if (wrapper && points.length > 0) {
    setupNavigation(wrapper, points, prevBtn, nextBtn);
  }

  setupImageModal();
}

// Initialize the page when DOM content is loaded
document.addEventListener("DOMContentLoaded", initializePage);
