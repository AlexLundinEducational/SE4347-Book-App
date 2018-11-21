import React from "react";

// import the Book component
import Book from "./Book";

function BookList(props) {
  return (
    <div>
      {props.Books.map(c => <Book key={c.id} name={c.name} />)}
     </div> 
  );
}

export default BookList;
