// Example: Smooth scrolling for anchor links


// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetElement = document.querySelector(this.getAttribute('href'));
        targetElement.scrollIntoView({
            behavior: 'smooth'
        });

        // Update active link
        updateActiveLink(this);
    });
});

function updateActiveLink(activeLink) {
    document.querySelectorAll('.navbar a').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

let currentSectionId = '';

document.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const footer = document.querySelector('footer');
    

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight) {
            currentSectionId = section.getAttribute('id');
        }
    });

    // Check if the footer is in view
    const footerTop = footer.getBoundingClientRect().top + window.scrollY;
    if (window.scrollY >= footerTop - 100 && window.scrollY < footerTop + footer.offsetHeight) {
        currentSectionId = 'footer'; // Use a specific ID or handle as needed
    }

    // Update active link based on the section or footer
    document.querySelectorAll('.navbar a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(currentSectionId)) {
            link.classList.add('active');
        }
    });
});

    document.querySelectorAll('.navbar a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(currentSectionId)) {
            link.classList.add('active');
        }
    });
    


// Initialize active link based on current scroll position
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('section').forEach(section => {
        if (window.scrollY >= section.offsetTop - 100 && window.scrollY < section.offsetTop + section.offsetHeight) {
            updateActiveLink(document.querySelector(`a[href="#${section.getAttribute('id')}"]`));
        }
    });
});


// document.addEventListener('DOMContentLoaded', function () {
//   new Splide(".splide", {
//     type: "loop",
//     perPage: 4,
//     arrows: false,
//     pagination: false,
//     focus: "center",
//     gap: "1em"
//   }).mount(window.splide.Extensions);
// });
// document.addEventListener("DOMContentLoaded", function() {
//   const carousel = document.querySelector(".carousel");
//   const arrowBtns = document.querySelectorAll(".wrapper i");
//   const wrapper = document.querySelector(".wrapper");

//   const firstCard = carousel.querySelector(".card");
//   const firstCardWidth = firstCard.offsetWidth;
//   const totalCardWidth = carousel.scrollWidth;
//   const maxScrollLeft = totalCardWidth - carousel.offsetWidth;

//   let isDragging = false,
//       startX,
//       startScrollLeft,
//       timeoutId;

//   const dragStart = (e) => {
//       isDragging = true;
//       carousel.classList.add("dragging");
//       startX = e.pageX;
//       startScrollLeft = carousel.scrollLeft;
//   };

//   const dragging = (e) => {
//       if (!isDragging) return;

//       const newScrollLeft = startScrollLeft - (e.pageX - startX);

//       if (newScrollLeft <= 0 || newScrollLeft >= maxScrollLeft) {
//           isDragging = false;
//           return;
//       }

//       carousel.scrollLeft = newScrollLeft;
//   };

//   const dragStop = () => {
//       isDragging = false; 
//       carousel.classList.remove("dragging");
//   };

//   const autoPlay = () => {
//       // Return if window is smaller than 800
//       if (window.innerWidth < 800) return; 
      
//       // If the carousel is at the end, reset scroll position
//       if (carousel.scrollLeft >= maxScrollLeft) {
//           carousel.scrollLeft = 0;
//       }
      
//       // Scroll the carousel after every 3000ms
//       timeoutId = setTimeout(() => {
//           carousel.scrollLeft += firstCardWidth;
//           // If we've scrolled past the end, reset to start
//           if (carousel.scrollLeft >= maxScrollLeft) {
//               carousel.scrollLeft = 0;
//           }
//           autoPlay(); // Restart autoplay
//       }, 3000); // Adjusted to 3 seconds
//   };

//   carousel.addEventListener("mousedown", dragStart);
//   carousel.addEventListener("mousemove", dragging);
//   document.addEventListener("mouseup", dragStop);
//   wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
//   wrapper.addEventListener("mouseleave", autoPlay);

//   arrowBtns.forEach(btn => {
//       btn.addEventListener("click", () => {
//           carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
//           // Stop autoplay when arrow is clicked
//           clearTimeout(timeoutId);
//       });
//   });

//   autoPlay(); // Start autoplay when DOM is loaded
// });
const wrapper = document.querySelector('.wrapper');
const carousel = document.querySelector('.carousel');
const cards = document.querySelectorAll('.cacard');
const totalCards = cards.length;
let currentIndex = 0;

// Clone the first few cards to create a seamless loop
cards.forEach(card => {
    const clone = card.cloneNode(true);
    carousel.appendChild(clone);
});

const scrollSpeed = 2000; // Time between auto-scrolls in milliseconds

function autoScroll() {
    currentIndex++;
    carousel.scrollTo({
        left: currentIndex * cards[0].offsetWidth,
        behavior: 'smooth'
    });

    // Reset to the original start (without user noticing)
    if (currentIndex >= totalCards) {
        setTimeout(() => {
            carousel.scrollTo({
                left: 0,
                behavior: 'auto' // Instantly reset to the original start
            });
            currentIndex = 0;
        }, 100); // Minimal delay for resetting to start
    }
}

let autoScrollInterval = setInterval(autoScroll, scrollSpeed);

carousel.addEventListener('mouseover', () => {
    clearInterval(autoScrollInterval);
});

carousel.addEventListener('mouseout', () => {
    autoScrollInterval = setInterval(autoScroll, scrollSpeed);
});

document.getElementById('left').addEventListener('click', () => {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : totalCards - 1;
    carousel.scrollTo({
        left: currentIndex * cards[0].offsetWidth,
        behavior: 'smooth'
    });
});

document.getElementById('right').addEventListener('click', () => {
    currentIndex = currentIndex < totalCards - 1 ? currentIndex + 1 : 0;
    carousel.scrollTo({
        left: currentIndex * cards[0].offsetWidth,
        behavior: 'smooth'
    });
});