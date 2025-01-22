document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".card");

    function checkVisibility() {
        const windowHeight = window.innerHeight;
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < windowHeight - 100) {
                card.classList.add("show");
            }
        });
    }

    window.addEventListener("scroll", checkVisibility);
    checkVisibility();

    async function loadReviews() {
        try {
            const response = await fetch('reviews.json');
            const data = await response.json();
            const reviews = data.reviews;
            const names = data.names;

            function showRandomReview() {
                const reviewContainer = document.getElementById("reviewCarousel");
                const randomReview = reviews[Math.floor(Math.random() * reviews.length)];
                const randomName = names[Math.floor(Math.random() * names.length)];

                const reviewDiv = document.createElement('div');
                reviewDiv.classList.add('review');
                reviewDiv.innerHTML = `"${randomReview}" - <strong>${randomName}</strong>`;
                reviewContainer.appendChild(reviewDiv);

                setTimeout(() => {
                    reviewDiv.classList.add('active');
                }, 10);

                setTimeout(() => {
                    reviewDiv.classList.remove('active');
                    setTimeout(() => reviewDiv.remove(), 500);
                }, 10000);
            }

            setInterval(showRandomReview, 6000);

        } catch (error) {
            console.error('Ошибка при загрузке отзывов:', error);
        }
    }

    loadReviews();

    const img = document.querySelector('.toilet-image img');
    const description = document.querySelector('.toilet-description');

    img.onload = function () {
        img.classList.add('show');
    };
    
    if (img.complete) {
        img.classList.add('show');
    }

    if (description) {
        description.classList.add('show');
    }
});
