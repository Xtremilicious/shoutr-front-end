import { SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from "../types";

const intialState = {
  loading: false,
  errors: null
};

export default function(state = intialState, action) {
  switch (action.type) {
    default:
      return state;
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null
      };
    case LOADING_UI:
      return {
          ...state,
          loading: true
      };
  }
}
