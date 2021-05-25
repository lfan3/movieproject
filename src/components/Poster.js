import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import {Link} from 'react-router-dom'
import { addMovie, removeMovie } from '../actions/movieActionsGenerator'
import { connect } from 'react-redux'
import '../css/Poster.css';

//problem:click the like on image, it goes to detail, not good
class PosterComponent extends Component
{
	state={
		hover : false,
	}
	showOverlay = ()=>{
		if(this.state.hover === false)
		{
			this.setState({hover:true})
		}
	}
	hideOverlay = ()=>{
		this.setState({hover:false})
	}
	removeFromLike = ()=>{
		console.log("remove from the like");
		this.props.removeMovieProps(this.props.movie)
	}
	addToLike=()=>{
		console.log("add to like");
		this.props.addMovieProps(this.props.movie)
	}
	render(){
		return(
			<div className="poster"
				onMouseEnter={this.showOverlay}
				onMouseLeave={this.hideOverlay}
			>
				<Link to ={{pathname:`/${this.props.id}`}} >
					<img className="poster--img" src={this.props.imgSrc} alt='poster'/>
				</Link>
				{this.state.hover?
					<div className="poster--overlay">
						<h3 className="poster--overlay__text"> I like it </h3>
						{this.props.liked
						?	<FontAwesome onClick={this.removeFromLike} name="heart" className="poster--icon" size="3x"/>
						:   <FontAwesome onClick={this.addToLike} name="heart-o" className="poster--icon_not" size="3x"/>
						}
					</div>
					: null}
			</div>
			)
	}
		
}

const MapStateToProps = state =>{
	return {
		moviesProps: state.movie.movies
	}
}

const MapDispatchToProps = dispatch =>{
	return {
		removeMovieProps: (movie) => dispatch(removeMovie(movie)),
		addMovieProps : (movie) => dispatch(addMovie(movie)),
	}
}

const Poster = connect(MapStateToProps, MapDispatchToProps)(PosterComponent)
export {Poster}