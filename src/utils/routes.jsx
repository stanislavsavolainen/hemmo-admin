import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';

/*
Configure all your app's routes here.

The first route will be aliased to '/' (index route)

Each route contains the following keys:
  - path:
    * URL path of route.
  - name:
    * Name of route as displayed in header.
    * Used as i18n id, remember to add translations to translations/*.js
  - component:
    * Which component to render when route is active.
    * Remember to import it below.
  - icon:
    * Which icon to use in NavigationDrawer for route.
    * Takes icon font string as found on: https://material.io/icons
  - requiresLogin:
    * Does the route require user to be authenticated?
    * Redirects to login screen for unauthenticated users.

Routes may optionally contain the following keys:
  - separator:
    * Whether to show a separator in NavigationDrawer below route
  - hideWhenScope:
    * Array of scopes, if user scope found in array hide route from NavigationDrawer.
    * null scope in array means unauthenticated.
*/

// Icons
import HomeIcon from 'material-ui-icons/Home';
import FeedbackIcon from 'material-ui-icons/Assessment';
import ChildrenIcon from 'material-ui-icons/SupervisorAccount';
import PreferencesIcon from 'material-ui-icons/Settings';
import LoginIcon from 'material-ui-icons/AccountCircle';
import LogoutIcon from 'material-ui-icons/ExitToApp';

import TestIcon from 'material-ui-icons/Extension';
import TestIcon2 from 'material-ui-icons/Build';

// Components
import Home from '../modules/Home';
import Feedback from '../modules/Feedback';
// import FeedbackDetail from '../modules/FeedbackDetail';
import Children from '../modules/Children';
import ChildWrapper from '../modules/ChildWrapper';
import Preferences from '../modules/Preferences';
import Login from '../modules/Login';
import Logout from '../modules/Logout';
import NotFound from '../modules/NotFound';

import TestA from '../modules/Test1';
import TestB from '../modules/Test2';
import TestC from '../modules/Test3';
import TestD from '../modules/Test4';
import TestE from '../modules/Test5';

// Routes
const routeConfigs = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    icon: HomeIcon,
    requiresLogin: true,
    showInMenu: true,
    exact: true,
  },
  {
    path: '/feedback',
    name: 'Feedback',
    component: Feedback,
    icon: FeedbackIcon,
    requiresLogin: true,
    showInMenu: true,
    exact: true,
  },
  {
    path: '/children/:childId/feedback/:feedbackId',
    component: ChildWrapper,
    requiresLogin: true,
    showInMenu: false,
  },
  {
    path: '/children/:childId',
    component: ChildWrapper,
    requiresLogin: true,
    showInMenu: false,
  },
  {
    path: '/children',
    name: 'Children',
    component: Children,
    icon: ChildrenIcon,
    separator: true,
    requiresLogin: true,
    showInMenu: true,
    exact: true,
  },
  {
    path: '/preferences',
    name: 'Preferences',
    component: Preferences,
    icon: PreferencesIcon,
    requiresLogin: true,
    showInMenu: true,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    icon: LoginIcon,
    requiresLogin: false,
    hideWhenScope: ['employee', 'admin'],
    showInMenu: true,
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
    icon: LogoutIcon,
    requiresLogin: false,
    hideWhenScope: [null],
    showInMenu: true,
  },
  {
    path: '/test1',
    name: 'My test 1',
    component: TestA,
    icon: TestIcon,
    requiresLogin: false,
    hideWhenScope: [null],
    showInMenu: true,
  },
  {
    path: '/test2',
    name: 'My test 2',
    component: TestB,
    icon: TestIcon,
    requiresLogin: false,
    hideWhenScope: [null],
    showInMenu: true,
  },
  {
    path: '/test3',
    name: 'My test 3',
    component: TestC,
    icon: TestIcon2,
    requiresLogin: false,
    hideWhenScope: [null],
    showInMenu: true,
  },
  {
    path: '/test4',
    name: 'My test 4',
    component: TestD,
    icon: TestIcon2,
    requiresLogin: false,
    hideWhenScope: [null],
    showInMenu: true,
  },
  {
    path: '/test5',
    name: 'My test 5',
    component: TestE,
    icon: TestIcon2,
    requiresLogin: false,
    hideWhenScope: [null],
    showInMenu: true,
  },
];

export default routeConfigs;

/*
Code below this line configures the routes as given by routeConfigs
*/

// PropTypes "schema" for routeConfig
export const RouteConfigShape = PropTypes.shape({
  path: PropTypes.string.isRequired,
  name: PropTypes.string,
  component: PropTypes.func.isRequired,
  icon: PropTypes.func,
  requiresLogin: PropTypes.bool,
});

const mapStateToProps = state => ({
  loggedIn: !!state.auth.data.token,
});

// Takes a routeConfig and wraps it in react-router's <Route> component.
// If requiresLogin is true, redirect to /login if user has not authenticated

// Must wrap in withRouter here to avoid this:
// https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
@withRouter
@connect(mapStateToProps)
class AuthRedirectRoute extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool,
    requiresLogin: PropTypes.bool,
    component: PropTypes.func.isRequired,
  };

  static defaultProps = {
    loggedIn: false,
    requiresLogin: false,
  };

  render() {
    const {
      component: ChildComponent,
      loggedIn,
      requiresLogin,
      ...rest
    } = this.props;

    return (
      <Route
        {...rest}
        render={props =>
          !requiresLogin || loggedIn
            ? <ChildComponent {...props} />
            : <Redirect
                to={{
                  pathname: '/login',
                  state: { from: props.location },
                }}
              />}
      />
    );
  }
}

// Map all configured routes into AuthRedirectRoute components
export const ConfiguredRoutes = ({ ...rest }) =>
  <Switch>
    {routeConfigs.map(routeConfig =>
      <AuthRedirectRoute key={routeConfig.path} {...routeConfig} {...rest} />,
    )}
    <Route component={NotFound} />
  </Switch>;

// Return list of routes to show in navigation element(s)
export const NavigationRoutes = (user, path) => {
  const scope = user ? user.scope : null;

  return routeConfigs.reduce((ary, route) => {
    let active = path === route.path;
    const hide =
      Array.isArray(route.hideWhenScope) && route.hideWhenScope.includes(scope);
    const isAuthenticated = route.requiresLogin ? user !== null : true;

    if (route.path === routeConfigs[0].path && path === '/') {
      active = true;
    }

    if (route.showInMenu && !hide && isAuthenticated) {
      ary.push({ ...route, active });
    }

    return ary;
  }, []);
};

// Check that routeConfigs array is a valid RouteConfigShape
PropTypes.checkPropTypes(
  {
    routeConfigs: PropTypes.arrayOf(RouteConfigShape).isRequired,
  },
  { routeConfigs },
  'prop',
  'routeConfigs',
);
