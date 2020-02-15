import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import { connect } from "react-redux";
import { postShout, clearErrors } from "../../redux/actions/dataActions";
import noImage from '../../images/noImage.png'

import MyButton from "../../util/MyButton";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import TelegramIcon from "@material-ui/icons/Telegram";

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

export class PostShout extends Component {
  state = {
    body: "",
    errors: {}
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
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.postShout({ body: this.state.body });
    this.setState({
        body:''
    })
  };
  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading }
    } = this.props;
    const dataLoading = this.props.dataLoading;
    const userImage = this.props.userImage;
    console.log(userImage);
    return (
      <Fragment>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            borderBottom: "0.3px solid grey",
            borderRight: "0.3px solid grey",
            borderLeft: "0.3px solid grey"
          }}
        >
          <div>
            {!dataLoading ? <img src={userImage} alt="Profile" className={classes.image}/> : <img src={noImage} alt="Profile" className={classes.image}/>}
          </div>
          <div className="post-shout">
            <DialogContent>
              <form onSubmit={this.handleSubmit}>
                <TextField
                  name="body"
                  type="text"
                  multiline
                  placeholder="What's happening?"
                  error={errors.comment ? true : false}
                  helperText={errors.comment}
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
                  Shout
                  <TelegramIcon style={{ marginLeft: "3px" }} />
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
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  UI: state.UI,
  userImage: state.user.credentials.imageUrl,
  dataLoading: state.data.loading
});

PostShout.propTypes = {
  postShout: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { postShout, clearErrors })(
  withStyles(styles)(PostShout)
);
