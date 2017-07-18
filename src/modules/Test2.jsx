import React from 'react';

import TableCard from '../components/TableCard';

import Toolbar from 'material-ui/Toolbar';

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

export default class Test2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldvalue: '',
      additionalValue: 'abcdabcd',
      value1: 'name',
      value2: 'age',
      value3: 'profession',
    };
  }

  //=============== LAYOUTS AND VIEW ===========================================

  drawTextArea() {
    return (
      <TextField
        className="tyyli1"
        onChange={event => {
          //  this.state.fieldvalue =  event.target.value;
          this.setState({ fieldvalue: event.target.value });
        }}
      >
        {' '}
      </TextField>
    );
  }

  drawButton() {
    return (
      <Button className="tyyli1" onClick={() => this.sendDataToServer1()}>
        {' '}Send data to server{' '}
      </Button>
    );
  }

  drawLayout() {
    //let table = <div></div>;

    // return  <TableCard style={{ verticalAlign: 'middle',  backgroundColor: 'orange' }}  />
    return (
      <Toolbar className="toolbar">
        {' '}Enter text for server: {this.drawTextArea()} <br />{' '}
        {this.drawButton()}{' '}
      </Toolbar>
    );
  }

  //========= LISTENER AND ACTION =============================================

  //------------ POST method function ----------------
  sendDataToServer1() {
    //send http-request to hemmo-backend butto
    let host = 'http://127.0.0.1:3001';
    let link = '/data_to_server1';

    // host + link = 127.0.0.3000/data_to_server // require that kind of end point to backend to handle http-request
    //FETCH -> POST (head , body -> content-type: JSON ) ,
    let postData = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    };

    fetch(host + link, postData)
      .then(resp => {
        return resp.json();
      })
      .then(r => {
        console.log('Fetch done successfuly !');
        //back-end response here
        //*********************************************************************** */
        this.state.additionalValue = 'http-respond, method=POST ' + r;
        this.setState(this.state);
      })
      .catch(err => {
        console.log('404 error, page not found');
        console.log('ERR', err);
      });

    console.log('Send http-request to end-point : ' + host + link);
    console.log('current message is :' + this.state.fieldvalue);
  }

  //------------  GET METHOD function --------------

  //GET method
  sendDataToServer2() {
    let host = 'http://127.0.0.1:3001';
    let link = '/data_to_server2';
    // let query_string = "?data1="+this.state.fieldvalue; //key-value of variables
    let query_string =
      '?field1=' +
      this.state.fieldvalue +
      '&data1=' +
      this.state.value1 +
      '&data2=' +
      this.state.value2 +
      '&data3=' +
      this.state.value3;

    let getData = {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    };

    fetch(host + link + query_string, getData)
      .then(resp => {
        return resp.json();
      })
      .then(response => {
        //server reply back

        this.state.additionalValue = 'http-respond, method=GET ' + response;
        this.setState(this.state);
      })
      .catch(err => {
        //connection error
      });
  }

  //------------ POST method function ----------------

  //==========================================================================

  render() {
    return (
      <div className="luokka1">
        {' '}<p> test 2 </p> {this.drawLayout()} <br /> Server response : <br />{' '}
        {this.state.additionalValue}{' '}
      </div>
    );
  }
}
