import {ADD_MOVIE, REMOVE_MOVIE, GET_MOVIES, GET_MOVIES_NUMBER} from '../actions'

//this is the collection of the liked movies
const initState = {
    movies : [],
    number: 0
}

export const movieReducer = (state=initState, action) =>{
    switch(action.type){
        case ADD_MOVIE:
            return {
                movies:action.playload,
                number:action.playload.length
            };
        case REMOVE_MOVIE:
            return {
                movies:action.playload,
                number:action.playload.length
            };
        case GET_MOVIES:
            return {
                movies:action.playload,
                number:action.playload.length
            };
        case GET_MOVIES_NUMBER:
            return {
                number:action.playload
            };       
        default:
            return state
    }
}

