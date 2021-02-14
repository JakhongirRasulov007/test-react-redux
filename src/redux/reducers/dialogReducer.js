import { SELECT_ID, TOGGLE_DIALOG } from "../actionTypes";

const INITIAL_STATE = {
  dialogState: false,
  selectedId: 1,
};

const dialogReducer = (state = INITIAL_STATE, action) => {
  console.log("action.type in dialogReducer: ", action.type);
  console.log("action.payload in dialogReducer: ", action.payload);
  switch (action.type) {
    case TOGGLE_DIALOG: {
      return {
        ...state,
        dialogState: !action.payload,
      };
    }
    case SELECT_ID: {
      return {
        ...state,
        selectId: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default dialogReducer;
