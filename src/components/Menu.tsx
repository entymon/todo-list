import React from 'react';
import { Link } from 'react-router-dom';

export default class Menu extends React.Component {

  render() {
    return (
      <div>
        <ul>
          <li>
            <Link className="test-class" to={`/`}>List</Link>
            <Link className="test-class" to={`/create`}>Add Todo</Link>
            <Link className="test-class" to={`/edit`}>Edit Todo</Link>
          </li>
        </ul>
      </div>
    );
  }
}