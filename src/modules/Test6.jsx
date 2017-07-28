import React from 'react';

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

import rest from '../utils/rest';

var global_var = 'not defined';

import { connect } from 'react-redux';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  click1() {
    //postData : { data1: global_var }
    let postBody = {
      data1: global_var,
    };

    console.log('dispatch /////////////////' + global_var);

    dispatch(
      rest.actions.reducer_module1({}, { body: JSON.stringify(postBody) }),
    );
    // dispatch(rest.actions.reducer_module1({}, { body : JSON.stringify(postBody) } , callBackFunction) );
    //callBackfunction get http-response as parameter
  },
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Test6 extends React.Component {
  button_click() {
    //dispatch
    console.log('dispatch /////////////////' + global_var);
    //dispatch(rest.actions.auth({}, { body: JSON.stringify(creds) }));
  }

  render() {
    return (
      <p>
        <TextField
          style={{ background: 'orange' }}
          onChange={event => (global_var = event.target.value)}
        />
        <Button
          style={{ background: '#FF00FF' }}
          onClick={() => this.props.click1()}
        >
          {' '}Using rest dispatch{' '}
        </Button>
      </p>
    );
  }
}
