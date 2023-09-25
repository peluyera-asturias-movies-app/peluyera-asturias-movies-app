import { getMovies, getMovieById, getMovieByTitleOMDB, deleteMovie,postMovie,searchMovieByTitleLocal,patchMovie,searchMoviesTMDB,latestMoviesList,showLoader,hideLoader} from "./utils/movies.js"

// function creates and adds moive card to DOM
export const renderModal = (movie) => {
    const modal = document.createElement('div');
    modal.classList.add('custom-modal');
    modal.innerHTML = `
        <div class="custom-modal-bg"></div>
        <div class="custom-modal-content">
            <span class="close" id="closeModal-two" data-bs-dismiss="modal">&times;</span>
            <h2>Edit ${movie.title}</h2>
            <form id="edit-movie-form">
                <label for="description-edit-form">Description:</label>
                <textarea type="text" id="description-edit-form">${movie.overview}</textarea>
                <button id="edit-form-submit-btn" type="submit">Update</button>
            </form>
        </div>
    `;
    const submitBtn = modal.querySelector('#edit-form-submit-btn');
    const closeBtn = modal.querySelector('.close');
    const modalBG = modal.querySelector('.custom-modal-bg');

    submitBtn.addEventListener('click', async ()=>{
        const newDescription = modal.querySelector("#description-edit-form");
        const newDescValue = newDescription.value;
        const movieObj = {
            id: movie.id,
            overview: newDescValue
        }
        try {
            await patchMovie(movieObj);
            modal.remove();
        } catch(error) {
            alert(error);
        }
    });
    closeBtn.addEventListener('click', ()=>{
       modal.remove();
    });
    modalBG.addEventListener('click', ()=>{
        modal.remove();
    });
    document.body.appendChild(modal);
}
export const renderMovie = (movie, target) => {
    const movieCard = document.createElement("article");
    movieCard.classList.add("movie-card");
    movieCard.innerHTML = `
            <div class="title-year">
            <div class=" align-items center">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path ?? "NO IMAGE FOUND" }" class="poster-img" alt="poster-img">
            </div>
            <div class="movie-card-title">${movie.title}</div>
            <p class="movie-card-year">${movie.release_date}</p></div>
            ${movie.overview && `<p class="movie-card-description">${movie.overview}.</p>`}
            <div class="d-flex align-items-center justify-content-between">
                <span class="movie-card-span">Rating</span>
                <span class="movie-card-rating">${movie.vote_average.toFixed()}/10</span>
            </div>
            <meter class="movie-card-meter" min="0" max="10" value="${movie.vote_average}"></meter>
            <div class="d-flex align-items-center justify-content-start gap-10 flex-wrap">
                ${movie.categories && renderCategories(movie.categories)}
            </div>
            <input type="hidden" value="${movie.id}">
            <button  class="edit-movie-btn" data-bs-toggle="modal" data-bs-target="#editModal${movie.id}">Edit Movie</button>
            <button  class="delete-movie-btn">Delete Movie</button>
            
        `;
    // IF we had buttons in here that needed event listeners, we would do it here
    const editBtn = movieCard.querySelector('.edit-movie-btn');
    editBtn.addEventListener('click', ()=>{
        renderModal(movie);
    });
    const deleteBtn = movieCard.querySelector('.delete-movie-btn');
    deleteBtn.addEventListener('click', async ()=>{
        try {
            await deleteMovie(movie.id);
            movieCard.remove();
        } catch (e){
            console.log(e);
        }
    });
    // const editBtn = bookCard.querySelector("button");
    // editBtn.addEventListener("click", async () => {
    //     /// DO THE THANG!
    // });
    // THEN append it into the DOM
    target.appendChild(movieCard);
};

// function assings category based on data
export const renderCategories = (categories = []) => {
    // create a single HTML string made up of all the categories
    const categoriesHTML = categories?.map((category) => `<span class="movie-card-tag">${category}</span>`).join("");
    return categoriesHTML;
};

// function to display movie posters on carousel
export const renderPoster = (movie, target) => {
    const posterCard = document.createElement("div");
    posterCard.classList.add("carousel-item");
    posterCard.innerHTML = `

           <img src="https://image.tmdb.org/t/p/w500${movie.backdrop_path}" class="poster-img-carousel" alt="poster-img">
            
        `;

    target.appendChild(posterCard);
};

