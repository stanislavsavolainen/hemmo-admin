import React from 'react';
import { injectIntl } from 'react-intl';

import List, { ListItem, ListItemText } from 'material-ui/List';
import Menu, { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';

import Button from 'material-ui/Button';

import Card, {
  CardContent,
  CardMedia,
} from 'material-ui/Card';

import { connect } from 'react-redux';
import { updateIntl } from 'react-intl-redux';

import { reset } from './Logout';

import { languages, storeLocaleForUser } from '../utils/intl';

import CardGridWrapper from '../components/CardGridWrapper';


//**************************** */

import Avatar from 'material-ui/Avatar';
import FolderIcon from 'material-ui-icons/Folder';

import imgUrl1 from '../assets/mypic/gb_1278.jpg';
import imgUrl2 from '../assets/mypic/finland-flag-icon-32.png';


const styles = {

  mystyle1: {
    background: `url(${imgUrl1})`,
    height: 32,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    objectFit: 'cover',
    width: 32,
  },

  mystyle2:{
     background: `url(${imgUrl2})`,
    height: 32,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    objectFit: 'cover',
    width: 32,
  }



}



const mapStateToProps = state => ({
  activeLanguage: state.intl.locale,
  user: state.auth.data.decoded,
});

const mapDispatchToProps = dispatch => ({
  changeLanguage: (user, locale) => {
    storeLocaleForUser(user.email, locale);
    dispatch(updateIntl({
      locale,
      messages: languages[locale].translations,
    }));
  },
  doClearState: () => {
    dispatch(reset());
  },
});

@injectIntl
@connect(mapStateToProps, mapDispatchToProps)
export default class Preferences extends React.Component {
  static defaultProps = {
    user: {
      email: 'Default user',
      scope: 'user',
    },
  };

  state = {
    languageMenuOpen: false,
    languageMenuAnchor: null,
  };

  render() {
    const {
      activeLanguage,
      changeLanguage,
      doClearState,
      user,
      intl: { formatMessage },
    } = this.props;

 //<Avatar src="../assets/mypic/gb_1278.jpg"></Avatar>  at <CardMedia> place here
  
  //<Card>
    //         <CardMedia> <div style={styles.mystyle1} /> </CardMedia>
    //  </Card>

    let lang = "";

    if( languages[activeLanguage] === languages.fi  ){
      lang =  <CardMedia> <div style={styles.mystyle2} /> </CardMedia> 
    }
    else if(   languages[activeLanguage] === languages.en ){
       lang =  <CardMedia> <div style={styles.mystyle1} /> </CardMedia> 
    }


    return (
       
     
      <CardGridWrapper>
        <Card>
         
          <CardContent>
            <Typography type="headline">{formatMessage({ id: 'language' })}</Typography>
              
            <List>
              <ListItem
                button
                aria-haspopup="true"
                aria-controls="language-menu"
                aria-label="App language"
                onClick={e => this.setState({
                  languageMenuOpen: true,
                  languageMenuAnchor: e.currentTarget,
                })}
              >
               {lang}
                <ListItemText
                  primary={formatMessage({ id: 'selectedLanguage' })}
                  secondary={languages[activeLanguage] ? languages[activeLanguage].name : 'unknown'}
                />
              </ListItem>
            </List>
            <Menu
              id="language-menu"
              anchorEl={this.state.languageMenuAnchor}
              open={this.state.languageMenuOpen}
              onRequestClose={() => this.setState({ languageMenuOpen: false })}
            >
              {
                Object.keys(languages).map(language => (
                  <MenuItem
                    key={language}
                    selected={language === activeLanguage}
                    onClick={() => {
                      changeLanguage(user, language);
                      this.setState({ languageMenuOpen: false });
                    }}
                  >
                    {languages[language].name}
                  </MenuItem>
                ))
              }
            </Menu>
          </CardContent>
          <CardContent>
            <Typography type="headline">{formatMessage({ id: 'resetState' })}</Typography>
            <Typography>{formatMessage({ id: 'resetStateExplanation' })}</Typography>
          </CardContent>
          <CardContent>
            <Button
              raised
              color="accent"
              onClick={doClearState}
            >
              {formatMessage({ id: 'resetStateButton' })}
            </Button>
          </CardContent>
        </Card>
      </CardGridWrapper>
    );
  }
}
