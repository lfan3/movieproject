import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import { Header } from './components'
import { Home, Details,MoviePlayer, Login, NotFound } from './routes'
import {AuthFireBase} from './utils/firebase-conf'
import {Provider} from 'react-redux'
import store from './store'
import {	
	APIUrl,
	APIKey,
	IMAGE_BASE_URL,
	POSTER_SIZE
} from './config'

/**todo:
 * add css to movieplayer related
 * selectedMovie inside MoviePlayer.js
 * route conflit
*/
class App extends Component {
  state = {
  	movies:[],
  	loading:true,
  	badge: 15,
  	imgSrc:'',
  	title:'',
  	review:'',
  	activePage:0,
  	totalPage:0,
  	searchText: ''
  }
  componentWillMount(){
  	console.log("ComponentwillMount before inital rendering")
  }
  componentDidMount(){
	//AuthFireBase();
  	console.log("ComponentdidMount after inital rendering")
  	this.loadMovies()
  	.then(res => {
  		const {results, page, total_results, total_pages} = res;
  		this.setState({
  			movies:results,
  			loading:false,
  			imgSrc:`${IMAGE_BASE_URL}/${POSTER_SIZE}${results[0].backdrop_path}`,
  			title:results[0].original_title,
  			review: results[0].overview,
  			activePage:page,
  			total_pages:total_pages,
  		})
  	});
  }
  componentWillReceiveProps()
  {
  	console.log("componentWillReceiveProps will Receive new props")
  }
  shouldComponentUpdate()
  {
  	console.log("shouldComponentUpdate returns false to prevent update")
  	return true;
  }
  componentWillUpdate()
  {
  	console.log("componentWillUpdate before rendering, after receiving props or state")
  }
  componentDidUpdate()
  {
  	console.log("componentDidUpdate after update");
  }
  componentWillUnmount()
  {
  	console.log("componentWillUnmount");
  }
  //service logic
  loadMovies = async ()=>{
  	const page = this.state.activePage + 1;
  	const url = `${APIUrl}/movie/popular?api_key=${APIKey}&language=en-US&page=${page}`;
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
  //ui logic
  loadMoreMovies = async ()=>{
  	this.setState({loading : true});
  	const {results, page, total_results, total_pages} = await this.loadMovies();
  	this.setState({
  		movies:[...this.state.movies, ...results],
  		loading:false,
  		imgSrc:`${IMAGE_BASE_URL}/${POSTER_SIZE}${results[0].backdrop_path}`,
  		title:results[0].original_title,
  		review: results[0].overview,
  		activePage:page,
  		total_pages:total_pages,
  	})
  }
  //service logic
  searchFilm = async(searchText)=>{
  	const url = `${APIUrl}/search/movie?api_key=${APIKey}&query=${searchText}&language=en-US`;
  	let res = await fetch(url);
  	try{
  		if(res.ok){
  			let data = await res.json();
  			console.log(data);
  			return data;
  		}else{
  			return 'Error'
  		}
  	}catch(e){
  		console.log("error "+ e.message);
  	}
  }
  //ui logic
  handleSearch =  async (val)=>{
  	//console.log(val)
  	const {results, page, total_results, total_pages} = await this.searchFilm(val);
  	this.setState({
  		loading:false, 
  		movies: results,
  		imgSrc:`${IMAGE_BASE_URL}/${POSTER_SIZE}${results[0].backdrop_path}`,
  		title:results[0].original_title,
  		review: results[0].overview,
  		activePage:page,
  		total_pages:total_pages,
  	})
  }
  //ui logic
  handleButton = ()=>{
  	this.loadMoreMovies().then();
  }
  render(){
  	  return (
		<Provider store={store}>
			<Router>
				<div className="App">
				<Header badge={this.state.badge}/>
					<Switch>
						<Route path = '/' exact render ={()=>(
							<Home
 					  		{...this.state}
 					  		onSearchClick={this.handleSearch}
 					  		onButtonClick={this.handleButton}
							/>
 					  	)}/>
						<Route path = '/login' exact component = {Login}/>
						   {/* how to handel the conflit */}
						<Route path = '/player' exact render = {(renderProps)=>(<MoviePlayer {...renderProps}/>)}/>
						<Route path = '/player/:id' exact render = {(renderProps)=>(<MoviePlayer {...renderProps}/>)}/>
						<Route path = '/:id' render = {(renderProps)=>(<Details {...renderProps}/>)}/>
						<Route component = {NotFound}/>
					</Switch>
				</div>
			</Router>
		</Provider>
  	)
  }

}

export default App;
