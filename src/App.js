import React from "react";
import "./App.css";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from 'axios';

import { Provider } from "react-redux";
import store from "./redux/store";
import {SET_AUTHENTICATED} from './redux/types';
import {logoutUser, getUserData} from './redux/actions/userActions'; 


import Navbar from "./components/Navbar";
import themeFile from "./util/theme";

import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";

import AuthRoute from "./util/AuthRoute";

const theme = createMuiTheme(themeFile);


axios.defaults.baseURL =
  'https://us-central1-shoutr-app.cloudfunctions.net/api';

const token = localStorage.FBIDToken;

if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({
      type: SET_AUTHENTICATED
    });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
    }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home} />
                <AuthRoute
                  exact
                  path="/login"
                  component={Login}
                />
                <AuthRoute
                  exact
                  path="/signup"
                  component={Signup}
                />
              </Switch>
            </div>
          </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
