import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserShow from '../components/UserShow';
import { issueChallenge } from '../actions/app';

type Props = {
  user: Object,
  users: Object,
  channel: Object,
  issueChallenge: () => void,
}

class UserList extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };

    this.handleChallenge = this.handleChallenge.bind(this);
  }
  props: Props

  componentWillReceiveProps(nextProps) {
    this.setState({ users: nextProps.users });
    this.forceUpdate();
  }

  handleChallenge(to_id, to_name) {
    const payload = {
      from_id: this.props.user.id + '',
      from_name: this.props.user.name,
      to_id: to_id + '',
      to_name,
    };

    this.props.issueChallenge(this.props.channel, payload,
      this.context.router, this.props.user);
  }

  render() {
    let { users } = this.state;
    if (!users) {
      users = [];
    }

    users = users.map(user => {
      if (user.id != this.props.user.id) {
        return <UserShow key={user.id} user={user} handleChallenge={this.handleChallenge} />
      }
    });

    return (
      <div>
        <h3>Users</h3>
        <div>
          {users}
        </div>
      </div>
    )
  }
}

UserList.contextTypes = {
  router: PropTypes.object,
};


export default connect(
  state => ({
    users: state.table.users,
    user: state.user.user,
    channel: state.table.channel,
  }),
  { issueChallenge },
)(UserList);