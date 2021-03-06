import React from "react";

// import the Book component
import Book from "./Book";

function BookList(props) {
  return (
    <div>
      {props.Books.map(b => <Book key={b.ISBN} AUTHOR={b.AUTHOR} PRICE={b.PRICE} SUBJECT={b.SUBJECT} TITLE={b.TITLE}/>)}
     </div> 
  );
}

export default BookList;
