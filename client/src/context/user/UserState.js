import React, { useReducer } from "react";
import {
  CLEAR_ERRORS,
  ERROR,
  GET_USER_CONTENT,
  POST_USER_CONTENT,
  RESET_GLOBAL_STATE,
  SET_LOADING,
} from "../types";
import UserReducer from "./userReducer";
import UserContext from "./userContext";
import axios from "axios";

const UserState = (props) => {
  const initialState = {
    loading: false,
    userContent: null,
    expiresAt: null,
    contentCreated: false,
    error: null,
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  //Get User content
  const getUserContent = async (identifier) => {
    setLoading();
    try {
      const res = await axios.get(`/api/clip/${identifier}`);

      dispatch({
        type: GET_USER_CONTENT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  // Create User content
  const createUserContent = async (identifier, content, expiresAfter) => {
    setLoading();
    const data = {
      content: content,
      expiresAfter: Number(expiresAfter),
    };
    try {
      await axios.put(`/api/clip/${identifier}`, data);

      dispatch({
        type: POST_USER_CONTENT,
        // payload: data,
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  //set Loading
  const setLoading = () => {
    dispatch({
      type: SET_LOADING,
    });
  };

  const resetGlobalState = () => {
    dispatch({
      type: RESET_GLOBAL_STATE,
    });
  };

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <UserContext.Provider
      value={{
        loading: state.loading,
        userContent: state.userContent,
        expiresAt: state.expiresAt,
        contentCreated: state.contentCreated,
        error: state.error,
        getUserContent,
        createUserContent,
        setLoading,
        resetGlobalState,
        clearErrors,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
