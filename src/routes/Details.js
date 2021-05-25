import React, { Component } from 'react';
import {HeaderDetails, Spinner, ActorList} from '../components';
import { calcTime, convertMoney } from '../utils/helpers';
import {	
	APIUrl,
	APIKey,
	IMAGE_BASE_URL,
	POSTER_SIZE
} from '../config';

class Details extends Component
{
    state = {
        loading: true,
        actors :[],
        mTitle : "",
        mDesc : "",
        imgSrc :"",
        runtime : "",
        revenue :"",
        status:"",
        vote:""
    }
    componentDidMount(){
        //const movieId = this.props.match.params.id; pay attention the route inside App, render func inorder to get match//all the things related with url

        const movieId = this.props.match.params.id;
        this.getFilm(movieId).then((movieData)=>{
            const {revenue, runtime, title, overview, status, vote_average, poster_path} = movieData;
            console.log(movieData);
            this.setState({
                mTitle : title,
                mDesc : overview,
                imgSrc :`${IMAGE_BASE_URL}/${POSTER_SIZE}${poster_path}`,
                runtime : calcTime(runtime),
                revenue :convertMoney(revenue), //problem revenue is doller, but here i show euro
                status:status,
                vote:Math.round(vote_average/2)
            }, ()=>{
                const url = `${APIUrl}/movie/${movieId}/credits?api_key=${APIKey}&language=en-US`;
                fetch(url)
                .then(res => {
                    return res.json();
                })
                .then(data => {
                  
                    const actors = data.cast;
                    this.setState({actors: actors, loading:false}, ()=> console.log(this.state))
                })
                .catch(error =>{
                    console.log("error in details setStat callback function" + error);
                })
            })
        })
        
    }
    //service logic, amelioration, reuse the logic
    getFilm = async(movieId)=>{
        const url = `${APIUrl}/movie/${movieId}?api_key=${APIKey}&language=en-US`;
        //get video https://api.themoviedb.org/3/movie/297762/videos?api_key=###
        let res = await fetch(url);
        try{
            if(res.ok){
                let data = await res.json();
                return data;
            }else{
                return 'Error'
            }
        }catch(e){
            console.log("error "+ e.message);
        }
    }

    render(){
        const {actors,mTitle, mDesc, imgSrc,runtime,revenue,status,vote} = this.state;
        return(
      
            <div className="detailPage">
                {
                    this.props.loading
                    ? <Spinner/>
                    :(
                        <>
                        <HeaderDetails
                            mTitle = {mTitle}
                            mDesc={mDesc}
                            imgSrc= {imgSrc}
                            runtime={runtime}
                            revenue={revenue}
                            status={status}
                            vote={vote}
                        />
                        <ActorList
                            actors = {actors}
                        />
                        </>
                    )
                }
            </div>
        )
    }
}

export {Details};