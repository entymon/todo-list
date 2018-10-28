import {
  PREPARE_SELECTED_SESSION,
  SET_RECORD_KEY
} from "../actions/RecorderActions";
import {RECORD_SESSION_NOT_SET} from "../../constants/Constants";

export interface RecorderReducerStateInterface {
  key: string;
  history: Array<any>;
}

const initialState: RecorderReducerStateInterface = {
  key: RECORD_SESSION_NOT_SET,
  history: []
};

export default (state: RecorderReducerStateInterface = initialState, action: any) => {

  switch (action.type) {

    case SET_RECORD_KEY:
      return {
        ...state,
        key: action.payload
      };

    case PREPARE_SELECTED_SESSION:
      return {
        ...state,
        history: action.payload,
      };

    default:
      return state;
  }
}