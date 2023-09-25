import { getMovies, getMovieById, getMovieByTitleOMDB, deleteMovie,postMovie,searchMovieByTitleLocal,patchMovie,searchMoviesTMDB,latestMoviesList,showLoader,hideLoader} from "./utils/movies.js"
import {renderModal, renderMovie, renderCategories, renderPoster} from "./renderFunctions.js";

// variable for preloader
let loader = document.getElementById("preloader");
// THIS IS FOR ADD A MOVIE BUTTON FORM
// Get the modal and button elements
const addMovieModal = document.getElementById("addMovieModal");
//button to open the add movie form
const addMovieButton = document.getElementById("addMovieButton");
//button to close modal form
const closeModal = document.getElementById("closeModal");

//button to search movies from API
const searchMovieBtn = document.getElementById("search-movie-btn");
// below 4 varialbes capture values from add movie form
const addMovieForm = document.getElementById("movie-form");
let addMovieFormTitle = document.getElementById("title").value;
let addMovieFormrating = document.getElementById("rating").value;
//button to submit the add movie form
const addMovieBtn = document.getElementById("add-movie-btn");
//variable to capture value of add movie form
let newMovieObj;
//event to Show the modal when the button is clicked
addMovieButton.addEventListener("click", () => {
    addMovieModal.style.display = "block";
});

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

// function to delete movie

let deleteMovieBtn = document.getElementsByClassName("delete-movie-btn");

for (let i = 0; i < deleteMovieBtn.length; i++) {

    deleteMovieBtn[i].addEventListener("click", async (e)=>{

        console.log(e.target);
        deleteMovie(e.target.previousElementSibling.value)
        console.log(e.target.previousElementSibling.value);


    });

};

// even listener to search movies from API
searchMovieBtn.addEventListener("click",(e)=>{
    e.preventDefault()
    // variable captures user input to be passed to the searchMoviesTMDB function
    let searchInput = document.getElementById("search-movie-input").value;
    getMovieByTitleOMDB(searchInput);
});

//////////////////////////////////////////////////
//////// MAIN METHOD
(async () => {


    /////////////////////ON LOAD///////////////////
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










})();


// poster https://image.tmdb.org/t/p/w500 + poster path
