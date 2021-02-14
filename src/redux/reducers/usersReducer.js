import { ADD_USER, GET_USERS, UPDATE_USER, DELETE_USER } from "../actionTypes";

export default function (state = [], action) {
  switch (action.type) {
    case ADD_USER: {
      return [...state, action.payload];
    }

    case GET_USERS: {
      return [...state, ...action.payload];
    }

    case UPDATE_USER: {
      return state;
    }

    case DELETE_USER: {
      return state;
    }

    default: {
      return state;
    }
  }
}
