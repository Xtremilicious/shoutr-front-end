import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import DeleteShout from "./DeleteShout";
import ShoutDialog from "./ShoutDialog";

import LikeButton from "./LikeButton";

import Typography from "@material-ui/core/Typography";

import styled from "styled-components";

const Wrapper = styled.div`
  .card {
    position: relative;
    display: flex;
    color: white;
    background: #2e2e2e;
    border-bottom: 0.3px solid grey;
    border-right: 0.3px solid grey;
    border-left: 0.3px solid grey;
  }
  .card:hover {
    background: #424242;
    transition: 0.2s;
  }
  .user-handle {
    color: white;
    font-weight: bold;
    text-decoration: none;
  }
`;

const styles = {
  image: {
    marginTop: 20,
    marginLeft: 20,
    width: 50,
    height: 50,
    objectFit: "cover",
    maxWidth: "100%",
    borderRadius: "50%"
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
        credentials: { handle }
      }
    } = this.props;

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteShout shoutID={shoutID} />
      ) : null;

    return (
      <Wrapper>
        <div className="card">
          <img src={userImage} alt="Profile" className={classes.image} />
          <div className={classes.content}>
            {deleteButton}
            <div style={{ display: "flex", color: "#BDBDBD" }}>
              <Link to={`/users/${handle}`}>
                <div className="user-handle">@{userHandle}</div>
              </Link>
              <div style={{ marginLeft: "5px" }}>
                · {dayjs(createdAt).fromNow()}
              </div>
            </div>
            <Typography varient="body1">{body}</Typography>
            <LikeButton shoutID={shoutID} />
            <span>{likeCount} Likes</span>

            <ShoutDialog
              shoutID={shoutID}
              userHandle={userHandle}
              openDialog={this.props.openDialog}
              comment={true}
            />

            <span>{commentCount} comments</span>
            <ShoutDialog
              shoutID={shoutID}
              userHandle={userHandle}
              openDialog={this.props.openDialog}
              comment={false}
            />
          </div>
        </div>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

Shout.propTypes = {
  user: PropTypes.object.isRequired,
  shout: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};

export default connect(mapStateToProps)(withStyles(styles)(Shout));
