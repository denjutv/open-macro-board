import { combineReducers } from 'redux';
import buttonReducer from './button';

export default combineReducers({
  buttons: buttonReducer
});