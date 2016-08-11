import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';

import {
  Router,
  Route,
  browserHistory,
  IndexRoute,
  Redirect,
  NotFoundRoute
} from 'react-router'

import {
  syncHistoryWithStore,
  routerReducer,
  routerActions
} from 'react-router-redux'

import { UserAuthWrapper } from 'redux-auth-wrapper'

import App from '../containers/App';
import Login from '../containers/Login';
import Register from '../containers/Register';
import Logout from '../containers/Logout';

import Home from '../components/Home';
import Sessions from '../components/Sessions/SessionTable';
import Users from '../components/Users/UserTable';
import Preferences from '../components/Preferences';
import SessionDetail from '../components/SessionDetail/SessionDetail';
import UserDetail from '../components/UserDetail/UserDetail';

import configureStore from '../store/configureStore';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import theme from './material_ui_raw_theme_file';
const muiTheme = getMuiTheme(theme);

//Needed for React Developer Tools
window.React = React;

const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store);

const requireAuthentication = UserAuthWrapper({
  authSelector: state => state.auth.data || state.register.data,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'requireAuthentication'
})

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}>
      <Router history={history}>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route path='/' component={requireAuthentication(App)}>
          <IndexRoute component={Home}/>
          <Redirect from='/home' to='/' />
          <Route path='/sessions' component={Sessions}/>
          <Route path='/sessions/:id' component={SessionDetail}/>
          <Route path='/users/:id' component={UserDetail}/>
          <Route path='/users' component={Users}/>
          <Route path='/preferences' component={Preferences}/>
          <Route path='/logout' component={Logout}/>
        </Route>
        <Redirect from='*' to='/' />
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById("root")
);
