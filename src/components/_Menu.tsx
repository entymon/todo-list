import React from 'react';
import { Link } from 'react-router-dom';

export default class _Menu extends React.Component {

  render() {
    return (
      <div>
        <ul>
          <li>
            <Link className="test-class" to={`/`}>Home</Link>
            <Link className="test-class" to={`/404`}>Add Todo</Link>
          </li>
        </ul>
      </div>
    );
  }
}