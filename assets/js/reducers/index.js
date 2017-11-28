import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import table from './table';

const appReducer = combineReducers({
  form,
  table,
});

export default function (state, action) {
  return appReducer(state, action);
}
