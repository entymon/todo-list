import {
  PREPARE_SELECTED_SESSION, SAVE_CURRENT_TODD,
  SET_RECORD_KEY
} from "../actions/RecorderActions";
import {RECORD_SESSION_NOT_SET} from "../../constants/Constants";

export interface RecorderReducerStateInterface {
  key: string;
  restore: any;
}

const initialState: RecorderReducerStateInterface = {
  key: RECORD_SESSION_NOT_SET,
  restore: {}
};

export default (state: RecorderReducerStateInterface = initialState, action: any) => {

  switch (action.type) {

    case SET_RECORD_KEY:
      return {
        ...state,
        key: action.payload
      };

    case SAVE_CURRENT_TODD:
      return {
        ...state,
        restore: action.payload,
      };

    default:
      return state;
  }
}