import * as React from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import Routes from './routes/Routes';
import Header from "./components/Header";

export interface HelloProps { compiler: string; framework: string; }

@(connect() as any)
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