export const UPDATE_TO_DO_LIST = 'UPDATE_TO_DO_LIST';

export const updateToDo = (toDoList: Array<any>, sessionKey: string = '') => ({
  type: UPDATE_TO_DO_LIST,
  payload: {
    toDoList,
    sessionKey
  }
});
