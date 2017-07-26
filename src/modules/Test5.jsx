import React from 'react';

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

//initialState for reducer
const initialState = {
  iLogin: 'not defined',
  iPassword: 'not defined',
  iName: 'not defined',
  iSurname: 'not defined',
  iProfession: 'not defined',
  iEmail: 'not defined',
};

//field_names
const field_title = {
  field_login: 'f_login',
  field_password: 'f_',
  field_name: 'f_login',
  field_surname: 'f_login',
  field_profession: 'f_login',
  field_email: 'f_email',
};

import { connect } from 'react-redux';

import { createAction, createReducer } from 'redux-act';

export const HandleDataAction = createAction('handle_action');

export const reducer = createReducer(
  {
    [HandleDataAction]: (state, n_id, n_content) => {
      if (n_id === field_title.field_login) {
        state.iLogin = n_content;
      } else if (n_id === field_title.field_password) {
        state.iPassword = n_content;
      } else if (n_id === field_title.name) {
        state.iName = n_content;
      } else if (n_id === field_title.surname) {
        state.iSurname = n_content;
      } else if (n_id === field_title.profession) {
        state.iProfession = n_content;
      } else if (n_id === field_title.email) {
        state.iEmail = n_content;
      }

      //return { ...state, field_value: val };
      return state;
    },
  },
  initialState,
); //action, initialState

const mapStateToProps = state => ({
  pLogin: state.multidata.iLogin,
  pPassword: state.multidata.iPassword,
  pName: state.multidata.pName,
  pSurname: state.multidata.iSurname,
  pProfession: state.multidata.iProfession,
  pEmail: state.multidata.iEmail,
});

const mapDispatchToProps = dispatch => ({
  // dispatch(HandleDataAction),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Test5 extends React.Component {
  // ------------- field handler -------------------------

  getValueFromField(field_id, field_content) {
    //dispatch to redux store

    console.log(
      'Handler function -> Field id : ' +
        field_id +
        ' field content : ' +
        field_content,
    );
  }

  //------------- material-ui functions ------------------

  drawButton() {
    return (
      <div>
        {' '}<Button className="tyyli1" onClick={() => console.log('123')}>
          {' '}Send data to server{' '}
        </Button>{' '}
      </div>
    );
  }

  drawField(field_id) {
    return (
      <TextField
        className="tyyli1"
        onChange={event => this.getValueFromField(field_id, event.target.value)}
      />
    );
  }

  drawPasswordField(field_id) {
    return (
      <TextField
        className="tyyli1"
        type="password"
        onChange={event => this.getValueFromField(field_id, event.target.value)}
      />
    );
  }

  drawLayout() {}

  drawGUI() {
    return (
      <div>
        <br /> Login {this.drawField(field_title.field_login)}
        <br /> Password : {this.drawPasswordField(field_title.field_password)}
        <br />
        <br /> Name : {this.drawField(field_title.field_name)}
        <br /> Surname {this.drawField(field_title.field_surname)}
        <br /> Profession {this.drawField(field_title.field_profession)}
        <br /> E-mail {this.drawField(field_title.field_email)}
        <br /> Radio - button option 1
        <br /> radio - button option 2
        <br /> {this.drawButton()}
      </div>
    );
  }

  render() {
    return (
      //this.props.pLogin;

      // ------------- redux store props ---------------------

      <div className="luokka1">
        {' '}<p> test 5 </p>  <br /> {this.drawGUI()}
      </div>
    );
  }
}
