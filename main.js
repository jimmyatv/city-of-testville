import { heroItems, eventsItems, newsItems, recordingsItems } from "./data.js";

const burger = document.querySelector('.burger');
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
            <div>
                <img src="${item.icon}" alt="${item.title}" loading="lazy" />
            </div>

            <div>
                <p class='text-bold'>${item.title}</p>
                <div class='events-wrapper'>
                    <p>${item.date}</p>
                    <p>${item.time}</p>
                    <p>${item.location}</p>
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
        <div>
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
                <video controls poster="${item.thumbnail}" width="340" height="175" controlsList="nodownload noremoteplayback" disablePictureInPicture>
                    <source src="${item.videoSource}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <span class="duration">${item.videoDuration}</span>
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
// End of recordings

// Footer hero content
const footerContent = document.querySelector('.footer-hero-content');

let listOfFooterContent = '';

heroItems.forEach((item) => {
    listOfFooterContent += `
        <ul>
            <li>
                <a>${item.title}</a>
            </li>
        </ul>
    `
});

footerContent.innerHTML = listOfFooterContent;
// End of hero content



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

        // Check if alredy has that class
        if (img.classList.contains('brightness')) {
            // If it does rimove 
            img.classList.remove('brightness');
        } else {
            // Remove 'brightness'
            likeDislikeBtn.forEach((button) => {
                const siblingImg = button.querySelector('img');
                siblingImg.classList.remove('brightness');
            });
            // Add 'brightness'
            img.classList.add('brightness');
        }
    });
});
