import React, { Component } from "react";
import "./Book.css";

import PropTypes from "prop-types";

function Book(props) {
 return (
    <div className="book">
      <span>{props.name}</span>
    </div>
 );
}

Book.propTypes = {
  name: PropTypes.string.isRequired
};

export default Book;