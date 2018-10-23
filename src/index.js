import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import style from "./main.scss";

ReactDOM.render(
	<App compiler="TypeScript" framework="React" />,
	document.getElementById("app")
);