import { combineReducers } from 'redux';
import ToDoReducer from './ToDoReducer';
import RecorderReducer from "./RecorderReducer";

export default combineReducers({
  todoReducer: ToDoReducer,
  recorderReducer: RecorderReducer,
})
