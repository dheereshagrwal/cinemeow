import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import "./index.css";
import ToggleColorModeProvider from "./utils/ToggleColorMode";
import store from "./app/store";
ReactDOM.render(
  <Provider store={store}>
    <ToggleColorModeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ToggleColorModeProvider>
  </Provider>,
  document.getElementById("root")
);
