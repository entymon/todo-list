import {SET_RECORD_KEY} from "../actions/RecorderActions";
import {RECORD_SESSION_NOT_SET} from "../../constants/Constants";

export interface RecorderReducerStateInterface {
  key: string
}

const initialState: RecorderReducerStateInterface = {
  key: RECORD_SESSION_NOT_SET
};

export default (state: RecorderReducerStateInterface = initialState, action: any) => {

  switch (action.type) {

    case SET_RECORD_KEY:
      return {
        ...state,
        key: action.payload
      };

    default:
      return state;
  }
}