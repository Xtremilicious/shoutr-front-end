import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

import Typography from "@material-ui/core/Typography";

import styled from "styled-components";
const Wrapper = styled.div`
  .card {
    position: relative;
    display: flex;
    color: white;
    width: 100%;
  }
  .user-handle {
    color: white;
    font-weight: bold;
    text-decoration: none;
  }
`;

const styles = theme => ({
  ...theme.spreadThis,
  commentImage: {
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
});

export class Comments extends Component {
  render() {
    const { classes, comments } = this.props;
    return (
      <Wrapper>
        {comments.map((comment, index) => {
          const { body, createdAt, userImage, userHandle } = comment;
          return (
            <div key={createdAt}>
              <div className="card">
                <div style={{ display: "flex", flexDirection: "row" ,  borderTop: '0.3px solid grey'}}>
                  <img
                    src={userImage}
                    alt="Profile"
                    className={classes.commentImage}
                  />
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
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Wrapper>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired
};

export default withStyles(styles)(Comments);
