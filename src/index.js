import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import style from "./assets/scss/main.scss";
import 'react-datepicker/dist/react-datepicker.css';
import configureStore from "./store/ConfigStore";

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("app")
);