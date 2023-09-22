import {getMovieById,getMovies,getMovieByTitleOMDB,deleteMovie,postMovie,searchMovieByTitleLocal,patchMovie } from "./utils/movies.js"
import {TMDB_API_KEY} from "./keys.js";

const preloader = document.querySelector('.preloader');

const fadeEffect = setInterval(() => {
    // if we don't set opacity 1 in CSS, then   //it will be equaled to "", that's why we   // check it
    if (!preloader.style.opacity) {
        preloader.style.opacity = 3;
    }
    if (preloader.style.opacity > 0) {
        preloader.style.opacity -= 0.5;
    } else {
        clearInterval(fadeEffect);
    }
}, 400);

window.addEventListener('load', fadeEffect);
const renderCategories = (categories) => {
    // create a single HTML string made up of all the categories
    const categoriesHTML = categories.map((category) => `<span class="book-card-tag">${category}</span>`).join("");
    return categoriesHTML;
};
const renderBook = (book, target) => {
    const bookCard = document.createElement("article");
    bookCard.classList.add("book-card");
    bookCard.innerHTML = `
        <div class="book-card-title">${book.title}</div>
        <p class="book-card-year">${book.year}</p>
        <p class="book-card-description">${book.description}.</p>
        <div class="d-flex align-items-center justify-content-between">
            <span class="book-card-span">Rating</span>
            <span class="book-card-rating">${book.rating}/10</span>
        </div>
        <meter class="book-card-meter" min="0" max="10" value="${book.rating}"></meter>
        <div class="d-flex align-items-center justify-content-start gap-10 flex-wrap">
            ${renderCategories(book.categories)}
        </div>
    `;
    // IF we had buttons in here that needed event listeners, we would do it here
    // const editBtn = bookCard.querySelector("button");
    // editBtn.addEventListener("click", async () => {
    //     /// DO THE THANG!
    // });
    // THEN append it into the DOM
    target.appendChild(bookCard);
};

//////// MAIN METHOD
(async () => {
    /////
    // const books = await getBooks();
    // console.log(books);
    // for (let book of books) {
    //     const target = document.querySelector(".books-grid");
    //     renderBook(book, target);
    // }

// loading demo










})();

/// build form to add movie

// build form to get all movies

// build input to search for movie

// build input to delete movie

// build input to patch movie

