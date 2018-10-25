import * as React from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import Routes from './routes/Routes';
import Menu from "./components/Menu";

export interface HelloProps { compiler: string; framework: string; }

@(connect() as any)
export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <Router>
        <div>
          <Menu />
          <Routes />
        </div>
      </Router>
    );
  }
}