import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import { connect } from "react-redux";
import { editUserDetails } from "../../redux/actions/userActions";

import MyButton from "../../util/MyButton";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";

import styled from "styled-components";

const StyledTextField = styled(TextField)`
  /* default */
  .MuiInput-underline:before {
    border-bottom: 1px solid white;
  }
  /* hover (double-ampersand needed for specificity reasons. */
  && .MuiInput-underline:hover:before {
    border-bottom: 2px solid white;
  }
`;
const styles = theme => ({
  ...theme.spreadThis,
  button: {
    float: "right"
  },
  floatingLabelFocusStyle: {
    color: "white"
  },
  input: {
    color: "white",
    fontSize: "16px",
    borderBottom: "none"
  }
});

export class EditDetails extends Component {
  state = {
    bio: "",
    website: "",
    locatrion: "",
    open: false
  };
  mapUserDetailsToState = credentials => {
    this.setState({
      bio: credentials.bio ? credentials.bio : "",
      website: credentials.website ? credentials.website : "",
      location: credentials.location ? credentials.location : ""
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  componentDidMount() {
    const { credentials } = this.props;
    this.mapUserDetailsToState(credentials);
  }

  handleClose = () => {
    this.setState({
      open: false
    });
  };
  handleOpen = () => {
    this.setState({
      open: true
    });
    this.mapUserDetailsToState(this.props.credentials);
  };

  handleSubmit = () => {
    const userDetails = {
      bio: this.state.bio,
      website: this.state.website,
      location: this.state.location
    };
    this.props.editUserDetails(userDetails);
    this.handleClose();
  };
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MyButton
          tip="Edit Details"
          onClick={this.handleOpen}
          btnClassName={classes.button}
        >
          <EditIcon color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
          style={{ background: "#2E2E2E" }}
        >
          <DialogTitle style={{ background: "#2E2E2E", color: "white" }}>
            Edit your details
          </DialogTitle>
          <DialogContent style={{ background: "#2E2E2E", color: "white" }}>
            <form>
              <StyledTextField
                name="bio"
                type="text"
                label="Bio"
                multiline
                placeholder="A short bio about yourself"
                className="shout-form"
                style={{ marginBottom: "10px" }}
                InputProps={{
                  className: classes.input
                }}
                value={this.state.bio}
                onChange={this.handleChange}
                InputLabelProps={{
                  className: classes.floatingLabelFocusStyle
                }}
                fullWidth
              ></StyledTextField>
              <StyledTextField
                name="website"
                type="text"
                label="Website"
                placeholder="Your personal/professional website"
                className="shout-form"
                style={{ marginBottom: "10px" }}
                InputProps={{
                  className: classes.input
                }}
                InputLabelProps={{
                  className: classes.floatingLabelFocusStyle
                }}
                value={this.state.website}
                onChange={this.handleChange}
                fullWidth
              ></StyledTextField>
              <StyledTextField
                name="location"
                type="text"
                label="Location"
                placeholder="Where you live"
                className="shout-form"
                style={{ marginBottom: "10px" }}
                InputProps={{
                  className: classes.input
                }}
                InputLabelProps={{
                  className: classes.floatingLabelFocusStyle
                }}
                value={this.state.location}
                onChange={this.handleChange}
                fullWidth
              ></StyledTextField>
            </form>
          </DialogContent>
          <DialogActions style={{ background: "#2E2E2E", color: "white" }}>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary" variant="contained" style={{borderRadius: '2rem'}}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  credentials: state.user.credentials
});

export default connect(mapStateToProps, { editUserDetails })(
  withStyles(styles)(EditDetails)
);
