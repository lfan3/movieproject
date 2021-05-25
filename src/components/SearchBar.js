import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import '../css/SearchBar.css'

class SearchBar extends Component {
	state={
		value: ""
	}
	handleChange = (event)=>{
		this.setState({value: event.target.value})
	}
	render(){
		const {value}= this.state
		return(
			<div className='searchBar--container'>
				<div className="searchBar">
					<input
						className="searchBar--input"
						type='text'
						placeholder="Recherche un film"
						value={value}
						onChange={this.handleChange}
					/>
					<div className="searchBar--submit" onClick={()=>this.props.onSearchClick(value)}>
						<FontAwesome name="search" className="searchIcon"/>
					</div>
				</div>
			</div>
			)
	}
}

export {SearchBar}