import {
  UPDATE_TO_DO_LIST,
} from '../actions/ToDoActions';
import {ToDoElementInterface} from "../../components/ToDoElement";

export interface ToDoReducerStateInterface {
  todoList: Array<ToDoElementInterface>
}

const initialState: ToDoReducerStateInterface = {
  todoList: []
};

export default (state: ToDoReducerStateInterface = initialState, action: any) => {

  switch (action.type) {

    case UPDATE_TO_DO_LIST:
      return {
        ...state,
        todoList: action.payload
      };

    default:
      return state;
  }
}