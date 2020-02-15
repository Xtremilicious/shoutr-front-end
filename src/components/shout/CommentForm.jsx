import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import { submitComment } from "../../redux/actions/dataActions";

import logo from "../../images/shoutr2.png";
import noImage from "../../images/noImage.png";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  ...theme.spreadThis,
  submitButton: {
    position: "relative",
    float: "right",
    marginTop: 10,
    marginBottom: 10,
    textTransform: "none",
    borderRadius: "2rem",
    fontSize: "1rem"
  },
  progressSpinner: {
    position: "absolute"
  },
  closeButton: {
    position: "absolute",
    left: "91%",
    top: "3%"
  },
  input: {
    color: "white",
    fontSize: "21px",
    borderBottom: "none"
  },
  image: {
    marginTop: 20,
    marginLeft: 20,
    width: 50,
    height: 50,
    objectFit: "cover",
    maxWidth: "100%",
    borderRadius: "50%"
  }
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
    const {
      classes,
      authenticated,
      UI: { loading }
    } = this.props;
    const { errors } = this.state;
    const dataLoading = this.props.dataLoading;
    const userImage = this.props.userImage;

    console.log(this.state.errors);

    const commentFormMarkup = authenticated ? (
      <Grid item sm={12} style={{ textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            borderTop: "0.3px solid grey"
          }}
        >
          <div>
            {!dataLoading ? (
              <img src={userImage} alt="Profile" className={classes.image} />
            ) : (
              <img src={noImage} alt="Profile" className={classes.image} />
            )}
          </div>
          <div className="post-shout">
            <DialogContent>
              <form onSubmit={this.handleSubmit}>
                <TextField
                  name="body"
                  type="text"
                  placeholder="Shout your reply"
                  error={errors.error ? true : false}
                  helperText={errors.error}
                  multiline
                  className="shout-form"
                  InputProps={{
                    className: classes.input,
                    disableUnderline: true
                  }}
                  onChange={this.handleChange}
                  value={this.state.body}
                  fullWidth
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submitButton}
                  disabled={loading}
                >
                  Comment
                  <img
                    src={logo}
                    style={{ marginLeft: "4px", width: "25px", height: "25px" }}
                    className="image"
                    alt="Shoutr"
                  />
                  {loading && (
                    <CircularProgress
                      size={30}
                      className={classes.progressSpinner}
                    />
                  )}
                </Button>
              </form>
            </DialogContent>
          </div>
        </div>
      </Grid>
    ) : null;

    return commentFormMarkup;
  }
}

const mapStateToProps = state => ({
  UI: state.UI,
  authenticated: state.user.authenticated,
  dataLoading: state.data.loading,
  userImage: state.user.credentials.imageUrl
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
