// third party imports
import React, { Component } from 'react';
import axios from "axios";
import Select from 'react-select';

// relative imports
import logo from './logo.svg';
import './App.css';
import BookList from "./components/BookList";
import Search from "./components/Search";

const API_URL = 'http://localhost:1521/api/books'

 const scaryAnimals = [
  { label: "Alligators", value: 1 },
  { label: "Crocodiles", value: 2 },
  { label: "Sharks", value: 3 },
  { label: "Small crocodiles", value: 4 },
  { label: "Smallest crocodiles", value: 5 },
  { label: "Snakes", value: 6 }
];
 


class App extends Component {

  // default State object
  state = {
    Books: [],
	Subjects: []
  };

  componentDidMount() {
    axios
      .get(API_URL + '/subjects')
      .then(response => {
		  
		// print response to console  
        console.log(response);			
		
        // create an array of Books only with relevant data
		//var index = 0;
        const newSubjects = response.data.map(b => {
	      //console.log(response.data.map);	
          return {
			label: b.SUBJECT,
            value: b.SUBJECT
          };
        });

        // create a new "State" object without mutating 
        // the original State object. 
        const newState = Object.assign({}, this.state, {
          Subjects: newSubjects
        });

        // store the new state object in the component's state
        this.setState(newState);
      })
      .catch(error => console.log(error));
  }
  

  

  
  getBookJSONfromAPI = (apiString) => {
    axios
      .get(API_URL + apiString)
 
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
  
  handleSearchBarInputChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
          this.getBookJSONfromAPI('/' + this.state.selectedOption + '/' + this.search.value)
        }
      } else if (!this.state.query) {
      }
    })
  }
  
  handleSubjectChange = (changeEvent) => {
    this.setState({
      value: changeEvent.value
         }, () => {
		this.getBookJSONfromAPI('/subject/' + this.state.value)	 
	});
  }
  
  handleRadioOptionChange = (changeEvent) =>{
    this.setState({
      selectedOption: changeEvent.target.value
    });
  }

  render() {
    return (
      <div className="App">
        
		<div className="App-left-side">
		  The Booksearch App
		  <img src={logo} className="App-logo" alt="logo" />
		</div>



        <div className="subjects-dropdown">
          <Select 
			          options={this.state.Subjects}
                      placeholder="Subjects"
                      onChange={this.handleSubjectChange}					  
		  />
        </div>
		
		<div className="search-radio">
	      <form>
		    <div className="radio">
		      <label>
			    <input type="radio" value="Author" 
						  checked={this.state.selectedOption === 'Author'} 
						  onChange={this.handleRadioOptionChange} />
			    Author
		      </label>
		    </div>
		    <div className="radio">
		      <label>
			    <input type="radio" value="ISBN" 
						  checked={this.state.selectedOption === 'ISBN'} 
						  onChange={this.handleRadioOptionChange} />
			    ISBN
		      </label>
		    </div>
		    <div className="radio">
		      <label>
			    <input type="radio" value="Title" 
						  checked={this.state.selectedOption === 'Title'} 
						  onChange={this.handleRadioOptionChange} />
			    Title
		      </label>
		    </div>
	      </form>			
		</div>	
			
        <div className="search-input">
          <input
			placeholder="Search for..."
			ref={input => this.search = input}
		    onChange={this.handleSearchBarInputChange}
		  />
        </div>				

	
		<div className="App-search-results">
		  <BookList Books={this.state.Books} />
		</div> 
		
      </div>
    );
  }
}

export default App;