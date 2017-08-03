import React from 'react';

//field
//var field = [];
//var field_elements = [];
//var field_value = 'not defined';

//initialState (write react value dirrect to reducer, calling dispatch function you update your value)
//const initialState = { value: 'unknown', i_field_elements: ['66666444, 343456'] };
const initialState = {
  value: 'unknown',
  i_field_elements: ['66666444, 343456'],
};

import rest from '../utils/rest';

//material-ui components
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

//Table for react layouts
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';

//redux-rest
import { connect } from 'react-redux';

//redux-local

import { createAction, createReducer } from 'redux-act';
export const HandleDataAction2 = createAction('handle_action2');
export const InputValue = createAction('inputvalue_action1');

export const reducer = createReducer(
  {
    [HandleDataAction2]: state => {
      //state.value = field_value;

      console.log(
        '====== Redux -> HandleDataAction2 function : ' + state.value,
      );

      state.i_field_elements.push(state.value);

      return { ...state };
    },
    [InputValue]: (state, params) => {
      state.value = params;
      return { ...state };
    },
  },
  initialState,
);

const mapStateToProps = state => ({
  //value: state.value
  server_answer: state.reducer_module2.data.foo,
  redux_store_answer: state.act_and_rest.i_field_elements,
});

const mapDispatchToProps = dispatch => ({
  HandleDataTest() {
    console.log('handle data dispatch');
    dispatch(HandleDataAction2());
  },
  InputValue(field_value) {
    dispatch(InputValue(field_value));
  },

  /*
      //redux-act
      MyButtonClickFunc(){
        //   console.log("button pressed : " +field_value);
  
          //  let element = <TableRow><TableCell> { field_value  } </TableCell></TableRow> ;
           //   field.push(element);
  
  
       // dispatch(
       // rest.actions.reducer_module1({}, { body: JSON.stringify(postBody) }),
       //);
          //dispatch(HandleDataAction2());
  
         // this.setState(this.state),
      
          //dispatch(HandleDataAction2());
      
      },
      */
  //http-request via rest here
  MyButtonClickFunc2(fields) {
    console.log(
      '----------------------------------------- Rest function ------------------------------------',
    );
    let postBody = {
      // data1: field,
      data1: fields,
    };
    dispatch(
      rest.actions.reducer_module2({}, { body: JSON.stringify(postBody) }),
    );
  },
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Test7 extends React.Component {
  /*
  constructor(props) {
    super(props);
    this.state = {};
  }
  */

  drawButton() {
    //onClick={() => this.props.MyButtonClickFunc()
    return (
      <div>
        {' '}<Button
          style={{ backgroundColor: 'silver', fontSize: 24, color: 'blue' }}
          onClick={() => {
            //this.addElement();
            this.props.HandleDataTest();
          }}
        >
          {' '}Add new field{' '}
        </Button>{' '}
      </div>
    );
  }

  drawButton2() {
    return (
      <div>
        {' '}<Button
          style={{ backgroundColor: 'silver', fontSize: 24, color: 'green' }}
          onClick={() =>
            this.props.MyButtonClickFunc2(this.props.redux_store_answer)}
        >
          {' '}Send to server{' '}
        </Button>{' '}
      </div>
    );
  }

  drawButton3() {
    return (
      <div>
        {' '}<Button
          style={{ backgroundColor: 'silver', fontSize: 24, color: 'red' }}
          onClick={() => {
            // field_elements.splice(0, field_elements.length);
            // this.setState(this.state);
            this.props.redux_store_answer.splice(
              0,
              this.props.redux_store_answer.lenght,
            );
          }}
        >
          {' '}Clear{' '}
        </Button>{' '}
      </div>
    );
  }

  drawTextField() {
    return (
      <TextField
        onChange={event => {
          //field_value = event.target.value;
          // this.props.HandleDataTest();
          this.props.InputValue(event.target.value);
          console.log('1199');
        }}
      >
        {' '}
      </TextField>
    );
  }

  drawLayout() {
    let koko_taulu = (
      <Table>
        <TableBody>
          {this.props.redux_store_answer}
        </TableBody>
      </Table>
    );

    return (
      <div>
        {' '}{koko_taulu}
        <br />
        <br />
        Redux- act store : {this.props.redux_store_answer}
      </div>
    );
  }

  render() {
    let val = '';

    if (initialState.value === 10) {
      val = <Button style={{ color: 'orange' }}> Hidden button </Button>;
    } else {
      val = <div> Nothing special </div>;
    }

    return (
      <div className="luokka1">
        {' '}<p>
          {' '}test 7 <br /> {this.drawLayout()}{' '}
        </p>{' '}
        <br />
        <br /> {this.drawTextField()} {this.drawButton()} {this.drawButton2()}{' '}
        {this.drawButton3()} <br />
        <br /> Server response : {this.props.server_answer}
        <br />
        <br /> {val}
      </div>
    );
  }
}
