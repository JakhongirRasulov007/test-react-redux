import {
  ADD_USER,
  GET_USERS,
  UPDATE_USER,
  DELETE_USER,
  TOGGLE_DIALOG,
  SELECT_ID,
} from "./actionTypes";

// below are actions related to users
export const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
});

export const updateUser = (id) => ({
  type: UPDATE_USER,
  payload: id,
});

export const getUsers = (users) => ({
  type: GET_USERS,
  payload: users,
});

export const deleteUser = (id) => ({
  type: DELETE_USER,
  payload: id,
});

// above are actions related to users

// below are actions related to dialog

export const toggleDialog = (dialogState) => {
  return {
    type: TOGGLE_DIALOG,
    payload: dialogState,
  };
};

export const selectId = (id) => {
  // console.log("selectedId in actions.js: ", id);
  return {
    type: SELECT_ID,
    payload: id,
  };
};
