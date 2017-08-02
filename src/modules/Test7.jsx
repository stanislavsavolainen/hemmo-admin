import React from 'react';

//field
var field = [];
var field_elements = [];
var field_value = 'not defined';

//initialState (write react value dirrect to reducer, calling dispatch function you update your value)
const initialState = { value: 'unknown', i_field_elements: [''] };

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

export const reducer = createReducer(
  {
    [HandleDataAction2]: (state, tmp) => {
      state.value = field_value;

      console.log(
        ' ********************* Button add data presset 2 ' + state.value,
      );

      //dispatch(HandleDataAction2());
      let element = (
        <TableRow>
          <TableCell>
            {' '}{field_value}{' '}
          </TableCell>
        </TableRow>
      );
      //field.push(element);

      return { state };
    },
  },
  initialState,
);

const mapStateToProps = state => ({
  //value: state.value
  server_answer: state.reducer_module2.data.foo,
});

const mapDispatchToProps = dispatch => ({
  HandleDataTest() {
    console.log('handle data dispatch');
    dispatch(HandleDataAction2(52));
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
  MyButtonClickFunc2() {
    console.log(
      '----------------------------------------- Rest function ------------------------------------',
    );
    let postBody = {
      data1: field,
    };
    dispatch(
      rest.actions.reducer_module2({}, { body: JSON.stringify(postBody) }),
    );
  },
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Test7 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  addElement() {
    // initialState.value = 5;

    console.log('add element to table');
    let element = (
      <TableRow>
        <TableCell>
          {' '}{field_value}{' '}
        </TableCell>
      </TableRow>
    );
    field.push(field_value);
    field_elements.push(element);
    this.setState(this.state);

    //test
    if (field_value === '4488') initialState.value = 10;
    else initialState.value = 5;
  }

  drawButton() {
    //onClick={() => this.props.MyButtonClickFunc()
    return (
      <div>
        {' '}<Button
          style={{ backgroundColor: 'silver', fontSize: 24, color: 'blue' }}
          onClick={() => this.addElement()}
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
          onClick={() => this.props.MyButtonClickFunc2()}
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
            field_elements.splice(0, field_elements.length);
            this.setState(this.state);
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
          field_value = event.target.value;
          this.props.HandleDataTest();
          console.log('1199');
        }}
      >
        {' '}
      </TextField>
    );
  }

  drawLayout() {
    let gui = '';

    let solut = (
      <TableRow>
        <TableCell>
          {' '}{field}{' '}
        </TableCell>
      </TableRow>
    );
    //gui.push(solut)

    let koko_taulu = (
      <Table>
        <TableBody>
          {field_elements}
        </TableBody>
      </Table>
    );

    return (
      <div>
        {' '}{koko_taulu}
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
