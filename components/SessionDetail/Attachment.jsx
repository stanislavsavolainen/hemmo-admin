/*
 * React & Redux
 */
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import config from 'config';

/*
 * MaterialUI
 */
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';

// Icons
import FileDownload from 'material-ui/svg-icons/file/file-download';
import Close from 'material-ui/svg-icons/navigation/close';

class DialogContents extends Component {
  constructor() {
    super();

    this.state = {
      blobUrl: '',
      error: ''
    };
  }

  componentDidMount() {
    let url = `${config.API_ROOT}/attachment/${this.props.contentId}`;

    let request = new XMLHttpRequest();

    request.open('GET', url);
    request.setRequestHeader('Authorization', `Bearer ${this.props.token}`);
    request.responseType = 'blob';

    request.onreadystatechange = () => {
      if(request.readyState === 4) {
        if(request.status === 200) {
          let blobUrl = window.URL.createObjectURL(request.response);

          this.setState({blobUrl});
        } else {
          this.setState({error: 'An error occurred while fetching attachment. Please try again later.'});
        }
      }
    };

    request.send();
  }

  render() {
    if (this.state.error) {
      return <div style={{textAlign: 'center'}} >
        { this.state.error }
      </div>;
    } else if (!this.state.blobUrl) {
      return <div style={{textAlign: 'center'}} >
        <CircularProgress />
      </div>;
    } else {
      return (
        <div>
          <audio src={this.state.blobUrl} controls autoPlay style={{
            width: '100%',
            paddingBottom: '24px'
          }} />

          <FlatButton download={'attachment.mp4'} href={this.state.blobUrl}
            label='Download attachment' icon={<FileDownload/>} primary={false}/>
        </div>
      );
    }

  }
}

class Attachment extends Component {
  render() {
    const actions = [
      <FlatButton
        label='Close'
        primary={false}
        onTouchTap={this.props.handleClose}
        icon={<Close/>}
      />
    ];

    return (
      <Dialog
        title='Attachment'
        modal={ false }
        open={ this.props.open }
        onRequestClose={ this.props.handleClose }
        actions={ actions } >

        <DialogContents
          contentId={ this.props.contentId }
          token={ this.props.token } />

      </Dialog>
    );
  }
}

function select(state, ownProps) {
  return {
    token: state.auth.data.token
  };
}

export default connect(select)(Attachment);
