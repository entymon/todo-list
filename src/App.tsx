import * as React from "react";
import ToDoList from "./components/ToDoList";

export interface HelloProps { compiler: string; framework: string; }

export default class App extends React.Component<HelloProps, {}> {
  render() {
    return (
      <div>
        <h1 className="test-class">Test Hello from {this.props.compiler} and {this.props.framework}!</h1>
        <ToDoList />
      </div>
    );
  }
}