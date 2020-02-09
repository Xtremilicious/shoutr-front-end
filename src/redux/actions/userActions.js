import {SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER} from '../types';
import axios from 'axios';

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI});
    axios
      .post("/login", userData)
      .then(res => {
        setAuthorizationHeader(res.data.token);
        dispatch(getUserData());
        dispatch({
            type: CLEAR_ERRORS
        })
        history.push("/");
      })
      .catch(err => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
      });
}

export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI});
  axios
    .post("/signup", newUserData)
    .then(res => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({
          type: CLEAR_ERRORS
      })
      history.push("/");
    })
    .catch(err => {
      dispatch({
          type: SET_ERRORS,
          payload: err.response.data
      })
    });
}

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER});
    axios
      .get('/user')
      .then((res) => {
        dispatch({
          type: SET_USER,
          payload: res.data
        });
      })
      .catch((err) => console.log(err));
  };

  export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIDToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({
      type: SET_UNAUTHENTICATED,
    })
  }

  const setAuthorizationHeader = token => {
    localStorage.setItem('FBIDToken', `Bearer ${token}`);
      const FBIDToken = `Bearer ${token}`;
      axios.defaults.headers.common['Authorization'] = FBIDToken;
  }