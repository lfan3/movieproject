import React, { Component } from 'react';
import {VideoPlayer, MvPlayerList, Spinner} from '../components';
import { connect } from 'react-redux'
import { getMovies } from '../actions/movieActionsGenerator'
import { calcTime } from '../utils/helpers';
import {	
	APIUrl,
	APIKey,
	IMAGE_BASE_URL,
	POSTER_SIZE
} from '../config';
import '../css/MoviePlayer.css'
import _ from "lodash";

const videoUrl = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

const selectedMovie = {
    duration : "2h",
    id:1,
    imageUrl:`${IMAGE_BASE_URL}/${POSTER_SIZE}/hm58Jw4Lw8OIeECIq5qyPYhAeRJ.jpg`,
    position:1,
    title:"soal",
    videoUrl
};


//movies hiere are local movies stocked on localstockage
//selectedMovie is the one that we use videoplayer to play, the steaming one

class MoviePlayerComponent extends Component
{
    state = {
        movies : [],
        selectedMovie : {},
        loading: true
    }
    //todo: think the case if the localstockage is empty, need to create an api to return the videoUrl
    async componentDidMount(){
        const localMovies = JSON.parse(localStorage.getItem('movies'))?? [];
        const results = await this.renewMovies;
        //based on localstocakge not state
        const newMovies = localMovies.map((mv, index)=>{
                return ({
                    duration : results[index],
                    id:mv.id,
                    imageUrl:`${IMAGE_BASE_URL}/${POSTER_SIZE}/${mv.backdrop_path}`,
                    position:index + 1,
                    title:mv.title,
                    videoUrl
                });
            })
        const {match : {params}} = this.props;
        const movieId = params.id;
        this.updateSelectedMovie(newMovies, movieId);
        this.setState({
            movies : newMovies,
            loading:false
        });
    }
    /* key that i do not understand, when the props of updated componentDidUpdate is called, so when url is changed, componentDidUpdate is called*/
    /* link to url and didupdate to change*/
    /* use componentDidUpdate when the state is changed , here the selectedMovie is changed*/
    componentDidUpdate(prevProps, prevState)
    {
        if(prevProps.match.params.id != this.props.match.params.id)
        {
            this.updateSelectedMovie(prevState.movies, this.props.match.params.id);
        }
    }
    endedHandler = ()=>{
        //play automatiquement the next film
        console.log("end handler");
    }

    updateSelectedMovie =(movies,movieId)=>{
        if(movieId !== undefined)
        {
            let selectedMovie = _.find(movies, {id : parseInt(movieId)});
            this.setState({
                selectedMovie,
            });
            this.props.history.push(`/player/${movieId}`);
        }else{
            this.setState({
                selectedMovie: movies[0],
            });
        }
    }

    renewMovies = (oldMoviesArray)=>{
        //WHAT OF OLDMOVE IS EMPTY?
        const promiseArray = oldMoviesArray.map(om =>this.getMovie(om.id)) ?? [];
        return Promise.all(promiseArray);
    }

    //service logic
    getMovie = (movieId)=>{
        const movieUrl = `${APIUrl}/movie/${movieId}?api_key=${APIKey}&language=en-US`;

        return new Promise((resolve, reject)=>{
            fetch(movieUrl)
            .then(response=>response.json())
            .then(data => resolve(calcTime(data.runtime)))
            .catch(error => reject(error))
        })
    }
    render(){
        const{loading, selectedMovie, movies} = this.state;
        return(
            <div className="moviePlayer">
            {
                loading 
                ?<Spinner/>
                :(
                    <>
                        <VideoPlayer
                            videoUrl = {selectedMovie.videoUrl}
                            imageSrc = {selectedMovie.imageSrc}
                            endedHandler = {this.endedHandler}
                        />
                        <MvPlayerList
                            movies = {movies}
                            selectedMovie = {selectedMovie}
                            id = {movies.id}
                        />
                    </>
                )
            }

            </div>
        )
    }
}

const MapStateToProps = state =>{
    return {
        moviesProps : state.movie.movies
    }
}

const MapDispatchToProps = dispatch =>{
    return {
        getMovieProps: ()=>dispatch(getMovies())
    }
}

const MoviePlayer = connect(MapStateToProps, MapDispatchToProps)(MoviePlayerComponent);
export {MoviePlayer};