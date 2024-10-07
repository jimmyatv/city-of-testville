import { heroItems, eventsItems, newsItems, recordingsItems } from "./data.js";

const burger = document.querySelector('.burger-menu');
const mobileNav = document.querySelector('.mobile-nav');

// SLIDER
const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slide').length;
let slideIndex = 0;

// Move slides
const moveSlide = (direction) => {
    slideIndex = (slideIndex + direction + totalSlides) % totalSlides;
    slides.style.transform = `translateX(${-slideIndex * 100}%)`;
};

// Automatic move every 5s
let autoSlide = setInterval(() => moveSlide(1), 5000);

// Buttons-Events listeners
const createButton = (text, direction) => {
    const button = document.createElement('button');
    button.classList.add(direction === -1 ? 'prev' : 'next');
    button.innerHTML = text;
    button.addEventListener('click', () => {
        moveSlide(direction);
        resetAutoSlide();
    });
    return button;
};

// Add buttons in slider
const slider = document.querySelector('.slider');
slider.append(createButton('&#10094;', -1), createButton('&#10095;', 1));

// Reset auto slide
const resetAutoSlide = () => {
    clearInterval(autoSlide);
    autoSlide = setInterval(() => moveSlide(1), 5000);
};
// END OF SLIDER

// Burger
burger.addEventListener('click', () => {
    burger.classList.toggle('is-active');
    mobileNav.classList.toggle('is-active');

    document.body.classList.toggle('overflow-hidden');
});
// End of burger

// Hero Items
const heroContent = document.querySelector('.hero-content');

let listOfHeroItems = '';

heroItems.forEach((item) => {
    listOfHeroItems += `
        <div class="d-flex gap-10">
            <div>
                <img src="${item.icon}" alt="${item.title}" loading="lazy" />
            </div>

            <div>
                <p class='text-bold'>${item.title}</p>
                <p>${item.subtitle}</p>
            </div>
        </div>
    `
});
heroContent.innerHTML = listOfHeroItems;
// End of hero items


// Upcoming Events
const upcomingEventsContent = document.querySelector('.upcoming-events-content');

let listOfUpcomingEvents = '';

eventsItems.forEach((item) => {
    listOfUpcomingEvents += `
        <div class="d-flex gap-10">
            <div class='events-img'>
                <img src="${item.icon}" alt="${item.title}" loading="lazy" />
            </div>

            <div>
                <h3 class='text-bold'>${item.title}</h3>
                <div class='events-wrapper'>
                    <div class='d-flex align-items-center'>
                            <img class='img-d-none' src="${item.icon2}" alt="${item.title}" loading="lazy" />
                        <span>${item.date}</span>
                    </div>
                    <div class='d-flex align-items-center'>
                        <img src="${item.icon3}" alt="${item.title}" loading="lazy" />
                       <span> ${item.time}</span>
                    </div>
                    <div class='d-flex align-items-center'>
                        <img src="${item.icon4}" alt="${item.title}" loading="lazy" />
                        <span>${item.location}</span>
                    </div>
                </div>
            </div>
        </div>
    `
});

upcomingEventsContent.innerHTML = listOfUpcomingEvents;
// End of upcoming events

// News
const newsContent = document.querySelector('.news-content');

let listOfNews = '';

newsItems.forEach((item) => {
    listOfNews += `
        <div class="overflow-hidden">
            <div>
                <img src="${item.icon}" alt="${item.title}" loading="lazy" />
            </div>

            <div>
                <p>${item.category}</p>
                <h3 class='card-headings'>${item.title}</h3>
                <p>${item.subtitle}</p>
            </div>
        </div>
    `
});

newsContent.innerHTML = listOfNews;
// End of news

// Recordings 
const recordingsContent = document.querySelector('.recordings-content');

let listOfRecordings = '';

recordingsItems.forEach((item) => {
    listOfRecordings += `
        <div class="recording-item gap-10">
            <div class='relative'>
                <div class="video-overlay">
                    <img class="vPlay" src="./images/play.webp" alt="Play image" />
                </div>
                <video poster="${item.thumbnail}" class="video-grayscale" width="340" height="175" controlsList="nodownload noremoteplayback" disablePictureInPicture>
                    <source src="${item.videoSource}" type="video/mp4">
                    <track kind="captions" src="captions.vtt" srclang="en" label="English">
                    Your browser does not support the video tag.
                </video>
                <span class="duration">0:00</span>
            </div>
            <div class='d-flex justify-between'>
                <span>${item.category}</span>
                <span>${item.date}</span>
            </div>
            <h3 class="card-headings">${item.title}</h3>
        </div>
    `;
});

recordingsContent.innerHTML = listOfRecordings;

// Dynamic duration of recordings
document.querySelectorAll('video').forEach(video => {
    video.addEventListener('loadedmetadata', () => {
        let durationElement = video.parentElement.querySelector('.duration');

        let duration = video.duration;
        let minutes = Math.floor(duration / 60);
        let seconds = Math.floor(duration % 60).toString().padStart(2, '0');

        durationElement.textContent = `${minutes}:${seconds}`;
    });
});

// Play control for recordings
document.querySelectorAll('.video-overlay').forEach(overlay => {
    let video = overlay.parentElement.querySelector('video');
    let play = overlay.querySelector('.vPlay');

    overlay.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            play.style.display = 'none';
            video.classList.remove('video-grayscale');
        } else {
            video.pause();
            play.style.display = 'block';
            video.classList.add('video-grayscale');
        }
    });

    video.addEventListener('pause', () => {
        play.style.display = 'block';
        video.classList.add('video-grayscale');
    });

    video.addEventListener('ended', () => {
        video.currentTime = 0;
        play.style.display = 'block';
        video.classList.add('video-grayscale');
    });
});
// End of recordings


// Footer hero content
const footerContent = document.querySelector('.footer-hero-content');

let listOfFooterContent = '';

heroItems.forEach((item) => {
    listOfFooterContent += `
        <ul>
            <li>
                <a href="${item.url}">${item.title}</a>
            </li>
        </ul>
    `
});

footerContent.innerHTML = listOfFooterContent;

// Modal
const subscribeForm = document.querySelector('footer form');
const subscribeModal = document.getElementById('subscribeModal');
const closeSubscribeModal = document.getElementById('closeSubscribeModal');

const handleSubmit = (event) => {
    event.preventDefault(); 
    subscribeModal.style.display = 'block'; 
    document.getElementById('subscribe').value = ''; 

    setTimeout(handleCloseModal, 2000);
};

const handleCloseModal = () => {
    subscribeModal.style.display = 'none'; 
};

subscribeForm.addEventListener('submit', handleSubmit);
closeSubscribeModal.addEventListener('click', handleCloseModal);

window.onclick = (event) => {
    if (event.target === subscribeModal) {
        handleCloseModal(); 
    }
};
// End of modal

// Show More/Hide Contents
let viewAllBtns = document.querySelectorAll('.btn-link');

viewAllBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        const contentClass = btn.parentElement.nextElementSibling;

        contentClass.classList.toggle('show-more');

        //Change tekst
        if (contentClass.classList.contains('show-more')) {
            btn.innerText = btn.innerText.replace('View All', 'Hide All');

        } else {
            btn.innerText = btn.innerText.replace('Hide All', 'View All');
        }
    });
});


// Like / Dislike
let likeDislikeBtn = document.querySelectorAll('.like-dislike button');

likeDislikeBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img');

        if (img.classList.contains('brightness')) {
            img.classList.remove('brightness');
        } else {
            likeDislikeBtn.forEach((button) => {
                const siblingImg = button.querySelector('img');
                siblingImg.classList.remove('brightness');
            });
            img.classList.add('brightness');
        }
    });
});

// Dropdown
const navItemsLevels = document.querySelectorAll('.mobile-nav li');
const dropdown = document.querySelectorAll('.dropdown');

navItemsLevels.forEach((item) => {
    item.addEventListener('click', (event) => {
        event.stopPropagation();

        dropdown.forEach((dropdownItem) => {
            if (dropdownItem !== item.querySelector('.dropdown')) {
                dropdownItem.classList.remove('active');
            }
        });

        const dropdownMenu = item.querySelector('.dropdown');
        if (dropdownMenu) {
            dropdownMenu.classList.toggle('active');
        }

    });
});

// Close dropdowns when clicking outside
document.addEventListener('click', () => {
    dropdown.forEach((dropdownItem) => {
        dropdownItem.classList.remove('active');
    });
});


// Current Year
let currentYear = document.querySelector('.current-year');

currentYear.textContent = new Date().getFullYear();