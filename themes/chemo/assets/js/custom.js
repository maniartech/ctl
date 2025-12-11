// Initialize animations on scroll (AOS)
function initializeAOS() {
  AOS.init();
}

// Update the timeline navigation and scroll position
function updateTimeline(wrapper, points, prevBtn, nextBtn, currentIndex) {
  if (!wrapper) return;

  // Calculate scroll position based on actual element positions
  const targetPoint = points[currentIndex];
  if (targetPoint) {
    const containerRect = wrapper.getBoundingClientRect();
    const targetRect = targetPoint.getBoundingClientRect();
    const scrollLeft = wrapper.scrollLeft + targetRect.left - containerRect.left;

    // Center the element in the viewport
    const centerOffset = (wrapper.offsetWidth - targetPoint.offsetWidth) / 2;
    const finalScrollLeft = Math.max(0, scrollLeft - centerOffset);

    wrapper.scrollTo({
      left: finalScrollLeft,
      behavior: "smooth",
    });
  }

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
      // Find the currently visible timeline point
      const containerRect = wrapper.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      points.forEach((point, index) => {
        const pointRect = point.getBoundingClientRect();
        const pointCenter = pointRect.left + pointRect.width / 2;
        const distance = Math.abs(pointCenter - containerCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      currentIndex = closestIndex;
      if (prevBtn) prevBtn.style.opacity = currentIndex === 0 ? "0.5" : "1";
      if (nextBtn)
        nextBtn.style.opacity = currentIndex === points.length - 1 ? "0.5" : "1";
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
