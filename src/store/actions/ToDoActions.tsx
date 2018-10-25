export const ADD_TO_DO = 'ADD_TO_DO';
export const REMOVE_TO_DO = 'REMOVE_TO_DO';
export const EDIT_TO_DO = 'EDIT_TO_DO';

export const createToDo = (toDo: any) => ({
  type: ADD_TO_DO,
  payload: toDo
});

export const removeToDo = (toDo: any) => ({
  type: REMOVE_TO_DO,
  payload: toDo
});

export const editToDo = (toDo: any) => ({
  type: EDIT_TO_DO,
  payload: toDo
});
