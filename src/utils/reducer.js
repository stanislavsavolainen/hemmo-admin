import { combineReducers } from 'redux';

import { routerReducer } from 'react-router-redux';
import { reducer as drawer } from '../modules/NavigationDrawer';
import { reducer as intl } from './intl';
import { reducer as err } from '../modules/ErrorSnackbar';
import { reducers as restReducers } from './rest';

import { reset } from '../modules/Logout';

import { reducer as test } from '../modules/Test4';

import { reducer as multidata } from '../modules/Test5';

const reducers = {
  // Navigation drawer state
  drawer,

  // Internationalization state
  intl,

  // Error snackbar component state
  err,

  // Router state
  router: routerReducer,

  // REST API endpoints' state
  ...restReducers,

  //Test4
  test,

  //Test5
  multidata,
};

const appReducer = combineReducers(reducers);
const rootReducer = (state, action) => {
  if (action.type === reset.getType()) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
