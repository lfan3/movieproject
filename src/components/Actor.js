import React, { Component } from 'react';
import {	
	IMAGE_BASE_URL,
	POSTER_SIZE
} from '../config'
import '../css/Actor.css';

//WHY ACTORE USE CLASS?? THE OTHERS ARE FUNCTIONAL COMPONENT
class Actor extends Component
{
    state = {
        hover : false
    }
    HoverOn = ()=>{
        this.setState({hover : true});
    }
    HoverOff = ()=>{
        this.setState({hover: false});
    }
    render(){
        const names = this.props.name?? "Unknown";
        const name = names.split(" ");

        const imgSrc = this.props.imgSrc ? `${IMAGE_BASE_URL}/${POSTER_SIZE}/${this.props.imgSrc}`: './images/titanic.jpg';
        return(
            <div className='actor' onMouseEnter={()=>this.HoverOn()} onMouseLeave={()=>this.HoverOff()}>
                <img className="actor--img" alt="actor" src={imgSrc} height="300"/>
                {
                    this.state.hover 
                    ? (
                        <div className="actor--overlay">
                            <h3 className="actor--name">{name[0]}</h3>
                            <h3 className="actor--name">{name[1]}</h3>
                        </div>
                    )
                    : null
                }
            </div>
        )
    }
}

export {Actor}