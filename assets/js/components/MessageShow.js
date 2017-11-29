import React from 'react';

type Props = {
  message: Object,
}

class MessageShow extends React.Component {
  props: Props
  render() {
    const { message } = this.props;
    return (
      <div>
        <p>{message.username + ': ' + message.text}</p>
      </div>
    );
  }
}

export default MessageShow;