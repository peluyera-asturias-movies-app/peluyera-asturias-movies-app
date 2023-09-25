import { getMovies, getMovieById, getMovieByTitleOMDB, deleteMovie,postMovie,searchMovieByTitleLocal,patchMovie,searchMoviesTMDB,latestMoviesList,showLoader,hideLoader} from "../js/utils/movies.js"


//////// MAIN METHOD
(async () => {







// THIS IS FOR ADD A MOVIE BUTTON FORM
// Get the modal and button elements
const addMovieModal = document.getElementById("addMovieModal");
//button to open the add movie form
const addMovieButton = document.getElementById("addMovieButton");
//event to Show the modal when the button is clicked
addMovieButton.addEventListener("click", () => {
addMovieModal.style.display = "block";
});
//button to close modal form
const closeModal = document.getElementById("closeModal");
// Close the modal when the close button is clicked
//event to close the add movie form
closeModal.addEventListener("click", () => {
    addMovieModal.style.display = "none";
});

// Close the modal when clicking outside the modal
window.addEventListener("click", (event) => {
    if (event.target == addMovieModal) {
        addMovieModal.style.display = "none";
    }
});

//////////////////////////////// ADD MOVIE

//variable to capture value of add movie form
let newMovieObj;

// below 4 varialbes capture values from add movie form
let addMovieForm = document.getElementById("movie-form")
let addMovieFormTitle = document.getElementById("title").value;
let addMovieFormrating = document.getElementById("rating").value;



//button to submit the add movie form
let addMovieBtn = document.getElementById("add-movie-btn");
// event to add movie to favorites when btn clicked
addMovieBtn.addEventListener("click", (e)=>{
    e.preventDefault()

    newMovieObj = {
        title: addMovieForm[0].value,
        vote_average: Number(addMovieForm[1].value)
    };
    console.log(newMovieObj);
    postMovie(newMovieObj);


});
//////////////////////////////////////////////////






//button to submit the search movie
// let searchMovieBtn = document.getElementById("search-movie-btn");





//////////////////////////// // EDIT MOVIE FORM

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
/////////////////////////////////////////////////



///////////////////////////// EDIT MOVIE
let editMovieForm = document.getElementById("edit-movie-form");

let editMovieFormBtn = document.getElementById("edit-form-submit-btn");

let editMovieObj;

editMovieFormBtn.addEventListener("click", (e)=>{
    e.preventDefault();

    editMovieObj = {
        title: editMovieForm[0].value,
        release_date: editMovieForm[1].value,
        overview: editMovieForm[2].value
    }
    console.log(editMovieObj);
    //FUNCTION TO PATCH MOVIE GOES HERE
    //patchMovie();

});






    // variable for preloader
    let loader = document.getElementById("preloader")


    // window.addEventListener("load",preLoader)



    // function creates and adds moive card to DOM
    const renderMovie = (movie, target) => {
        const movieCard = document.createElement("article");
        movieCard.classList.add("movie-card");
        movieCard.innerHTML = `
            <div class="movie-card-title">${movie.title}</div>
            <p class="movie-card-year">${movie.release_date}</p>
            <div class="d-flex, full-width, heigth align-items center">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path ?? "NO IMAGE FOUND" }" class="poster-img" alt="poster-img">
            </div>
            ${movie.overview && `<p class="movie-card-description">${movie.overview}.</p>`}
            <div class="d-flex align-items-center justify-content-between">
                <span class="movie-card-span">Rating</span>
                <span class="movie-card-rating">${movie.vote_average.toFixed()}/10</span>
            </div>
            <meter class="movie-card-meter" min="0" max="10" value="${movie.vote_average}"></meter>
            <div class="d-flex align-items-center justify-content-start gap-10 flex-wrap">
                ${movie.categories && renderCategories(movie.categories)}
            </div>
            <button  class="delete-movie-btn">Delete Movie</button>
        `;
        // IF we had buttons in here that needed event listeners, we would do it here
        // const editBtn = bookCard.querySelector("button");
        // editBtn.addEventListener("click", async () => {
        //     /// DO THE THANG!
        // });
        // THEN append it into the DOM
        target.appendChild(movieCard);
    };
    // function assings category based on data
    const renderCategories = (categories = []) => {
        // create a single HTML string made up of all the categories
        const categoriesHTML = categories?.map((category) => `<span class="movie-card-tag">${category}</span>`).join("");
        return categoriesHTML;
    };


    // function to display movie posters on carousel
    const renderPoster = (movie, target) => {
        const posterCard = document.createElement("div");
        posterCard.classList.add("carousel-item");
        posterCard.innerHTML = `

           <img src="https://image.tmdb.org/t/p/w500${movie.backdrop_path}" class="poster-img" alt="poster-img">
            
        `;

        target.appendChild(posterCard);
    };



    //// displays card on load
    const movies = await getMovies();
    console.log(movies);
    for (let movie of movies) {
        const target = document.querySelector(".movies-grid");
        renderMovie(movie, target);
    };


    ///// displays lates movies carousel
    const posters = await latestMoviesList();
    for (let poster of posters.results) {
        const target = document.querySelector("#carousel");
        renderPoster(poster, target);
    };



    // NEED TO FINISH function to delete movie

    let deleteMovieBtn = document.getElementsByClassName("delete-movie-btn");

    for (let i = 0; i < deleteMovieBtn.length; i++) {

        deleteMovieBtn[i].addEventListener("click", async (e)=>{

            let parent = document.getElementsByClassName("movie-card")

            console.log(e.target);
            // deleteMovie(e)
            console.log(e);
            // getMovies()

        })

    }

    
    
    
    
    





})();


// poster https://image.tmdb.org/t/p/w500 + poster path
