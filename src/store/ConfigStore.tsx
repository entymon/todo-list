import { createStore } from 'redux';
import reducer from './reducers/indexReducer';

export default () => {
  return createStore(reducer);
}