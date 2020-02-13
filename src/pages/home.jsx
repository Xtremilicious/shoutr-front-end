import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

import Shout from "../components/shout/Shout";
import Profile from "../components/profile/Profile";

import { connect } from "react-redux";
import { getShouts } from "../redux/actions/dataActions";

export class home extends Component {
  componentDidMount() {
    this.props.getShouts();
  }

  render() {
    const { shouts, loading } = this.props.data;
    let recentShoutsMarkup = !loading
      ? shouts.map(shout => <Shout key={shout.shoutID} shout={shout} />)
      : "Loading...";

    return (
      <Grid container>
        <Grid item sm={8} xs={12}>
          {recentShoutsMarkup}
        </Grid>
        <Grid item sm={4} xs={12} style={{ paddingLeft: "1rem" }}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getShouts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, { getShouts })(home);
