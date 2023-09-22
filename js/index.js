import { getMovies, getMovieById, getMovieByTitleOMDB, deleteMovie,postMovie,searchMovieByTitleLocal,patchMovie,searchMoviesTMDB,latestMoviesList} from "../js/utils/movies.js"





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
