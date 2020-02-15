import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

import Shout from "../components/shout/Shout";
import Profile from "../components/profile/Profile";
import ShoutSkeleton from '../util/ShoutSkeleton';
import ShoutIt from '../components/shout/ShoutIt';

import { connect } from "react-redux";
import { getShouts } from "../redux/actions/dataActions";

export class home extends Component {
  componentDidMount() {
    this.props.getShouts();
  }

  render() {
    const { shouts, loading } = this.props.data;
    const authenticated = this.props.authenticated;
    let recentShoutsMarkup = !loading
      ? shouts.map(shout => <Shout key={shout.shoutID} shout={shout} />)
      : (
        <ShoutSkeleton/>
      );

    return (
      <Grid container className="grid-container">
        <Grid item sm={7} xs={12}>
          <div className="page-title">
              Home
          </div>
          {authenticated?<ShoutIt/> :null}
          {recentShoutsMarkup}
        </Grid>
        <Grid item sm={4} xs={12} style={{ padding: "2rem" }}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getShouts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  data: state.data,
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps, { getShouts })(home);
