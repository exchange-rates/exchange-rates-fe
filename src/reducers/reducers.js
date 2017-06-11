import { combineReducers } from 'redux';
import fxReducer from './fxReducer';

export default combineReducers({
  fx: fxReducer,
});
