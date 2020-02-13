import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

import MyButton from "../../util/MyButton";
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from '@material-ui/icons/Chat';

import { getShout,clearErrors } from "../../redux/actions/dataActions";

const styles = theme => ({
    ...theme.spreadThis,
    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: 20
    },
    closeButton: {
        position: 'absolute',
        left: '90%',
    },
    expandButton: {
        position: 'absolute',
        left: '90%'
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    }
});

class ShoutDialog extends Component {
  state = {
    open: false,
    oldPath: '',
    newPath: ''
  };
  componentDidMount(){
    if(this.props.openDialog){
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

    const {userHandle, shoutID} = this.props;
    const newPath = `/users/${userHandle}/shout/${shoutID}`;

    if(oldPath === newPath){
      oldPath = `/users/${userHandle}`
    }

    window.history.pushState(null, null, newPath);

    this.setState({
      open: true, oldPath, newPath
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
      <div className={classes.spinnerDiv}><CircularProgress size={150} thickness={2}/>
          </div>
    ) : (
      <Grid container>
        <Grid item sm={5}>
          <img src={userImage} alt="Profile" className={classes.profileImage} />
        </Grid>
        <Grid item sm={7}>
          <Typography variant="h5" component={Link} color="primary"
          to={`/user/${userHandle}`}>
              @{userHandle}
          </Typography>
          <hr className={classes.invisibleSeparator}/>
            <Typography variant="body2" color="textSecondary">
                {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
            </Typography>
            <hr className={classes.invisibleSeparator}/>
            <Typography variant="body1">
                {body}
            </Typography>
            <LikeButton shoutID={shoutID}/>
            <span>{likeCount} likes</span>
            <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>
        </Grid>
        <hr className={classes.visibleSeparator}/>
        <CommentForm shoutID={shoutID}/>
        <Comments comments={comments}/>
      </Grid>
    );

    return (
      <Fragment>
        <MyButton
          onClick={this.handleOpen}
          tip="Expand Shout"
          tipClassName={classes.expandButton}
        >
          <UnfoldMore color="primary" />
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
            <CloseIcon />
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
