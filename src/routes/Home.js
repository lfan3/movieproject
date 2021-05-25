import React, { Component } from 'react'
import { connect } from 'react-redux'
import {getMovies} from '../actions/movieActionsGenerator'
import '../css/Header.css'
import { HeaderImg, SearchBar, PosterList, LoadButton } from '../components'


class HomeComponent extends Component
{
	componentDidMount()
	{
		this.props.getMoviesProps()
	}
	render(){
		const {imgSrc, title, review, movies, loading, onSearchClick, onButtonClick} = this.props;
		return(
			<div>
				<HeaderImg 
					imgSrc={imgSrc}
					title={title}
					review={review}
				/>
				<SearchBar onSearchClick={onSearchClick}/>
				<PosterList movies={movies} localMovies={this.props.moviesProps}/>
				<LoadButton 
					loading={loading}
					onButtonClick={onButtonClick}
				/>
			</div>
			)
	}
}

const MapStateToProps = state =>{
	return {
		moviesProps : state.movie.movies,
		numberProps: state.movie.number
	}
}
const MapDispatchToProps = dispatch =>{
	return {
		getMoviesProps : ()=>dispatch(getMovies())
	}
}
const Home = connect(MapStateToProps, MapDispatchToProps)(HomeComponent);
export { Home };