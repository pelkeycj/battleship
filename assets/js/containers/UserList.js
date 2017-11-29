import React from 'react';
import UserBlock from '../components/UserBlock';

type Props = {
  users: Object,
}

class UserList extends React.Component {
  props: Props

  render() {
    const { users } = this.props;
    console.log('users list ', users);
    return (
      <div>
        <h3>Users</h3>
        <div>
          {users && users.map(user => {
            return <p key={user.id}>{user.name}</p>
          })}
        </div>
      </div>
    )
  }
}

export default UserList;