import { getMovies, getMovieById, getMovieByTitleOMDB, deleteMovie,postMovie,searchMovieByTitleLocal,patchMovie,searchMoviesTMDB,latestMoviesList,showLoader,hideLoader} from "./utils/movies.js"
import {renderModal, renderMovie, renderCategories, renderPoster} from "./renderFunctions.js";

// variable for preloader
const loader = document.getElementById("preloader");
// THIS IS FOR ADD A MOVIE BUTTON FORM
// Get the modal and button elements
const addMovieModal = document.getElementById("addMovieModal");
//button to open the add movie form
const addMovieButton = document.getElementById("addMovieButton");
//button to close modal form
const closeModal = document.getElementById("closeModal");

//button to search movies from API
const searchMovieBtn = document.getElementById("search-movie-btn");
//captures value of search input
let searchInput = document.getElementById("search-movie-input").value;
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
    e.preventDefault();

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
        deleteMovie(e.target.previousElementSibling.value);
        console.log(e.target.previousElementSibling.value);


    });

};

// const searchList = document.getElementById("search-list")
// function findMovie () {
//     let searchTerm = document.getElementById("search-movie-input").value.trim();
//     if (searchTerm.length > 0){
//         searchList.classList.remove("hide-search-list");
//         getMovieByTitleOMDB(searchTerm);
//     } else {
//         searchList.classList.add("hide-search-list")
//     }
// }


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

// function displayMovieList (movies) {
//     searchList.innerHTML = "";
//     for (let i = 0; i < movies.length; i++) {
//         let movieListItem = document.createElement("div");
//         movieListItem.dataset.id = movies[i].imdbID;
//         movieListItem.classList.add("search-list-item");
//         if(movie[i] !== "N/A") {
//             moviePoster = movie[i].poster;
//         } else {
//             moviePoster = "img/no-image.png"
//         }
//
//         searchList.innerHTML = `
//         <div class="search-item-thumbnail">
//             <img src=>
//         </div>
//         <div class="search-item-info">
//             <h4>${movies[i].title}</h4>
//             <p>${movies[i].year}</p>
//         </div>
//         ;`
//         searchList.appendChild(movieListItem);
//
//     }
// }






})();


// poster https://image.tmdb.org/t/p/w500 + poster path
