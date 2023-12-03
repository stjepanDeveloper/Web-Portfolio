document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('.navbar');
    const footer = document.querySelector('footer');
    var lastScrollTop = 0;

    // Smooth scrolling for anchor links
    document.querySelectorAll('.navbar-nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            window.scrollTo({
                top: targetElement.offsetTop - navbar.offsetHeight,
                behavior: 'smooth'
            });

            // Close the navbar after clicking on a link
            document.querySelector('.navbar-collapse').classList.remove('show');
        });
    });

    window.addEventListener('scroll', function () {
        const scrollPosition = window.scrollY;

        // Add 'scrolled' class to navbar when scrolled
        if (scrollPosition > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }

        // Update navbar visibility based on scroll direction
        if (scrollPosition > lastScrollTop) {
            navbar.classList.remove('show');
        } else {
            navbar.classList.add('show');
        }
        lastScrollTop = scrollPosition <= 0 ? 0 : scrollPosition; // For Mobile or negative scrolling

        // Update footer color based on scroll position
        if (scrollPosition + window.innerHeight >= document.body.scrollHeight - 10) {
            footer.style.backgroundColor = '#fff';
            footer.style.color = '#333';
        } else {
            footer.style.backgroundColor = '#333';
            footer.style.color = '#fff';
        }
    });

    // Additional code for collapsing navbar
    const toggleButton = document.querySelector('.navbar-toggler');
    const contentContainer = document.querySelector('.navbar-collapse');

    toggleButton.addEventListener('click', function () {
        contentContainer.classList.toggle('show');

        // Move focus to the content container when it is opened
        if (contentContainer.classList.contains('show')) {
            contentContainer.focus();
        }
    });
});
