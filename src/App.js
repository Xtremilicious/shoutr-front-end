import React from "react";
import "./App.css";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { Provider } from "react-redux";
import store from "./redux/store";

import Navbar from "./components/Navbar";
import themeFile from "./util/theme";

import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";

import AuthRoute from "./util/AuthRoute";

const theme = createMuiTheme(themeFile);

let authenticated;
const token = localStorage.FBIDToken;

if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/login";
    authenticated = false;
  } else {
    authenticated = true;
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
                  authenticated={authenticated}
                />
                <AuthRoute
                  exact
                  path="/signup"
                  component={Signup}
                  authenticated={authenticated}
                />
              </Switch>
            </div>
          </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
