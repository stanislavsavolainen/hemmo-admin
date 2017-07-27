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
  login: 'f_login',
  password: 'f_password',
  name: 'f_name',
  surname: 'f_surname',
  profession: 'f_profession',
  email: 'f_email',
};

import { connect } from 'react-redux';

import { createAction, createReducer } from 'redux-act';

export const HandleDataAction = createAction('handle_action');

export const reducer = createReducer(
  {
    [HandleDataAction]: (state, params) => {
      const n_id = params.id;
      const n_content = params.content;
      console.log(n_id + '>>> ' + n_content);

      if (n_id === field_title.login) {
        state.iLogin = n_content;
      } else if (n_id === field_title.password) {
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
      return { ...state };
      //return { ...state, field_value: val };
    },
  },
  initialState,
); //action, initialState

const mapStateToProps = state => ({
  pLogin: state.multidata.iLogin,
  pPassword: state.multidata.iPassword,
  pName: state.multidata.iName,
  pSurname: state.multidata.iSurname,
  pProfession: state.multidata.iProfession,
  pEmail: state.multidata.iEmail,
});

const mapDispatchToProps = dispatch => ({
  // dispatch(HandleDataAction),
  saveFieldValue: (m_id, m_content) => {
    console.log(' ******** Dispatch ****** ' + m_content);

    dispatch(HandleDataAction({ id: m_id, content: m_content }));
  },
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
        onChange={event =>
          this.props.saveFieldValue(field_id, event.target.value)}
      />
    );
  }

  drawPasswordField(field_id) {
    return (
      <TextField
        className="tyyli1"
        type="password"
        onChange={event =>
          this.props.saveFieldValue(field_id, event.target.value)}
      />
    );
  }

  drawLayout() {}

  drawGUI() {
    return (
      <div>
        <br /> Login {this.drawField(field_title.login)}
        <br /> Password : {this.drawPasswordField(field_title.password)}
        <br />
        <br /> Name : {this.drawField(field_title.name)}
        <br /> Surname {this.drawField(field_title.surname)}
        <br /> Profession {this.drawField(field_title.profession)}
        <br /> E-mail {this.drawField(field_title.email)}
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
        {' '}<p> test 5 </p> <br /> {this.drawGUI()}
        <br />
        <br />
        Print redux store (this page props) :
        <br /> Login : {this.props.pLogin}
        <br /> Password : {this.props.pPassword}
        <br /> Name : {this.props.pName}
        <br /> Surname : {this.props.pSurname}
        <br /> Profession : {this.props.iProfession}
        <br /> Email : {this.props.pEmail}
      </div>
    );
  }
}
