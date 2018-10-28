export const UPDATE_TO_DO_LIST = 'UPDATE_TO_DO_LIST';
export const SET_ACTION_NAME = 'SET_ACTION_NAME';
export const PLAY_EPISODE = 'PLAY_EPISODE';

export const updateToDo = (toDoList: Array<any>, actionName: string = '') => ({
  type: UPDATE_TO_DO_LIST,
  payload: {
    toDoList,
    actionName
  }
});

export const setActionName = (actionName: string = '') => ({
  type: SET_ACTION_NAME,
  payload: actionName
});

export const playEpisode = (toDoState: any) => ({
  type: PLAY_EPISODE,
  payload: toDoState
});