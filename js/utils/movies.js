import {TMDB_API_KEY,OMDB_API_KEY} from "../keys.js";

// below functions is for TMDB
const searchMoviesTMDB = async (query) => {
    // get the movies from the API
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    const response = await fetch(url);
    const movies = await response.json();
    console.log(movies);
    return movies;
}
// funcion to get the latest movies list // tested works!!!
const latestMoviesList = async () =>{
    const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=${TMDB_API_KEY}`
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            // Authorization: `Bearer ${TMDB_API_KEY}`
        }
    };

    const response = await fetch(url, options)
    const movies = await response.json();
    console.log(movies);
    return movies;
    // .catch(err => console.error(err));

};

//////////////////////////////////LOCAL (FAVORITES) ////////////////////////////////////////////////////////////////

//function to search movie by tittle
const getMovieByTitleOMDB = async (title) => {
    const url = `https://www.omdbapi.com/?plot=full&s=${title}&page=1&type=movie&apikey=${OMDB_API_KEY}`;
    const options = {
        method: "GET",

    };
    const response = await fetch(url, options);
    const movie = await response.json();
    console.log(movie);
    return movie;
};

// function gets all movies saved in favorites
const getMovies = async () => {
    const url = "http://localhost:3000/movies";
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await fetch(url, options);
    const movies= await response.json();
    // console.log(movies);
    return movies;
};

// function gets movie from favorites by id
const getMovieById = async (id) => {
    const url = `http://localhost:3000/movies/${id}`;
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await fetch(url, options);
    const movie = await response.json();
    console.log(movie);
    return movie;
};

// function deletes movie by id with btn
const deleteMovie = async (id) => {
    const url = `http://localhost:3000/movies/${id}`;
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await fetch(url, options);
    const movie = await response.json();
    console.log(movie);
    return movie;
};

// function to search movie in favorites
const searchMovieByTitleLocal = async (title) => {
    const url = `http://localhost:3000/movies?title=${title}`;
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await fetch(url, options);
    const movie = await response.json();
    console.log(movie);
    return movie;
};

// function to post movie into favorites
const postMovie = async (movie) => {
    try {
        //todo: validate movie isn't already in the db
        // const searchResult = await searchMovieByTitleLocal(movie.title);
        // if (searchResult.length > 0) {
        //     // book already exists
        //     // throw error
        //     throw new Error("Book already exists in the database");
        // }
        const url = `http://localhost:3000/movies`;
        const body = movie;
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        const response = await fetch(url, options);
        const newId = await response.json();
        return newId;
    } catch (error) {
        console.log(error);
        return null;
    }
};

//function to patch edit movie
const patchMovie = async (movie) => {
    try {
        const url = `http://localhost:3000/movies/${movie.id}`;
        const body = {...movie};
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        };
        const response = await fetch(url, options);
        const newId = await response.json();
        console.log(newId);
        return newId;
    } catch (error) {
        console.log(error);
        return null;
    }
};









export { getMovies, getMovieById, getMovieByTitleOMDB, deleteMovie,postMovie,searchMovieByTitleLocal,patchMovie,searchMoviesTMDB,latestMoviesList};