import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import ToggleColorModeProvider from "./utils/ToggleColorMode";
import store from "./app/store";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToggleColorModeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ToggleColorModeProvider>
    </Provider>
  </React.StrictMode>
);
