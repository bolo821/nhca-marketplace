import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import "./assets/scss/dashlite.scss";
import "./assets/scss/style-email.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import MaterialThemeProvider from "./providers/theme";
import MuiSnackbarProvider from "./providers/snackbar";
import NotificationProvider from "./providers/notification";
import Web3Provider from "./providers/web3";

const Error404Modern = lazy(() => import("./pages/error/404-modern"));

ReactDOM.render(
  <React.Fragment>
    <MaterialThemeProvider>
      <MuiSnackbarProvider>
        <NotificationProvider>
          <Web3Provider>
            <Suspense fallback={<div />}>
              <Router basename={`/`}>
                <Route render={({ location }) => (location.state && location.state.is404 ? <Error404Modern /> : <App />)} />
              </Router>
            </Suspense>
          </Web3Provider>
        </NotificationProvider>
      </MuiSnackbarProvider>
    </MaterialThemeProvider>
  </React.Fragment >,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
