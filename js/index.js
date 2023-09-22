import { getMovies, getMovieById, getMovieByTitleOMDB, deleteMovie,postMovie,searchMovieByTitleLocal,patchMovie,searchMoviesTMDB,latestMoviesList} from "../js/utils/movies.js"

// THIS IS FOR ADD A MOVIE BUTTON
// Get the modal and button elements
const addMovieModal = document.getElementById("addMovieModal");
const addMovieButton = document.getElementById("addMovieButton");
const closeModal = document.getElementById("closeModal");

// Show the modal when the button is clicked
addMovieButton.addEventListener("click", () => {
    addMovieModal.style.display = "block";
});

// Close the modal when the close button is clicked
closeModal.addEventListener("click", () => {
    addMovieModal.style.display = "none";
});

// Close the modal when clicking outside the modal
window.addEventListener("click", (event) => {
    if (event.target == addMovieModal) {
        addMovieModal.style.display = "none";
    }
});

// Prevent the form from submitting (you can add your logic here)
document.getElementById("movieForm").addEventListener("submit", (event) => {
    event.preventDefault();
    // Add your movie addition logic here
    // For now, let's just close the modal
    addMovieModal.style.display = "none";
});

// // EDIT A MOVIE BUTTON
// Function to display the edit modal with movie details
// Get the modal and button elements
const editMovieModal = document.getElementById("editMovieModal");
const editMovieButton = document.getElementById("editMovieButton");
const closeModalTwo = document.getElementById("closeModal-two");

// Show the modal when the button is clicked
editMovieButton.addEventListener("click", () => {
    editMovieModal.style.display = "block";
});

// Close the modal when the close button is clicked
closeModalTwo.addEventListener("click", () => {
    editMovieModal.style.display = "none";
});

// Close the modal when clicking outside the modal
window.addEventListener("click", (event) => {
    if (event.target == editMovieModal) {
        editMovieModal.style.display = "none";
    }
});

// Prevent the form from submitting (you can add your logic here)
document.getElementById("movieForm-two").addEventListener("submit", (event) => {
    event.preventDefault();
    // Add your movie addition logic here
    // For now, let's just close the modal
    editMovieModal.style.display = "none";
});



//////// MAIN METHOD
(async () => {

    // const preloader = document.querySelector('.preloader');
    //
    // const fadeEffect = setInterval(() => {
    //     // if we don't set opacity 1 in CSS, then   //it will be equaled to "", that's why we   // check it
    //     if (!preloader.style.opacity) {
    //         preloader.style.opacity = 3;
    //     }
    //     if (preloader.style.opacity > 0) {
    //         preloader.style.opacity -= 0.5;
    //     } else {
    //         clearInterval(fadeEffect);
    //     }
    // }, 400);



    const renderCategories = (categories = []) => {
        // create a single HTML string made up of all the categories
        const categoriesHTML = categories?.map((category) => `<span class="movie-card-tag">${category}</span>`).join("");
        return categoriesHTML;
    };
    const renderMovie = (movie, target) => {
        const movieCard = document.createElement("article");
        movieCard.classList.add("movie-card");
        movieCard.innerHTML = `
            <div class="movie-card-title">${movie.title ?? "movie title goes here"}</div>
            <p class="movie-card-year">${movie.release_date ?? "Movie year goes here"}</p>
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="poster-img" alt="poster-img">
            ${movie.overview && `<p class="movie-card-description">${movie.overview}.</p>`}
            <div class="d-flex align-items-center justify-content-between">
                <span class="movie-card-span">Rating</span>
                <span class="movie-card-rating">${movie.vote_average.toFixed()}/10</span>
            </div>
            <meter class="movie-card-meter" min="0" max="10" value="${movie.vote_average}"></meter>
            <div class="d-flex align-items-center justify-content-start gap-10 flex-wrap">
                ${movie.categories && renderCategories(movie.categories)}
            </div>
        `;
        // IF we had buttons in here that needed event listeners, we would do it here
        // const editBtn = bookCard.querySelector("button");
        // editBtn.addEventListener("click", async () => {
        //     /// DO THE THANG!
        // });
        // THEN append it into the DOM
        target.appendChild(movieCard);
    };


    ////
    const movies = await getMovies();
    console.log(movies);
    for (let movie of movies) {
        const target = document.querySelector(".movies-grid");
        renderMovie(movie, target);

    }


let searchResult = await searchMoviesTMDB(NaN)

let movieToAdd = searchResult.results[0]






})();

/// build form to add movie

// build option to get all movies

// build input to search for movie

// build input to delete movie

// build input to patch movie


// movie parameters to grab
// title, id, genre, overview, poster,date
// poster https://image.tmdb.org/t/p/w500 + poster path
