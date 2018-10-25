import {
  ADD_TO_DO,
  REMOVE_TO_DO,
  EDIT_TO_DO
} from '../actions/ToDoActions';

const initialState = {
  todoList: {}
};

export default (state = initialState, action: any) => {

  switch (action.type) {

    case ADD_TO_DO:
      return {
        ...state,
        todoList: action.payload
      };

    case REMOVE_TO_DO:
      return {
        ...state,
        todoList: action.payload
      };

    case EDIT_TO_DO:
      return {
        ...state,
        todoList: action.payload
      };

    default:
      return state;
  }
}