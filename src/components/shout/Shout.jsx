import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import MyButton from "../../util/MyButton";
import DeleteShout from './DeleteShout';
import ShoutDialog from './ShoutDialog';

import ChatIcon from "@material-ui/icons/Chat";

import LikeButton from './LikeButton';

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";



const styles = {
  card: {
    position: 'relative',
    display: "flex",
    marginBottom: 20
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: "cover"
  }
};
export class Shout extends Component {
  

  render() {
    
    dayjs.extend(relativeTime);
    const {
      classes,
      shout: {
        body,
        createdAt,
        userImage,
        userHandle,
        shoutID,
        likeCount,
        commentCount
      },
      user: {
        authenticated,
        credentials: {
          handle
        }
      }
    } = this.props;

    

    const deleteButton = authenticated && userHandle === handle ? (
      <DeleteShout shoutID={shoutID}/>
    ) : null

    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile Image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography varient="body1">{body}</Typography>
          <LikeButton shoutID={shoutID}/>
          <span>{likeCount} Likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>
        <ShoutDialog shoutID={shoutID} userHandle={userHandle}/>
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

Shout.propTypes = {
  
  user: PropTypes.object.isRequired,
  shout: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};


export default connect(
  mapStateToProps
)(withStyles(styles)(Shout));
