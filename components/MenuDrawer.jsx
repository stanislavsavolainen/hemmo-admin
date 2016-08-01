import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Component, PropTypes } from 'react';
import { AppBar, Divider, Drawer, MenuItem } from 'material-ui';
import { PREFERENCES, USERS, SESSIONS, HOME } from '../constants/Views';
import { withRouter } from 'react-router';

import * as UiActions from '../actions/ui';

class MenuDrawer extends Component {
  changeView(view) {
    this.props.actions.changeView(view)
    this.props.router.push('/' + view.toLowerCase());
    this.props.actions.closeDrawer();
  }

  render() {
    return (
      <Drawer
        open={this.props.drawerOpened}
        docked={false}
        onRequestChange={this.props.actions.closeDrawer}
      >
        <AppBar title="Navigation"
                onLeftIconButtonTouchTap={this.props.actions.closeDrawer}
        />

        <MenuItem
          onTouchTap={() => {this.changeView(HOME)}}
          style={this.props.activeView === HOME ? { color: 'rgb(0, 188, 212)' } : null}
        >
          Home
        </MenuItem>

        <MenuItem
          onTouchTap={() => {this.changeView(SESSIONS)}}
          style={this.props.activeView === SESSIONS ? { color: 'rgb(0, 188, 212)' } : null}
        >
          Sessions
        </MenuItem>

        <MenuItem
          onTouchTap={() => {this.changeView(USERS)}}
          style={this.props.activeView === USERS ? { color: 'rgb(0, 188, 212)' } : null}
        >
          Users
        </MenuItem>

        <Divider />

        <MenuItem
          onTouchTap={() => {this.changeView(PREFERENCES)}}
          style={this.props.activeView === PREFERENCES ? { color: this.context.muiTheme.palette.primary1Color } : null}
        >
          Preferences
        </MenuItem>
      </Drawer>
    );
  }
}

MenuDrawer.contextTypes = {
  muiTheme: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    view: state.ui.get('view'),
    drawerOpened: state.ui.get('drawerOpened')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(UiActions, dispatch)
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuDrawer));
