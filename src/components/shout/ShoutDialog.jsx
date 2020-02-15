import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import styled from "styled-components";

import MyButton from "../../util/MyButton";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";

import { getShout, clearErrors } from "../../redux/actions/dataActions";

const Wrapper = styled.div`
  .card {
    position: relative;
    display: flex;
    color: white;
    background: #2e2e2e;
    width: 100%;
    flex-direction: column;
  }
  .user-handle {
    color: white;
    font-weight: bold;
    text-decoration: none;
  }
`;

const styles = theme => ({
  ...theme.spreadThis,
  profileImage: {
    marginTop: 20,
    marginLeft: 20,
    width: 50,
    height: 50,
    objectFit: "cover",
    maxWidth: "100%",
    borderRadius: "50%"
  },
  dialogContent: {
    background: "#2E2E2E",
    color: "white",
    padding: 0
  },
  closeButton: {
    position: "absolute",
    left: "90%"
  },
  expandButton: {
    position: "absolute",
    left: "90%"
  },
  spinnerDiv: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50
  },
  content: {
    padding: 25,
    width: '100%',
  },
  expandButtonComment: {}
});

class ShoutDialog extends Component {
  state = {
    open: false,
    oldPath: "",
    newPath: ""
  };
  componentDidMount() {
    if (this.props.openDialog && !this.props.comment) {
      this.handleOpen();
    }
  }

  handleClose = () => {
    this.setState({
      open: false
    });
    this.props.clearErrors();

    window.history.pushState(null, null, this.state.oldPath);
  };
  handleOpen = () => {
    let oldPath = window.location.pathname;

    const { userHandle, shoutID } = this.props;
    const newPath = `/users/${userHandle}/shout/${shoutID}`;

    if (oldPath === newPath) {
      oldPath = `/users/${userHandle}`;
    }

    window.history.pushState(null, null, newPath);

    this.setState({
      open: true,
      oldPath,
      newPath
    });
    this.props.getShout(this.props.shoutID);
  };
  render() {
    const {
      classes,
      shout: {
        shoutID,
        body,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        userHandle,
        comments
      },
      UI: { loading }
    } = this.props;

    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={150} thickness={2} />
      </div>
    ) : (
      <Wrapper>
        <div className="card">
          <div style={{display: 'flex', flexDirection: 'row'}}>
          <img src={userImage} alt="Profile" className={classes.profileImage} />
          <div className={classes.content}>
          <div style={{ display: "flex", color: "#BDBDBD" }}>
              <Link to={`/users/${userHandle}`}>
                <div className="user-handle">@{userHandle}</div>
              </Link>
              <div style={{ marginLeft: "5px" }}>
                · {dayjs(createdAt).fromNow()}
              </div>
            </div>
          
            <Typography variant="body1">{body}</Typography>
            <LikeButton shoutID={shoutID} />
            <span>{likeCount} likes</span>
            <MyButton tip="Comments">
              <ChatIcon color="primary" />
            </MyButton>
            <span>{commentCount} comments</span>
            </div>
          </div>
          <CommentForm shoutID={shoutID} />
          <Comments comments={comments} style={{background: 'red'}}/>
        
        </div>
      </Wrapper>
    );

    return (
      <Fragment>
        <MyButton
          onClick={this.handleOpen}
          tip={!this.props.comment ? "Expand Shout" : "Comment"}
          tipClassName={
            !this.props.comment
              ? classes.expandButton
              : classes.expandButtonComment
          }
        >
          {this.props.comment ? (
            <ChatIcon color="primary" />
          ) : (
            <UnfoldMore color="primary" />
          )}
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon style={{zIndex: '200', color: '#fff'}}/>
          </MyButton>
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

ShoutDialog.propTypes = {
  getShout: PropTypes.func.isRequired,
  shoutID: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  shout: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  shout: state.data.shout,
  UI: state.UI
});
const mapActionsToProps = {
  getShout,
  clearErrors
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ShoutDialog));
