document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('.navbar a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#') && this.getAttribute('href') !== '#') {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Dropdown functionality
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        const dropdown = item.querySelector('.dropdown-menu');
        if (dropdown) {
            item.addEventListener('click', function(event) {
                event.stopPropagation(); // Prevent click from bubbling up
                dropdown.classList.toggle('active');
                // Close other dropdowns when one is opened
                navItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.querySelector('.dropdown-menu.active')) {
                        otherItem.querySelector('.dropdown-menu').classList.remove('active');
                    }
                });
            });
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-item')) {
            document.querySelectorAll('.dropdown-menu.active').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });



// Search functionality

const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
let lastSearchText = ''; // Store the last searched text
let currentIndex = 0; // Track the current index of visible highlight
let highlights = []; // Array to hold all highlighted elements

function highlightText(node, searchText) {
    if (node.nodeType === 3) { // Node.TEXT_NODE
        let index = node.data.toLowerCase().indexOf(searchText.toLowerCase());
        while (index >= 0) {
            const span = document.createElement('span');
            span.className = 'highlight';
            span.textContent = node.data.substring(index, index + searchText.length);
            const afterText = node.data.substring(index + searchText.length);
            node.data = node.data.substring(0, index);
            node.parentNode.insertBefore(span, node.nextSibling);
            node.parentNode.insertBefore(document.createTextNode(afterText), span.nextSibling);
            node = span.nextSibling;
            index = node.data.toLowerCase().indexOf(searchText.toLowerCase());
        }
    } else if (node.nodeType === 1 && node.childNodes && !/(script|style|span)/i.test(node.tagName)) { // Avoid script, style, and already highlighted spans
        Array.from(node.childNodes).forEach(child => {
            highlightText(child, searchText);
        });
    }
}

function clearHighlights() {
    document.querySelectorAll('.highlight').forEach(highlight => {
        const parent = highlight.parentNode;
        parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
        parent.normalize(); // Re-joins text nodes that were split
    });
    highlights = [];
    currentIndex = 0;
}

searchButton.addEventListener('click', () => {
    searchInput.classList.toggle('active');
    searchInput.style.display = searchInput.classList.contains('active') ? 'block' : 'none';
    if (searchInput.classList.contains('active')) {
        searchInput.focus();
    } else {
        clearHighlights();
        searchInput.value = '';
    }
});

searchInput.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        const searchText = searchInput.value.trim();
        if (searchText !== lastSearchText) {
            clearHighlights();
            lastSearchText = searchText;
            document.querySelectorAll('.scroll-section').forEach(section => {
                highlightText(section, searchText);
            });
            highlights = document.querySelectorAll('.highlight');
        }
        if (highlights.length > 0 && searchText) {
            if (currentIndex >= highlights.length) {
                currentIndex = 0; // Reset index if it exceeds the number of highlights
            }
            highlights[currentIndex++].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});
});

// Close search input when clicking outside
document.addEventListener('click', function(event) {
    if (!event.target.closest('#searchButton') && !event.target.closest('#searchInput')) {
        searchInput.classList.remove('active');
        searchInput.style.display = 'none';
        clearHighlights();
    }
});



//Carousel scroll controls

document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    let currentIndex = 0; // Start from the very first item.

    const leftControl = document.querySelector('.left-control');
    const rightControl = document.querySelector('.right-control');

    // Function to update the carousel position and control visibility
    function updateCarousel() {
        const itemWidth = items[0].clientWidth;
        const spacing = parseInt(window.getComputedStyle(items[0]).marginRight, 10);
        const totalMove = itemWidth + spacing;
        carousel.style.transform = `translateX(-${currentIndex * totalMove}px)`;
        
        // Update button visibility
        leftControl.style.visibility = currentIndex > 0 ? 'visible' : 'hidden';
        rightControl.style.visibility = currentIndex < items.length - 1 ? 'visible' : 'hidden';
    }

    // Scroll function
    function scrollCarousel(direction) {
        if (direction === 'next' && currentIndex < items.length - 1) {
            currentIndex++;
        } else if (direction === 'prev' && currentIndex > 0) {
            currentIndex--;
        }
        updateCarousel();
    }

    // Event listeners for controls
    leftControl.addEventListener('click', () => scrollCarousel('prev'));
    rightControl.addEventListener('click', () => scrollCarousel('next'));

    // Initial update to set correct position and button visibility
    updateCarousel();
});



// Modal data

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("myModal");
    const btns = document.querySelectorAll('.learn-more-btn');
    const span = document.querySelector(".close");

    const projectDetails = [
        {
            title: "TODO List Web App",
            description: "Created a TODO list web application with full set of tools to manage tasks.The application has the option to add, delete and rename tasks. You have the ability to create multiple TODO lists as well. The app was developed using React and Node.js.",
            imageUrl: "images/todo-list.png",
            links: [{ text: "TODO List GitHub Repository", url: "https://github.com/stjepanDeveloper/TODO-list-app" }]
        },
        {
            title: "Public API Projects",
            description: "Worked with and implemented multiple API's such as weather forecast API, Last FM Radio API, News API, Authentification API's and more.",
            imageUrl: "images/computercode.png",
            links: [{ text: "Weather API Github Repository", url: "https://github.com/stjepanDeveloper/weather_app" }]
        },
        {
            title: "Book Notes Web Application",
            description: "Created an online book notes web application, that creates bookmarks for you and keeps track of all the books you have read. It also utilizes the API for book covers so each book entry has it's own genuine book cover. The app also comes with the option to leave comments on the books and rate them as well.",
            imageUrl: "images/booknotesv2.png",
            links: [{ text: "Book Notes Web App", url: "https://github.com/stjepanDeveloper/Book_Notes_WebApp" }]
        },
        {
            title: "Figma Designs",
            description: "Worked and collaborated on multiple Figma projects involving UI/UX design. Translated Figma to HTML/React/Tailwind code. Designed dashboards, buttons, navbar's and much more.",
            imageUrl: "images/figma-designs/Dashboard.png",
            links: [{ text: "View Designs", url: "https://figma.com/@yourprofile" }]
        },
        {
            title: "Online blog Web App",
            description: "Developed a blog application that has multiple features for data management such as post creation, deletion and sorting. Additionaly the posts have a rating system with likes and dislikes and the users are able to leave the comments on the posts.",
            imageUrl: "images/blogapponline.png",
            links: [{ text: "Blog App", url: "https://github.com/stjepanDeveloper/CyberJungle_Blog" }]
        }
    ];


    btns.forEach(btn => {
        btn.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            const data = projectDetails[index];
            
            document.getElementById('modalTitle').textContent = data.title;
            document.getElementById('modalDescription').textContent = data.description;
            document.getElementById('modalImage').src = data.imageUrl;

            const linksContainer = document.getElementById('modalLinks');
            linksContainer.innerHTML = '';  // Clear previous links
            data.links.forEach(link => {
                let iconHTML = "";
                if (link.url.includes("github")) {
                    iconHTML = `<img src="/images/figma-icons/bi_github.svg" style="width: 16px; height: 16px;"> `;
                }
                const anchor = document.createElement('a');
                anchor.href = link.url;
                anchor.innerHTML = iconHTML + link.text; // Include the icon
                anchor.target = '_blank';
                linksContainer.appendChild(anchor);
            });

            modal.style.display = "block";
        });
    });

    // Close modal handlers
    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});
