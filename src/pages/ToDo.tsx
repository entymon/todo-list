import React from 'react';
import Navigation from "../components/Navigation";
import ToDoElement from "../components/ToDoElement";

export default class ToDo extends React.Component {

  render() {
    return (
      <div className="page">
        <Navigation />
        <ToDoElement/>
      </div>
    );
  }
}