import React, { Component } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

import Shout from '../components/Shout'

export class home extends Component {
  state = {
    shouts: null
  };

  componentDidMount() {
    axios
      .get("/shouts")
      .then(res => {
        this.setState({
          shouts: res.data
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    let recentShoutsMarkup = this.state.shouts
      ? this.state.shouts.map(shout => <Shout key={shout.shoutID} shout={shout} />)
      : "Loading...";

    return (
      <Grid container>
        <Grid item sm={8} xs={12}>
          {recentShoutsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <p>Content...</p>
        </Grid>
      </Grid>
    );
  }
}

export default home;
