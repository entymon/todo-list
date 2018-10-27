export const SET_RECORD_KEY = 'SET_RECORD_KEY';

export const setKeyForRecordSession = (key: string) => ({
  type: SET_RECORD_KEY,
  payload: key
});

