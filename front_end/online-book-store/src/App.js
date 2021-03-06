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
	CartTotal: 0,
	showMemberForm: false,
	showNewMemberForm: false,
	memberType: 0,
	isLoggedIn: false,
	FirstName: "",
	LastName: "",
	StreetAddress: "",
	City: "",
	State: "",
	Zip: "",
	Phone: "",
	EmailAddress: "",
	UserID: "",
	Password: "",
	CreditCardNumber: ""
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
    
  postMemeberJSONfromAPI = (apiString) => {
    axios
      .post(API_URL + apiString)
 
      .then(response => {
		  
		// print response to console  
        console.log(response);			
		

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
	  
	var currentPrice = this.state.Books[e.target.id].PRICE;
	
	console.log("Clicked button:" + e.target.id);
	
	console.log("Isbn is:" + this.state.Books[e.target.id].ISBN);
	
	// save contents of Cart
    var newArray = this.state.Cart.slice();
    // push new item to cart    
    newArray.push(this.state.Books[e.target.id]);   
	// set state
    this.setState({Cart:newArray})
	
	this.state.CartTotal = this.state.CartTotal + currentPrice ;
	
	console.log("Cart total is:" + this.state.CartTotal);
		  
  }
  
   handleRemoveFromCart = (e) => {
	   
	this.state.CartTotal = this.state.CartTotal - this.state.Cart[e.target.id].PRICE;  
	
	console.log("Remove :" + this.state.Cart[e.target.id].ISBN);
	
	// save contents of Cart
    var newArray = this.state.Cart.slice();
    // push new item to cart    
	newArray.splice(e.target.id, 1);
	
	// set state
    this.setState({Cart:newArray})
	
	
	
	console.log("Cart total is:" + this.state.CartTotal);
		  
  }
  

  handleMemberForm = () =>{
    this.setState({showNewMemberForm:false,showMemberForm:true});
	console.log("Clicked button:" + this.state.showNewMemberForm);
	

	
	
	
  } 
  
  handleNewMemberForm = () =>{
     this.setState({showNewMemberForm:true,showMemberForm:false});
	 

  } 
  
  handleMemberFormFirstNameChange = (e) => {
	this.setState({
		FirstName: e.target.value
	})
	console.log("This changed:" + this.state.FirstName)
  }
  
  handleMemberFormLastNameChange = (e) => {
	this.setState({
		LastName: e.target.value
	})
  } 
  handleMemberFormStreetAddressChange = (e) => {
	this.setState({
		StreetAddress: e.target.value
	})
  }
  
  
  handleMemberFormCityChange = (e) => {
	this.setState({
		City: e.target.value
	})
  }

  handleMemberFormStateChange = (e) => {
	this.setState({
		State: e.target.value
	})
  }

  handleMemberFormZipChange = (e) => {
	this.setState({
		Zip: e.target.value
	})
  }
 
  handleMemberFormPhoneChange = (e) => {
	this.setState({
		Phone: e.target.value
	})
  }

  handleMemberFormEmailAddressChange = (e) => {
	this.setState({
		EmailAddress: e.target.value
	})
  }

  handleMemberFormUserIDChange = (e) => {
	this.setState({
		UserID: e.target.value
	})
	console.log("This changed:" + this.state.UserID)
  }
  
  handleMemberFormPasswordChange = (e) => {
	this.setPassword({
		Password: e.target.value
	})
  }
  
  handleMemberFormCreditCardNumberChange = (e) => {
	this.setCreditCardNumber({
		CreditCardNumber: e.target.value
	})
  }
  
  handleLoginClick = () =>{

	this.setState({isLoggedIn:true});

	if(this.state.memberType == "1"){
		console.log("New Member Login")
		this.postMemeberJSONfromAPI("/members/userid/" + this.state.UserID)
	}
	if(this.state.memberType== "2"){
		console.log("Member Login")
	}	  
  }

  handleLogoutClick = () =>{
	if(this.state.memberType == "1"){
		console.log("New Member Logout")
	}
	if(this.state.memberType== "2"){
		console.log("Member Logout")
	}	  
    this.setState({isLoggedIn:false});
  }

  
 UserGreeting = (props) => {
  return <h1>Welcome back!</h1>;
}

GuestGreeting = (props) => {
  return <h1>Please sign up.</h1>;
}

Greeting = (props) => {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <this.UserGreeting />;
  }
  return <this.GuestGreeting />;
}


 LoginButton = (props) => {


  return (
    <button onClick={props.onClick}>
      Login
    </button>
	
  );
}

LogoutButton = (props) => {

  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}

 
	MemberFormContent = (props) => {
		const whatType = props.whatType;
		this.state.memberType = whatType;
		
		console.log("Member type changed:" + this.state.memberType)
		if(whatType == "0"){
			return <this.EmptyForm/>;
		}	
		if(whatType == "1"){
			return <this.NewMemberForm />;
		}
		if(whatType == "2"){
			return <this.MemberForm />;
		}

	}
	  
	EmptyForm = (props) => {
	  return(
	  <div className='modal2'>
		  Choose Member or New Member.
	  </div>
	  );
	}
	MemberForm = (props) =>  {
	  return(
	  <div className='modal2'>
		 <input
			placeholder="User ID"
			id="UserID"
		  />	  
		  <input
			placeholder="Password"
			id="Password"
		  />
	  </div>
	  );
	}
	
	NewMemberForm  = (props) =>  {

	   return(
	   <div className='modal1'>
		  <input
			placeholder="First name"
			id="FirstName"
			onChange={e => this.handleMemberFormFirstNameChange(e)}
		  />
		  <input
			placeholder="Last name"
			id="LastName"
			onChange={e => console.log("Input changed:" + e.target.value + "\n" + e.target.id)}
		  />
		  <input
			placeholder="Street address"
			id="Street address"
		  />
		  <input
			placeholder="City"
			id="City"
		  />
		  <input
			placeholder="State"
			id="State"
		  />
		  <input
			placeholder="Zip"
			id="Zip"
		  />
		  <input
			placeholder="Phone"
			id="Phone"
		  />
		  <input
			placeholder="Email Address"
			id="EmailAddress"
		  />
		 <input
			placeholder="User ID"
			id="UserID"
			onChange={e => this.handleMemberFormUserIDChange(e)}
		  />	  
		  <input
			placeholder="Password"
			id="Password"
		  />
		  <input
			placeholder="Credit Card Number"
			id="CreditCardNumber"
		  />
	  </div>
	  );
	}

  render() {

	const cartRunningTotal = this.state.CartTotal;
	const isNewMemberFormShown = this.state.showNewMemberForm;
	const isMemberFormShown = this.state.showMemberForm;
	const FullName = this.state.FullName;
	var whatType = "0";
    const isLoggedIn = this.state.isLoggedIn;
	
    let button;
    let activeMemberForm;
	
    if (isLoggedIn) {
      button = <this.LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <this.LoginButton onClick={this.handleLoginClick} />;
    }
	if (isNewMemberFormShown){
		whatType = "1";
	}
	if (isMemberFormShown){
		whatType = "2";
	}
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
		 <div className="App-cart-total">
           <p style={{textAlign: 'center'}}>
             <b>Total: {this.state.CartTotal}</b>
           </p>
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


			
			  <div>
				<this.Greeting isLoggedIn={isLoggedIn} />
				{button}
				<button type="submit" id="NM" onClick={this.handleNewMemberForm}>New Member</button>
				<button type="submit" id="M" onClick={this.handleMemberForm}>Members</button>
				<this.MemberFormContent whatType={whatType}/>
			  </div>			
			

					
		
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