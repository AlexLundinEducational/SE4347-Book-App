import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";


import BookList from "./components/BookList";

class App extends Component {

  // default State object
  state = {
    Books: []
  };

  componentDidMount() {
    axios
      .get("http://localhost:1521/api/books")
      .then(response => {
		  
		// print response to console  
        console.log(response);			
		
        // create an array of Books only with relevant data
		//var index = 0;
        const newBooks = response.data.map(b => {
	      //console.log(response.data.map);	
          return {
			AUTHOR: b.AUTHOR,
            ISBN: b.ISBN
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

  render() {
    return (
      <div className="App">
        
		<header className="App-header">
		  <img src={logo} className="App-logo" alt="logo" />
		  <p>
			Edit <code>src/App.js</code> and save to reload.
		  </p>
		  <a
			className="App-link"
			href="https://reactjs.org"
			target="_blank"
			rel="noopener noreferrer"
		  >
			Learn React
		  </a>
		</header>
		<BookList Books={this.state.Books} />			
				

      </div>
    );
  }
}

export default App;