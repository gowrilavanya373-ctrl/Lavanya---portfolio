// ======================================
// 1. TYPING ANIMATION
// ======================================

const typingText = document.getElementById("typing-text");

const words = [
    "Data Science Student",
    "Aspiring Data Analyst",
    "Technology Enthusiast",
    "Future Data Scientist"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    // Respect reduced motion preferences
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        typingText.textContent = words[0];
        return;
    }

    const currentWord = words[wordIndex];

    if (deleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    typingText.textContent =
        currentWord.substring(0, charIndex);

    let delay = deleting ? 50 : 100;

    if (!deleting && charIndex === currentWord.length) {
        deleting = true;
        delay = 1200;
    }

    else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 400;
    }

    setTimeout(typeEffect, delay);
}

if (typingText) {
    typeEffect();
}


// ======================================
// 2. DARK / LIGHT MODE
// ======================================

const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", function () {

    document.body.classList.toggle("light-mode");

    const isLight =
        document.body.classList.contains("light-mode");

    themeToggle.textContent = isLight ? "🌙" : "☀️";

    themeToggle.setAttribute(
        "aria-label",
        isLight ? "Switch to dark mode" : "Switch to light mode"
    );

});


// ======================================
// 3. MOBILE NAVIGATION MENU
// ======================================

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", function () {

    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";

});

// Close menu when a navigation link is clicked

document.querySelectorAll(".nav-links a").forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        menuToggle.textContent = "☰";

    });

});


// ======================================
// 4. CONTACT FORM VALIDATION
// ======================================

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const message =
        document.getElementById("message").value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Name validation

    if (name.length < 2) {
        showMessage(
            "Please enter a valid name.",
            "red"
        );
        return;
    }

    // Email validation

    if (!emailPattern.test(email)) {
        showMessage(
            "Please enter a valid email address.",
            "red"
        );
        return;
    }

    // Message validation

    if (message.length < 10) {
        showMessage(
            "Your message must contain at least 10 characters.",
            "red"
        );
        return;
    }

    // Successful validation

    showMessage(
        "Thank you, " + name +
        "! Your form passed validation.",
        "green"
    );

    contactForm.reset();

});

function showMessage(message, color) {

    formStatus.textContent = message;

    formStatus.style.color =
        color === "green" ? "#4ade80" : "#f87171";

}


// ======================================
// 5. SCROLL REVEAL ANIMATION
// ======================================

const animatedElements = document.querySelectorAll(
    ".section, .project-card"
);

if (
    "IntersectionObserver" in window &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {

    const observer = new IntersectionObserver(
        function (entries, currentObserver) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    currentObserver.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.1
        }
    );

    animatedElements.forEach(function (element) {

        element.classList.add("reveal");

        observer.observe(element);

    });

}


// ======================================
// 6. ACTIVE NAVIGATION HIGHLIGHT
// ======================================

const navigationLinks =
    document.querySelectorAll(".nav-links a");

const sections =
    document.querySelectorAll("section[id]");

if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    navigationLinks.forEach(function (link) {

                        if (
                            link.getAttribute("href") ===
                            "#" + entry.target.id
                        ) {

                            link.setAttribute(
                                "aria-current",
                                "location"
                            );

                        } else {

                            link.removeAttribute("aria-current");

                        }

                    });

                }

            });

        },
        {
            rootMargin: "-25% 0px -60% 0px"
        }
    );

    sections.forEach(function (section) {

        sectionObserver.observe(section);

    });

}