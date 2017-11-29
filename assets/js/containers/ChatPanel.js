import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import { sendMsg } from '../actions/app';
import MsgForm from '../components/MsgForm';
import MessageShow from '../components/MessageShow';

type Props = {
  sendMsg: () => void,
  user: Object,
  messages: Object,
  channel: Object,
}

class ChatPanel extends React.Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(params) {
    this.props.sendMsg(this.props.channel, params);
  }

  props: Props

  render() {
    let { messages, user } = this.props;

    //TODO temp
    if (!messages) {
      messages = [];
    }

    messages = messages.map(msg => {
      return <MessageShow message={msg} />
    });

    return (
      <div>
        <h3>Chat</h3>
        <Scrollbars style={{ height: '500px' }}>
          {messages}
        </Scrollbars>
        {user &&
        <MsgForm username={user.name} onSubmit={this.handleSubmit} />
        }
      </div>
    );
  }
}

export default connect(
  state => ({
    user: state.user.user,
    messages: state.table.messages,
    channel: state.table.channel,
  }),
  { sendMsg },
)(ChatPanel);
