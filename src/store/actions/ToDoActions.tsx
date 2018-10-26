export const ADD_TO_DO = 'ADD_TO_DO';
export const REMOVE_TO_DO = 'REMOVE_TO_DO';
export const EDIT_TO_DO = 'EDIT_TO_DO';

export const addToDo = (toDoList: Array<any>) => ({
  type: ADD_TO_DO,
  payload: toDoList
});

export const removeToDo = (toDo: any) => ({
  type: REMOVE_TO_DO,
  payload: toDo
});

export const editToDo = (toDo: any) => ({
  type: EDIT_TO_DO,
  payload: toDo
});
