import React from 'react'
import {Actor} from './index'
import '../css/ActorList.css';

const ActorList = (props)=>{
    const renderActor = ()=>{
        return props.actors.map((actor, i)=>{
            return (
                <Actor key={i} name={actor.original_name} imgSrc={actor.profile_path}/>
            )
        })
    }
    return(
        <div className="actorList">
            <h3 className="actorList--title">ACTEURS</h3>
            <div className="actorList--grid">{renderActor()}</div>
        </div>
    )
}

export {ActorList}