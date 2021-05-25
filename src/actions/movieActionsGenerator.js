import {ADD_MOVIE, REMOVE_MOVIE, GET_MOVIES, GET_MOVIES_NUMBER} from './index'

export const addMovie = movie =>{
    let movies = JSON.parse(localStorage.getItem('movies'));
    if(movies){
        let movieIds = movies.map(m => m.id);
        if(movieIds.indexOf(movie.id) === -1){
            movies = [...movies, movie]
        }
    }else{
        movies = [movie];
    }
    localStorage.setItem('movies', JSON.stringify(movies));
    return {
        type: ADD_MOVIE,
        playload: movies
    }
}

export const removeMovie = movie =>{
    let oldMovies = JSON.parse(localStorage.getItem('movies'));
    let movies = oldMovies.filter(m => m.id !== movie.id);
    localStorage.setItem('movies', JSON.stringify(movies));

    return {
        type: REMOVE_MOVIE,
        playload: movies
    }
}
//this send the localmovie to the store
export const getMovies = ()=>{
    //good practise, prevent nullReference
    let movies = JSON.parse(localStorage.getItem('movies')) ?? [];
    return {
        type: GET_MOVIES,
        playload: movies
    }
}

export const getMoviesNumber = ()=>{
    let movies = JSON.parse(localStorage.getItem('movies'));
    let moviesNum = movies ? movies.length : 0;
    return {
        type: GET_MOVIES_NUMBER,
        playload: moviesNum
    }
}