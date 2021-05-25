import React, { Component } from 'react'
import {Poster} from './index'


import {	
	IMAGE_BASE_URL,
	POSTER_SIZE} from '../config'
import '../css/PosterList.css'

class PosterList extends Component
{
	//the like is poster self controlled or controlled by the home state management?
	renderPoster = ()=>{

		return this.props.movies.map(movie =>{
			const imageSrc = `${IMAGE_BASE_URL}/${POSTER_SIZE}${movie.poster_path}`;
			var liked = true;
			if(this.props.localMovies.length > 0)
			{
				liked = this.props.localMovies.filter(lm => lm.id === movie.id).length > 0;			
			}
			//this.props.localMovies.foreach(x => x.id);
			return(
				<Poster
					key={movie.id} //can not be used for ui, only used for help react to iterate
					id = {movie.id}
					imgSrc = {imageSrc}
					movie={movie}
					title={movie.title}
					overview={movie.overview}
					liked = {liked}
				/>
			)
		})
	};

	render(){
		return(
			<div className="posterList">
				<h3 className="posterList--title">Nouveaux Films</h3>
				<div className="posterList--grid">
					{this.renderPoster()}
				</div>
			</div>
		)
	}
		
}



export {PosterList}