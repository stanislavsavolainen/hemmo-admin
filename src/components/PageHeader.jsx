import React from 'react';

import Typography from 'material-ui/Typography';

export default class PageHeader extends React.Component {
  render() {
    return (
      <Typography type="display1" style={{ margin: '2rem auto' }}>
        {this.props.header}
      </Typography>
    );
  }
}