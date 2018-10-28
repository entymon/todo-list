import {
  PLAY_EPISODE,
  SET_ACTION_NAME,
  UPDATE_TO_DO_LIST,
} from '../actions/ToDoActions';
import {ToDoElementInterface} from "../../components/ToDoElement";
import RecorderService from "../../services/RecorderService";
import {string} from "prop-types";

const recorder = new RecorderService();

export interface ToDoReducerStateInterface {
  todoList: Array<ToDoElementInterface>;
  actionName: string;
  present: any
}

const initialState: ToDoReducerStateInterface = {
  todoList: [],
  actionName: '',
  present: {}
};

export default (state: ToDoReducerStateInterface = initialState, action: any) => {

  switch (action.type) {

    case UPDATE_TO_DO_LIST:

      return {
        ...state,
        todoList: action.payload.toDoList,
        actionName: action.payload.actionName
      };

    case SET_ACTION_NAME:
      return {
        ...state,
        actionName: action.payload
      };

    case PLAY_EPISODE:
      return {
        ...action.payload,
      };

    default:
      return state;
  }
}