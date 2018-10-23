import * as React from "react";
import * as ReactDOM from "react-dom";

export interface HelloProps { compiler: string; framework: string; }

class App extends React.Component<HelloProps, {}> {
  render() {
    return <h1 className="test-class">Hello from {this.props.compiler} and {this.props.framework}!</h1>;
  }
}

export default App;

ReactDOM.render(
  <App compiler="TypeScript" framework="React" />,
  document.getElementById("app")
);