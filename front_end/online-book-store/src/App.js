// third party imports
import React, { Component } from 'react';
import axios from "axios";
import Select from 'react-select';
import InfiniteScroll from 'react-infinite-scroll-component';

// relative imports
import logo from './logo.svg';
import './App.css';
import BookList from "./components/BookList";
import Search from "./components/Search";

const API_URL = 'http://localhost:1521/api/books'

const style = {
  height: 30,
  border: "1px solid #61dafb",
  margin: 6,
  padding: 8,
  color: "#61dafb"
};

class App extends Component {

  // default State object
  state = {
    Books: ["1", "2" , "3", "4"],
	Subjects: [],
	showBooks: 10,
	RadioSelection: ""
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
	apiString = apiString.replace('%20', " ");
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
        this.getBookJSONfromAPI('/' + this.state.RadioSelection + '/' + this.search.value)
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
	  RadioSelection: changeEvent.target.value,
      selectedOption: changeEvent.target.value
    });
  }

  handleShowMore = () => {
	  
    this.setState({
      showBooks: 
        this.state.showBooks >= this.state.Books.length ?
          this.state.showBooks : this.state.showBooks + 10
    })
  }
  render() {
	

    const Books = this.state.Books.slice(0, this.state.showBooks).map(
      (Book) => <div>{Book.TITLE}</div>
    )	

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
			    <input type="radio" value="author" 
						  checked={this.state.selectedOption === 'author'} 
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
			    <input type="radio" value="title" 
						  checked={this.state.selectedOption === 'title'} 
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
			onFocus={this.handleSearchBarInputChange}
		    onChange={this.handleSearchBarInputChange}
		  />
        </div>				
        <div className="App-search-results">
        <InfiniteScroll
          dataLength={Books.length} //This is important field to render the next data
          next={this.handleShowMore}
          hasMore={false}
          loader={<h4>Loading...</h4>}
		  height={400}
          endMessage={
           <p style={{textAlign: 'center'}}>
             <b>End of search results</b>
           </p>
		  }
          >
          {this.state.Books.map((i, index) => (
            <div style={style} key={index}>
              {i.TITLE}
            </div>
          ))}
        </InfiniteScroll>
		</div>
	

		
      </div>
    );
  }
}

export default App;