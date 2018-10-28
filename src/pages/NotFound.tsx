import React from 'react';
import {Link} from "react-router-dom";

export default class NotFound extends React.Component {

  render() {
    return (
      <div className="page">
        <div className="content">
          <p>Sorry the content could not be found :(</p>
          <Link to={`/`}>Go Home</Link>
        </div>
      </div>
    );
  }
}