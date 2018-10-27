import {SET_RECORD_KEY} from "../actions/RecorderActions";

export interface RecorderReducerStateInterface {
  key: string
}

const initialState: RecorderReducerStateInterface = {
  key: ''
};

export default (state: RecorderReducerStateInterface = initialState, action: any) => {

  switch (action.type) {

    case SET_RECORD_KEY:
      return {
        ...state,
        todoList: action.payload
      };

    default:
      return state;
  }
}