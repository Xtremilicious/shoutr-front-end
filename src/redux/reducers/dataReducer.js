import {
  SET_SHOUTS,
  POST_SHOUT,
  LIKE_SHOUT,
  UNLIKE_SHOUT,
  LOADING_DATA,
  DELETE_SHOUT,
  SET_SHOUT,
  SUBMIT_COMMENT
} from "../types";

const initialState = {
  shouts: [],
  shout: {},
  loading: false
};

export default function(state = initialState, action) {
  let index;
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_SHOUTS:
      return {
        ...state,
        shouts: action.payload,
        loading: false
      };
    case SET_SHOUT:
      return {
        ...state,
        shout: action.payload
      };
    case LIKE_SHOUT:
    case UNLIKE_SHOUT:
      console.log(action.payload);
      index = state.shouts.findIndex(
        shout => shout.shoutID === action.payload.shoutID
      );
      state.shouts[index] = action.payload;
      if (state.shout.shoutID === action.payload.shoutID) {
        state.shout = action.payload;
      }
      return {
        ...state
      };
    case DELETE_SHOUT:
      index = state.shouts.findIndex(shout => shout.shoutID === action.payload);
      state.shouts.splice(index, 1);
      return {
        ...state
      };
    case POST_SHOUT:
      return {
        ...state,
        shouts: [action.payload, ...state.shouts]
      };
    case SUBMIT_COMMENT:
      console.log(action.payload);
      index = state.shouts.findIndex(
        shout => shout.shoutID === action.payload.shoutID
      );
      return {
        ...state,
        shout: {
          ...state.shout,
          comments: [action.payload, ...state.shout.comments],
          commentCount: state.shout.commentCount + 1
        }
      };
    default:
      return {
        ...state
      };
  }
}
