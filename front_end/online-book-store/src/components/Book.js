import React, { Component } from "react";
import "./Book.css";

import PropTypes from "prop-types";

function Book(props) {
 return (
    <div className="book">
     // <span>{props.AUTHOR}{props.ISBN}{props.PRICE}{props.SUBJECT}{props.TITLE}</span>
	  <span>{props.AUTHOR}</span>
	  <span>{props.ISBN}</span>
	  <span>{props.PRICE}</span>
	  <span>{props.SUBJECT}</span>
	  <span>{props.TITLE}</span>
    </div>
 );
}

/* Book.propTypes = {
  ISBN: PropTypes.string.isRequired
}; */

export default Book;