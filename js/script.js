document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            let isValid = true;

            document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

            const firstName = document.getElementById('first-name');
            if (firstName.value.trim() === '') {
                document.getElementById('first-name-error').textContent = 'First Name is required.';
                isValid = false;
            }

            const lastName = document.getElementById('last-name');
            if (lastName.value.trim() === '') {
                document.getElementById('last-name-error').textContent = 'Last Name is required.';
                isValid = false;
            }

            const email = document.getElementById('email');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email.value.trim() === '') {
                document.getElementById('email-error').textContent = 'Email Address is required.';
                isValid = false;
            } else if (!emailPattern.test(email.value.trim())) {
                document.getElementById('email-error').textContent = 'Please enter a valid email address.';
                isValid = false;
            }

            const contactDate = document.getElementById('contact-date');
            if (contactDate.value === '') {
                document.getElementById('contact-date-error').textContent = 'Preferred Contact Date is required.';
                isValid = false;
            } else {
                const selectedDate = new Date(contactDate.value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                if (selectedDate < today) {
                    document.getElementById('contact-date-error').textContent = 'Date cannot be in the past.';
                    isValid = false;
                }
            }

            const service = document.getElementById('service');
            if (service.value === '') {
                document.getElementById('service-error').textContent = 'Please select a service.';
                isValid = false;
            }

            const message = document.getElementById('message');
            if (message.value.trim() === '') {
                document.getElementById('message-error').textContent = 'Message is required.';
                isValid = false;
            } else if (message.value.trim().length < 10) {
                document.getElementById('message-error').textContent = 'Message must be at least 10 characters long.';
                isValid = false;
            }

            if (isValid) {
                alert('Form submitted successfully!');
                contactForm.reset();
            }
        });
    }

    const gallerySpans = document.querySelectorAll('.gallery_span img');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('img01');
    const captionText = document.getElementById('caption');
    const closeBtn = document.querySelector('.modal .close');

    if (gallerySpans.length > 0 && modal && modalImg && captionText && closeBtn) {
        gallerySpans.forEach(img => {
            img.addEventListener('click', function() {
                modal.style.display = 'block';
                modalImg.src = this.src;
                captionText.innerHTML = this.alt;
            });
        });

        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });

        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    const carouselTrack = document.querySelector('.carousel-track');
    const carouselSlides = Array.from(document.querySelectorAll('.carousel-slide'));

    if (carouselTrack && carouselSlides.length > 0) {
        const nextButton = document.querySelector('.carousel-button.next');
        const prevButton = document.querySelector('.carousel-button.prev');
        let currentSlideIndex = 0;
        let slideWidth = carouselSlides[0].getBoundingClientRect().width;

        const setSlidePosition = () => {
            carouselSlides.forEach((slide, index) => {
                slide.style.left = slideWidth * index + 'px';
            });
        };

        const updateCarouselPosition = () => {
            carouselTrack.style.transform = 'translateX(-' + currentSlideIndex * slideWidth + 'px)';
        };

        setSlidePosition();

        window.addEventListener('resize', () => {
            slideWidth = carouselSlides[0].getBoundingClientRect().width;
            setSlidePosition();
            updateCarouselPosition();
        });

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                currentSlideIndex = (currentSlideIndex + 1) % carouselSlides.length;
                updateCarouselPosition();
            });
        }

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                currentSlideIndex = (currentSlideIndex - 1 + carouselSlides.length) % carouselSlides.length;
                updateCarouselPosition();
            });
        }
    }
});
const images = document.querySelectorAll('.moving-image');
let positions = [-200, -500, -800, -1100, -1400];
const speed = 2;

function animate() {
  images.forEach((img, i) => {
    positions[i] += speed;
    img.style.left = positions[i] + 'px';
    if (positions[i] > window.innerWidth) {
      positions[i] = -img.offsetWidth;
    }
  });
  requestAnimationFrame(animate);
}

animate();
