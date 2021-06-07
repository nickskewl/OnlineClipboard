import {
  CLEAR_ERRORS,
  ERROR,
  GET_USER_CONTENT,
  POST_USER_CONTENT,
  RESET_GLOBAL_STATE,
  SET_LOADING,
} from "../types";

const userReducer = (state, action) => {
  switch (action.type) {
    case POST_USER_CONTENT:
      return {
        ...state,
        // userContent: action.payload.content,
        // expiresAt: action.payload.expires,
        contentCreated: true,
        loading: false,
      };
    case GET_USER_CONTENT:
      return {
        ...state,
        userContent: action.payload.content,
        expiresAt: action.payload.expires,
        loading: false,
        contentCreated: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case RESET_GLOBAL_STATE:
      return {
        // loading: false,
        userContent: null,
        expiresAt: null,
        contentCreated: false,
      };
    case ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default userReducer;
