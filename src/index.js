import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "./utils/createMuiTheme";
import configureStore from "./store/configureStore";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./index.scss";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={createMuiTheme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
