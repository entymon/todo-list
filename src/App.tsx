import * as React from "react";
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import Routes from './routes/Routes';
import Header from "./components/Header";

export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <Router>
        <div className="wrapper">
          <div className="wrapper__menu">
            <Header />
          </div>
          <div className="wrapper__page">
            <Routes />
          </div>
        </div>
      </Router>
    );
  }
}