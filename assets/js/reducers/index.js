import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import table from './table';
import user from './user';

const appReducer = combineReducers({
  form,
  table,
  user,
});

export default function (state, action) {
  return appReducer(state, action);
}
