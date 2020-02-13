import {
  SET_SHOUTS,
  SUBMIT_COMMENT,
  STOP_LOADING_UI,
  LOADING_DATA,
  LIKE_SHOUT,
  UNLIKE_SHOUT,
  SET_ERRORS,
  DELETE_SHOUT,
  CLEAR_ERRORS,
  LOADING_UI,
  POST_SHOUT,
  SET_SHOUT
} from "../types";
import axios from "axios";

//Get Shouts
export const getShouts = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/shouts")
    .then(res => {
      dispatch({
        type: SET_SHOUTS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: []
      });
    });
};

//Like a Shout
export const likeShout = shoutID => dispatch => {
  axios
    .get(`/shout/${shoutID}/like`)
    .then(res => {
      dispatch({
        type: LIKE_SHOUT,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

//Unlike a Shout
export const unlikeShout = shoutID => dispatch => {
  axios
    .get(`/shout/${shoutID}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_SHOUT,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const deleteShout = shoutID => dispatch => {
  axios
    .delete(`/shout/${shoutID}`)
    .then(() => {
      dispatch({ type: DELETE_SHOUT, payload: shoutID });
    })
    .catch(err => console.log(err));
};

export const postShout = newShout => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/shout", newShout)
    .then(res => {
      dispatch({
        type: POST_SHOUT,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};

export const getShout = shoutID => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/shout/${shoutID}`)
    .then(res => {
      dispatch({
        type: SET_SHOUT,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => console.log(err));
};

//Submit a comment
export const submitComment = (shoutID, commentData) => dispatch => {
  axios
    .post(`/shout/${shoutID}/comment`, commentData)
    .then(res => {
      dispatch({ type: SUBMIT_COMMENT, payload: res.data });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};
