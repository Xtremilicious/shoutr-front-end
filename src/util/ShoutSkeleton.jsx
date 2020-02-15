import React, { Fragment } from "react";
import noImage from "../images/noImage.png";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  ...theme.spreadThis,
  cardContent: {
    width: "100%",
    flexDirection: "column",
    padding: 25
  },
  cover: {
    minWidth: 200,
    objectFit: "cover"
  },
  content: {
    padding: 25,
    objectFit: "cover"
  },
  handle: {
    width: 60,
    height: 14,
    backgroundColor: theme.palette.primary.main,
    marginBottom: 7
  },
  date: {
    width: 100,
    height: 14,
    backgroundColor: "#424242",
    marginBottom: 10
  },
  fullLine: {
    width: "90%",
    height: 15,
    backgroundColor: "#424242",
    marginBottom: 10
  },
  halfLine: {
    width: "50%",
    height: 15,
    backgroundColor: "#424242",
    marginBottom: 10
  },
  image: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    width: 50,
    height: 50,
    objectFit: "cover",
    maxWidth: "100%",
    borderRadius: "50%"
  },
  card: {
    position: "relative",
    display: "flex",
    color: "white",
    background: "#2e2e2e",
    borderBottom: "0.3px solid grey",
    borderRight: "0.3px solid grey",
    borderLeft: "0.3px solid grey"
  }
});

const ShoutSkeleton = props => {
  const { classes } = props;

  const content = Array.from({ length: 5 }).map((item, index) => (
    // <Card className={classes.card} key={index}>
    //     <CardMedia className={classes.cover} image={noImage} />
    //     <CardContent className={classes.cardContent}>
    //         <div className={classes.handle}/>
    //         <div className={classes.date}/>
    //         <div className={classes.fullLine}/>
    //         <div className={classes.fullLine}/>
    //         <div className={classes.halfLine}/>
    //     </CardContent>
    // </Card>
    <div className={classes.card}>
      <div>
        <img src={noImage} alt="Profile" className={classes.image} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          padding: "1rem"
        }}
      >
        <div
          style={{ display: "flex", color: "#BDBDBD", flexDirection: "row" }}
        >
          <div className={classes.handle} />
          <div style={{ marginLeft: "5px", marginRight: "5px" }}>·</div>
          <div className={classes.date} />
        </div>
        <div className={classes.fullLine} />
        <div className={classes.fullLine} />
        <div className={classes.halfLine} />
      </div>
    </div>
  ));

  return <Fragment>{content}</Fragment>;
};

ShoutSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ShoutSkeleton);
