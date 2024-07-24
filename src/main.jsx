import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import UserProvider from "./context/UserContext.jsx";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./store/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <Provider store={store}>
        <Router>
          <Toaster />
          <App />
        </Router>
      </Provider>
    </UserProvider>
  </React.StrictMode>
);
