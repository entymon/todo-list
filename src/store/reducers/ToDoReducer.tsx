import {
  UPDATE_TO_DO_LIST,
} from '../actions/ToDoActions';
import {ToDoElementInterface} from "../../components/ToDoElement";
import RecorderService from "../../services/RecorderService";

const recorder = new RecorderService();

export interface ToDoReducerStateInterface {
  todoList: Array<ToDoElementInterface>
}

const initialState: ToDoReducerStateInterface = {
  todoList: []
};

export default (state: ToDoReducerStateInterface = initialState, action: any) => {

  switch (action.type) {

    case UPDATE_TO_DO_LIST:

      const newState = {
        ...state,
        todoList: action.payload.toDoList
      };

      // let singleSession = {};
      // recorder.getSession(action.payload.sessionKey, (session: any) => {
      //
      //   singleSession = {...session, todoReducer: newState };
      //   console.log(singleSession, 'singleSession');
      // });



      return newState;

    default:
      return state;
  }
}