export const SET_RECORD_KEY = 'SET_RECORD_KEY';
export const PREPARE_SELECTED_SESSION = 'PREPARE_SELECTED_SESSION';
export const SAVE_CURRENT_TODD = 'SAVE_CURRENT_TODD';

export const setKeyForRecordSession = (key: string) => ({
  type: SET_RECORD_KEY,
  payload: key
});

export const playSelectedSession = (storeSnapshots: Array<any>) => ({
  type: PREPARE_SELECTED_SESSION,
  payload: storeSnapshots
});

export const savePresentToDoState = (toDoState: any) => ({
  type: SAVE_CURRENT_TODD,
  payload: toDoState
});
