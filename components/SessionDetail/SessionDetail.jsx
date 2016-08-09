import { Component, PropTypes } from 'react';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

import Attachment from './Attachment';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {
  red300,
  yellow300,
  lightGreen300
} from 'material-ui/styles/colors';
import ActionDone from 'material-ui/svg-icons/action/done';
import Refresh from 'material-ui/svg-icons/navigation/refresh';
import ErrorOutline from 'material-ui/svg-icons/alert/error-outline';
import rest from '../../reducers/api';
import { withRouter } from 'react-router';
import { goBack } from 'react-router-redux';
import Error from '../Error';
import ThumbUp from 'material-ui/svg-icons/social/sentiment-satisfied';
import ThumbDown from 'material-ui/svg-icons/social/sentiment-dissatisfied';
import Neutral from 'material-ui/svg-icons/social/sentiment-neutral';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

class SessionDetail extends Component {
  constructor(props) {
    super(props);

    // for toggles states
    this.state = {
      attachmentOpen: false,
      openAttachmentContentId: null
    };
    this.markReviewed = this.markReviewed.bind(this);
  }

  handleClose = () => {
    this.setState({
      attachmentOpen: false,
      openAttachmentContentId: null});
  };

  refresh() {
    const {dispatch} = this.props;
    dispatch(rest.actions.sessionDetail({sessionId: this.props.id}));
  }

  componentDidMount() {
    this.refresh();
  }

  openAttachment(contentId) {
    this.setState({
      attachmentOpen: true,
      openAttachmentContentId: contentId
    });
  }

  markReviewed() {
    const self = this;
    const callback = function() {
      self.refresh();
    };
    const {dispatch} = this.props;
    dispatch(rest.actions.sessionUpdate({sessionId: this.props.id}, {
      body: JSON.stringify({
        reviewed: true
      })
    }, callback));
  }

  render() {
    const { session } = this.props;

    console.log(session);
    if (session.loading) {
      return(
        <div style={{textAlign: 'center'}}>
          <CircularProgress/>
        </div>
      );
    } else if (!session.sync || !session.data || session.data.error) {
      return(
        <Error model={session}/>
      );
    } else {
      return(
        <div>
          <Card style={{
            margin: this.context.muiTheme.spacing.desktopGutter
          }}>
              <CardActions>
                <FlatButton label="Back"
                            onTouchTap={() => {
                              this.props.dispatch(goBack());
                            }}
                            icon={<ArrowBack/>} />
              </CardActions>
            <CardTitle title="Session overview" />
            <CardText>
              <div>
                User: {session.data.user.name}<br/>
                Review status: {session.data.reviewed.toString()}<br/>
                Started: {session.data.startedAt}<br/>
              </div>
            </CardText>
            {session.reviewed ?
              null :
              <CardActions>
                <FlatButton label="Mark reviewed"
                            onTouchTap={() => {
                              this.markReviewed()
                            }}
                            primary={true}
                            icon={<ActionDone/>} />
              </CardActions>
            }
          </Card>

          {session.data.content.map((row, index) => (
            <Card key={index} style={{
              margin: this.context.muiTheme.spacing.desktopGutter
            }}>
              <CardHeader
                title={`Question ${index + 1}`}
                style={{
                  backgroundColor: row.like === 1 ? lightGreen300 : row.like === -1 ? red300 : yellow300
                }}
                avatar={((row) => {
                  if (row.like === 1) {
                    return (<ThumbUp/>);
                  } else if (row.like === -1) {
                    return (<ThumbDown/>);
                  } else {
                    return (<Neutral/>);
                  }
                })(row)} />
              <CardTitle title={ row.question }/>
              <CardText>
                <div>
                  <b>Answer: </b>
                  { row.answer }
                </div>
              </CardText>
              <CardActions>
                {((row) => {
                  if (row.hasAttachment) {
                    return <FlatButton label="View attachment" primary={true}/>;
                  } else {
                    return null;
                  }
                })(row)}
              </CardActions>
            </Card>
          ))}

          <Dialog
            title="Attachment"
            modal={false}
            open={this.state.attachmentOpen}
            onRequestClose={this.handleClose}
          >
            <Attachment contentId={this.state.openAttachmentContentId} />
          </Dialog>
        </div>
      );
    }
  }
}

SessionDetail.contextTypes = {
  muiTheme: PropTypes.object.isRequired
};

function select(state, ownProps) {
  return {
    session: state.sessionDetail,
    id: ownProps.params.id
  };
}

export default connect(select)(SessionDetail);
