import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import MyButton from "../../util/MyButton";
import Notifications from "./Notifications";

import noImage from '../../images/noImage.png'

import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

import HomeIcon from "@material-ui/icons/Home";

export class Navbar extends Component {
  render() {
    const { authenticated } = this.props;
    const userImage = this.props.userImage;
    const handle = this.props.handle;
    const loading = this.props.loading;
    return (
      <div className="nav-bar">
        <Toolbar className="nav-container">
          {authenticated ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: 'center' }}>
              <Link to="/">
                <MyButton tip="">
                  <HomeIcon />
                </MyButton>
              </Link>
              <Notifications />
              <Link to={`/users/${handle}`}>
                <MyButton tip="">
                  <img src={!loading ? userImage : noImage} alt="Me" className="image"/>
                </MyButton>
              </Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </div>
          )}
        </Toolbar>
      </div>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  authenticated: state.user.authenticated,
  userImage: state.user.credentials.imageUrl,
  handle: state.user.credentials.handle,
  loading: state.data.loading
});

export default connect(mapStateToProps)(Navbar);
