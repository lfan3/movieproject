import {	
	APIUrl,
	APIKey,
} from '../config';
import React from 'react'

export default class GetFilmWithCondition extends React.Component{
    //data is object or string when error occurs
    state = {
        data : {}
    }
    //try 
    //TODO: see the url, if the url contains detail, isVido = false, if the contains player then isVideo = true
    getFilm = async(movieId, isVideo)=>{
        const url = isVideo
        ? `${APIUrl}/movie/${movieId}?api_key=${APIKey}&language=en-US`
        :`${APIUrl}/movie/${movieId}/videos?api_key=${APIKey}&language=en-US`;
        let res = await fetch(url);
        try{
            if(res.ok){
                let data = await res.json();
                return this.setState({data});
            }else{
                return this.setState({data:{error:"Error"}})
            }
        }catch(e){
            console.log("error "+ e.message);
            return this.setState({data: {error:"Error in getting data"}})
        }
    }
    render()
    {
        return(
            <>
                {this.props.children(this.state.data)}
            </>
        )
    }
 
}


