import * as React from "react";
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import Routes from './routes/Routes';
import Menu from "./components/Menu";

export interface HelloProps { compiler: string; framework: string; }

export default class App extends React.Component<HelloProps, {}> {
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