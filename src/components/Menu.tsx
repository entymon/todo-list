import React from 'react';
import { Link } from 'react-router-dom';

export default class Menu extends React.Component {

  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to={`/`}>List</Link>
            <Link to={`/create`}>Add Todo</Link>
            <Link to={`/edit`}>Edit Todo</Link>
          </li>
        </ul>
      </div>
    );
  }
}