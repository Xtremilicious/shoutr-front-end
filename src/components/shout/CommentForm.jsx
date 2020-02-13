import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import { submitComment } from "../../redux/actions/dataActions";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  ...theme.spreadThis
});

export class CommentForm extends Component {
  state = {
    body: "",
    errors: {}
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({
        body: "",
        open: false,
        errors: {}
      });
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.submitComment(this.props.shoutID, { body: this.state.body });
  };

  render() {
    const { classes, authenticated } = this.props;
    const { errors } = this.state;
    console.log(this.state.errors);

    const commentFormMarkup = authenticated ? (
      <Grid item sm={12} style={{ textAlign: "center" }}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name="body"
            type="text"
            label="Comment on Shout"
            error={errors.error ? true : false}
            helperText={errors.error}
            value={this.state.body}
            onChange={this.handleChange}
            fullWidth
            className={classes.textField}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Submit
          </Button>
        </form>
        <hr className={classes.visibleSeparator} />
      </Grid>
    ) : null;

    return commentFormMarkup;
  }
}

const mapStateToProps = state => ({
  UI: state.UI,
  authenticated: state.user.authenticated
});

CommentForm.propTypes = {
  submitComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  shoutID: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, { submitComment })(
  withStyles(styles)(CommentForm)
);
