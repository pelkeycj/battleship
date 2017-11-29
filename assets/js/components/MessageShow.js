import React from 'react';
import { Button } from 'react-bootstrap';

type Props = {
  message: Object,
  user: Object,
  handleAccept: () => void,
}

// TODO handle accepting challenge
class MessageShow extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    // need to pass router to render game for each player
    this.props.handleAccept(this.props.message.meta.params);
  }

  props: Props
  render() {
    const { message, user } = this.props;

    return (
      <div>
        <p>{message.username + ': ' + message.text}</p>
        {message.meta && message.meta.type === 'CHALLENGE'
        && message.meta.params.to_id == user.id &&
          <Button onClick={this.handleSubmit}>
            Accept
          </Button>
        }
      </div>
    );
  }
}

export default MessageShow;