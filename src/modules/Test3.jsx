import React from 'react';

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Menu, { MenuItem } from 'material-ui/Menu';
import List, { ListItem, ListItemText } from 'material-ui/List';

//import SelectField from 'material-ui/SelectField';

export default class Test3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl_a: undefined,
      anchorEl_b: undefined,
      open_a: false,
      open_b: false,
      selectedIndex: 1,
      selectedIndex_b: 1,

      //mood = ["Rauhallinen","Surullinen","Iloinen","Jännittynyt","Riehakas","Yksinäinen", "Innostunut"]
      options: [
        'Rauhallinen',
        'Surullinen',
        'Iloinen',
        'Jännittynyt',
        'Riehakas',
        'Yksinäinen',
        'Innostunut',
      ],
      activities: [
        'Puuhasimme-Kokkailu',
        'Puuhasimme-Lukeminen',
        'Lemmikit-Kotielaimet',
      ],

      //activities = ["Lukeminen", "Kokkailu", "Lemmikit", ""]
      feedback_info: 'No data',
    };
  }

  //-----------------------

  handleClickListItem = event => {
    this.setState({ open_a: true, anchorEl_a: event.currentTarget });
  };

  handleClick = event => {
    this.setState({ open_a: true, anchorEl_a: event.currentTarget });
  };

  handleMenuItemClick = (event, index) => {
    this.setState({ selectedIndex: index, open_a: false });
  };

  handleRequestClose = () => {
    this.setState({ open_a: false });
  };

  //***** */

  handleClickListItem2 = event => {
    this.setState({ open_b: true, anchorEl_b: event.currentTarget });
  };

  handleClick2 = event => {
    this.setState({ open_b: true, anchorEl_b: event.currentTarget });
  };

  handleMenuItemClick2 = (event, index) => {
    this.setState({ selectedIndex_b: index, open_b: false });
  };

  handleRequestClose2 = () => {
    this.setState({ open_b: false });
  };

  //------------------------

  SendDataToServer() {
    console.log(' -----> Send data to server , fetch3 ');

    // ---------  data for payload -----------------

    var s_main, s_sub;

    switch (this.state.selectedIndex_b) {
      case 0:
        s_main = 'Puuhasimme';
        s_sub = 'Kokkailu';
        break;
      case 1:
        s_main = 'Puuhasimme';
        s_sub = 'Lukeminen';
        break;
      case 2:
        s_main = 'Lemmikit';
        s_sub = 'Kotielaimet';
        break;
    }

    let post_body = {
      activities: {
        main: s_main,
        sub: s_sub,
        like: 1,
      },

      mood: this.state.selectedIndex,
    };

    let postData = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post_body),
    };

    /*
      let postData = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    };
   */

    //------- connection -------------------------

    let host = 'http://127.0.0.1:3001';
    let link = '/data_to_server3';

    fetch(host + link, postData)
      .then(resp => {
        return resp.json();
      })
      .then(r => {
        console.log('Fetch 3 done successfuly !');
        //back-end response here
        //*********************************************************************** */
      })
      .catch(err => {
        console.log('404 error, page not found');
        console.log('ERR', err);
      });

    console.log('Send http-request to end-point : ' + host + link);
  }

  drawLayout() {
    return (
      <div>
        <br />
        <br />
        Your mood : {this.drawDropDownMenu()}
        <br /> <br />
        Your activities : {this.drawDropDownMenu2()}
        <br />
        <br />
        <Button className="tyyli1" onClick={() => this.SendDataToServer()}>
          {' '}Send Feedback{' '}
        </Button>
      </div>
    );
  }

  drawDropDownMenu() {
    let item_list = this.state.options.map((option, index) =>
      <MenuItem
        key={option}
        selected={index === this.state.selectedIndex}
        onClick={event => this.handleMenuItemClick(event, index)}
      >
        {option}
      </MenuItem>,
    );

    return (
      <div>
        <List>
          <ListItem
            button
            aria-haspopup="true"
            aria-controls="lock-menu"
            onClick={this.handleClickListItem}
          >
            <ListItemText
              secondary={this.state.options[this.state.selectedIndex]}
            />
          </ListItem>
        </List>

        <Menu
          id="lock-menu"
          anchorEl={this.state.anchorEl_a}
          open={this.state.open_a}
          onRequestClose={this.handleRequestClose}
        >
          {item_list}
        </Menu>
      </div>
    );
  }

  drawDropDownMenu2() {
    let item_list = this.state.activities.map((option, index) =>
      <MenuItem
        key={option}
        selected={index === this.state.selectedIndex_b}
        onClick={event => this.handleMenuItemClick2(event, index)}
      >
        {option}
      </MenuItem>,
    );

    return (
      <div>
        <List>
          <ListItem
            button
            aria-haspopup="true"
            aria-controls="lock-menu"
            onClick={this.handleClickListItem2}
          >
            <ListItemText
              secondary={this.state.activities[this.state.selectedIndex_b]}
            />
          </ListItem>
        </List>

        <Menu
          id="lock-menu"
          anchorEl={this.state.anchorEl_b}
          open={this.state.open_b}
          onRequestClose={this.handleRequestClose2}
        >
          {item_list}
        </Menu>
      </div>
    );
  }

  render() {
    /*
    switch(this.state.selectedIndex){
        case 0: this.state.feedback_info = "I'm satisfied"; break;
        case 1: this.state.feedback_info = "that's ok"; break;
        case 2: this.state.feedback_info = "I'm unhappy"; break;
        default: this.state.feedback_info = "no data"; break;
    }
  */
    this.state.feedback_info =
      'Mood : ' +
      this.state.options[this.state.selectedIndex] +
      ' Activities : ' +
      this.state.activities[this.state.selectedIndex_b];

    return (
      <div className="luokka1">
        jotain {this.drawLayout()}
        <br />
        <br />
        feedback : {this.state.feedback_info}
      </div>
    );
  }
}
