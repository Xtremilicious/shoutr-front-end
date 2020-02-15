import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Shout from "../components/shout/Shout";
import StaticProfile from "../components/profile/StaticProfile";
import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

import ShoutSkeleton from "../util/ShoutSkeleton";
import ProfileSkeleton from "../util/ProfileSkeleton";

import Grid from "@material-ui/core/Grid";

export class user extends Component {
  state = {
    profile: null,
    shoutIDParam: null
  };

  componentDidMount() {
    const handle = this.props.match.params.handle;
    const shoutID = this.props.match.params.shoutID;

    if (shoutID) {
      this.setState({
        shoutIDParam: shoutID
      });
    }

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then(res => {
        this.setState({
          profile: res.data.user
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    const { shouts, loading } = this.props.data;
    const { shoutIDParam } = this.state;

    const shoutsMarkup = loading ? (
      <ShoutSkeleton />
    ) : shouts === null ? (
      <p>No shouts from this user</p>
    ) : !shoutIDParam ? (
      shouts.map(shout => <Shout key={shout.shoutID} shout={shout} />)
    ) : (
      shouts.map(shout => {
        if (shout.shoutID !== shoutIDParam) {
          return <Shout key={shout.shoutID} shout={shout} />;
        } else {
          return <Shout key={shout.shoutID} shout={shout} openDialog />;
        }
      })
    );
    return (
      <Grid container className="grid-container" >
        <Grid item sm={7} xs={12} >
          {shoutsMarkup}
        </Grid>
        <Grid item sm={4} xs={12} style={{ paddingLeft: "1rem" }}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, { getUserData })(user);
