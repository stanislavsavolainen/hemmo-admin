import React from 'react';

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

import { connect } from 'react-redux';

import { createAction, createReducer } from 'redux-act';

// Initial state (hold this page values for reducer)
const initialState = {
  field_value: 'empty...',
  foo: 'bar',
};

// Reducer (create reducer for this react-page and export new values to store)
export const action1 = createAction('action_data1');
/*
let reducer_action = {

    [action1]: (state) => {
        field_value: state
    }

};
*/

export const reducer = createReducer(
  {
    [action1]: (state, val) => {
      return { ...state, field_value: val };
    },
  },
  initialState,
);

//store data from redux to component
const mapStateToProps = state => ({
  field_value: state.test.field_value,
  foo: state.test.foo,
});

//dispatch action to props --> state.dispatch() ---> can change values of store
const mapDispatchToProps = dispatch => ({
  //change value from props
  saveFieldValue: ch_value => {
    dispatch(action1(ch_value));
  },
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Test4 extends React.Component {
  draw_material_ui_gui() {
    return (
      <div>
        <TextField
          style={{ backgroundColor: 'silver' }}
          onChange={event => this.props.saveFieldValue(event.target.value)}
        />{' '}
        <br />
      </div>
    );
  }
  //-------------------------------------------------

  render() {
    return (
      <p>
        {' '}Redux test ! <br />
        <br /> {this.draw_material_ui_gui()} <br /> Redux store data :{' '}
        {this.props.field_value} <br />
        {this.props.foo}{' '}
      </p>
    );
    // return <p> Hello !!!!</p>;
  }
}
