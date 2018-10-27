export const UPDATE_TO_DO_LIST = 'UPDATE_TO_DO_LIST';

export const updateToDo = (toDoList: Array<any>) => ({
  type: UPDATE_TO_DO_LIST,
  payload: toDoList
});
