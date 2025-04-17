
document.addEventListener("DOMContentLoaded", () => {
    const revealElements = document.querySelectorAll(".reveal-on-scroll");

    const observerOptions = {
        threshold: 0.1
    };

    const revealOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                observer.unobserve(entry.target); // Only reveal once
            }
        });
    };

    const observer = new IntersectionObserver(revealOnScroll, observerOptions);

    revealElements.forEach(el => {
        observer.observe(el);
    });
});
