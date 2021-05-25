import React, { Component } from 'react'
import { connect } from 'react-redux'
import FontAwesome from 'react-fontawesome'
import {Link} from 'react-router-dom'
import '../css/Header.css'
import { getMoviesNumber } from '../actions/movieActionsGenerator'

class HeaderComponent extends Component
{
	render(){
		return(
			<div className="header">
                <Link to={{pathname:'/'}} style={{textDecoration:"none"}}>
                    <FontAwesome className="header--movie" name="film" size="5x" />
                </Link>

                <Link to={{pathname:'/'}} style={{textDecoration:"none", color:'red'}}>
                    <h3>NETFLIX</h3>
                </Link>

                <Link to={{pathname:'/player'}}>
                    <FontAwesome className="header--heart" name="heart" size="5x" />
                    <div className="header--badge">{this.props.number}</div>
                </Link>
            </div>
			)
	}
}

const mapStateToProps = state =>{
    return {
        number: state.movie.number
    }
}

const mapDispatchToProps = dispatch=>{
    return {
        getNumber : () => dispatch(getMoviesNumber())
    }
}
const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
export {Header};