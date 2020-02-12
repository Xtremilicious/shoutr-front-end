import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import MyButton from "../util/MyButton";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

import {connect} from 'react-redux';
import {deleteShout} from '../redux/actions/dataActions';

const styles = {


    deleteButton : {
        position: 'absolute',
        left: '90%',
        top: '10%'
    }
}

export class DeleteShout extends Component {
    state = {
        open: false
    }

handleOpen = () => {
    this.setState({
        open: true
    })
}

handleClose = () => {
    this.setState({
        open: false
    })
}

deleteShout = () => {
    this.props.deleteShout(this.props.shoutID);
    this.setState({
        open: false
    })
}

    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                <MyButton tip="Delete Shout" onClick={this.handleOpen} btnClassName={classes.deleteButton}>
                    <DeleteOutline color="secondary"/>
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose}
                fullWidth
                maxWidth="sm">
                    <DialogTitle>
                        Are you sure you want to delete this shout?
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.deleteShout} color="secondary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

DeleteShout.propTypes ={
    deleteShout: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    shoutID: PropTypes.string.isRequired
}

export default connect(null, {deleteShout})(withStyles(styles)(DeleteShout));
