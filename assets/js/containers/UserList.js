import React from 'react';
import { connect } from 'react-redux';
import UserShow from '../components/UserShow';

type Props = {
  users: Object,
}

class UserList extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }
  props: Props

  componentWillReceiveProps(nextProps) {
    this.setState({ users: nextProps.users });
    this.forceUpdate();
  }

  render() {
    let { users } = this.state;
    if (!users) {
      users = [];
    }

    users = users.map(user => {
      return <UserShow user={user} />
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

export default connect(
  state => ({
    users: state.table.users,
  }),
  null,
)(UserList);