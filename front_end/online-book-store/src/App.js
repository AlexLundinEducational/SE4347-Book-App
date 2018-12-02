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

const bookCellStyle = {
  height: 125,
  border: "1px solid #61dafb",
  margin: 6,
  padding: 8,
  color: "#61dafb"
};

class App extends Component {

  // default State object
  state = {
    Books: [],
	Subjects: [],
	showBooks: 10,
	RadioSelection: "",
	RadioMemberSelection: "",
	Cart: [],
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
   handleShowMoreCart = () => {
	  
    this.setState({
      showCart: 
        this.state.showCart >= this.state.Cart.length ?
          this.state.showCart : this.state.showCart + 10
    })
  } 
  
  handleAddToCart = (e) => {
	  
	console.log("Clicked button:" + e.target.id);
	
	console.log("Isbn is:" + this.state.Books[e.target.id].ISBN);
	
	// save contents of Cart
    var newArray = this.state.Cart.slice();
    // push new item to cart    
    newArray.push(this.state.Books[e.target.id]);   
	// set state
    this.setState({Cart:newArray})
		  
  }
  
   handleRemoveFromCart = (e) => {
	  
	console.log("Clicked button:" + e.target.id);
	
	// save contents of Cart
    var newArray = this.state.Cart.slice();
    // push new item to cart    
    newArray.pop(this.state.Cart[e.target.id]);   
	// set state
    this.setState({Cart:newArray})
		  
  }
  
  handleRadioMemberOptionChange = (changeEvent) =>{
    this.setState({
	  RadioMemberSelection: changeEvent.target.value,
      selectedOption: changeEvent.target.value
    });
  }
  
  render() {
	

    const Books = this.state.Books.slice(0, this.state.showBooks).map(
      (Book) => <div>{Book.TITLE}</div>
    )	
	
    const Cart = this.state.Cart.slice(0, this.state.showCart).map(
      (Book) => <div>{Book.TITLE}</div>
    )
	
    return (
      <div className="App">
        
		<div className="App-left-side">
		  The Booksearch App
		  <img src={logo} className="App-logo" alt="logo" />
		</div>

        <div className="App-cart">
        <InfiniteScroll
          dataLength={Cart.length} //This is important field to render the next data
          hasMore={false}
          loader={<h4>Loading...</h4>}
		  height={400}
          endMessage={
           <p style={{textAlign: 'center'}}>
             <b>End of Cart</b>
           </p>
		  }
          >
          {this.state.Cart.map((i, index) => (
	

            <div style={bookCellStyle} key={index}>
			
              <button type="submit" id={index} onClick={this.handleRemoveFromCart}>Remove From Cart</button>
			  

			  <div>		  
				  <div className="App-search-results-information">		

					  <div>
					  Author: {i.AUTHOR}
					  </div>
					  <div>
					  Title: {i.TITLE}
					  </div>
					  <div>
					  ISBN: {i.ISBN}
					  </div>
					  <div>
					  Price: {i.PRICE}
					  </div>
					  <div>
					  Subject: {i.SUBJECT}
					  </div>			  
				  </div>				  
		      </div>


            </div>
          ))}
        </InfiniteScroll>
		</div>
	

	
        <div className="App-members">
		<div className="members-radio">
	      <form>
		    <div className="radio">
		      <label>
			    <input type="radio" value="new user" 
						  checked={this.state.selectedOption === 'new user'} 
						  onChange={this.handleRadioMemberOptionChange} />
			    New User
		      </label>
		    </div>
		    <div className="radio">
		      <label>
			    <input type="radio" value="Member" 
						  checked={this.state.selectedOption === 'Member'} 
						  onChange={this.handleRadioMemberOptionChange} />
			    Member
		      </label>
		    </div>
	      </form>			
		</div>	
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

            <div style={bookCellStyle} key={index}>
			
              <button type="submit" id={index} onClick={this.handleAddToCart}>Add to Cart</button>
			  

			  
			  <div>		  
				  <div className="App-search-results-information">		

					  <div>
					  Author: {i.AUTHOR}
					  </div>
					  <div>
					  Title: {i.TITLE}
					  </div>
					  <div>
					  ISBN: {i.ISBN}
					  </div>
					  <div>
					  Price: {i.PRICE}
					  </div>
					  <div>
					  Subject: {i.SUBJECT}
					  </div>			  
				  </div>				  
		      </div>


            </div>
          ))}
        </InfiniteScroll>
		</div>
	

		
      </div>
    );
  }
}

export default App;