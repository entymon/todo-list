export const SET_RECORD_KEY = 'SET_RECORD_KEY';
export const SAVE_CURRENT_TODD = 'SAVE_CURRENT_TODD';
export const STOP_PLAYING = 'STOP_PLAYING';

export const setKeyForRecordSession = (key: string) => ({
  type: SET_RECORD_KEY,
  payload: key
});

export const savePresentToDoState = (toDoState: any) => ({
  type: SAVE_CURRENT_TODD,
  payload: toDoState
});

export const stopPlaying = () => ({
  type: STOP_PLAYING
});
