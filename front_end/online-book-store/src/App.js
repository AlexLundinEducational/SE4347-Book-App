import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";


import BookList from "./components/BookList";
import SearchBar from "./components/Search";

const API_URL = 'http://localhost:1521/api/books'



class App extends Component {

  // default State object
  state = {
    Books: []
  };

  componentDidMount() {
    axios
      .get(API_URL + '/subjects')
      .then(response => {
		  
		// print response to console  
        console.log(response);			
		
        // create an array of Books only with relevant data
		//var index = 0;
        const newBooks = response.data.map(b => {
	      //console.log(response.data.map);	
          return {
			AUTHOR: b.AUTHOR,
            ISBN: b.ISBN,
			PRICE: b.PRICE,
			SUBJECT: b.SUBJECT,
			TITLE: b.TITLE
          };
        });

        // create a new "State" object without mutating 
        // the original State object. 
        const newState = Object.assign({}, this.state, {
          Books: newBooks
        });

        // store the new state object in the component's state
        this.setState(newState);
      })
      .catch(error => console.log(error));
  }
  

  

  
    getInfo = () => {
    axios
      .get(API_URL + '/isbn/' + this.search.value)
      .then(response => {
		  
		// print response to console  
        console.log(response);			
		
        // create an array of Books only with relevant data
		//var index = 0;
        const newBooks = response.data.map(b => {
	      //console.log(response.data.map);	
          return {
			AUTHOR: b.AUTHOR,
            ISBN: b.ISBN,
			PRICE: b.PRICE,
			SUBJECT: b.SUBJECT,
			TITLE: b.TITLE
          };
        });

        // create a new "State" object without mutating 
        // the original State object. 
        const newState = Object.assign({}, this.state, {
          Books: newBooks
        });

        // store the new state object in the component's state
        this.setState(newState);
      })
      .catch(error => console.log(error));
  
  }
  
  handleInputChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
          this.getInfo()
        }
      } else if (!this.state.query) {
      }
    })
  }

  
  render() {
    return (
      <div className="App">
        
		<div className="App-left-side">
		  The Booksearch App
		  <img src={logo} className="App-logo" alt="logo" />
		</div>

		<div className="App-search-bar">
		  <form>
			<input
			  placeholder="Search for..."
			  ref={input => this.search = input}
			  onChange={this.handleInputChange}
			/>
		  </form>
	  
		</div> 
		
		<div className="App-search-results">
		  <BookList Books={this.state.Books} />
		</div> 
		
					
				

      </div>
    );
  }
}

export default App;