import React, { Component } from 'react';
import { MvPlayerListItem } from './MvPlayerListItem';

import '../css/MvPlayerList.css'

class MvPlayerList extends Component
{
    renderList = (props)=>{
        return props.movies.map((movie, i) =>{
            const active = props.selectedMovie.id === movie.id;
            return (
                //item toujours avec un id
            <MvPlayerListItem
                {...movie}
                key = {movie.id}
                number = {i + 1}
                title = {movie.title}
                time = {movie.time} 
                active = {active}
            />)
        })
    }

    render(){
        const position = "1";
        const total = "10";
        return(
            <div className="mvPlayerList">
                <div className="mvPlayerList--header">
                    <h3>{this.props.selectedMovie.title}</h3>
                    <div className="mvPlayerList--badge">{position}/{total}</div>
                </div>
                <div className="mvPlayerList--list">
                    {this.renderList(this.props)}
                </div>
            </div>

        )
    }
}

export {MvPlayerList};