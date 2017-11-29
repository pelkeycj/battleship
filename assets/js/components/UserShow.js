import React from 'react';

type Props = {
  user: Object,
}
class UserShow extends React.Component {
  props: Props

  render() {
    const { user } = this.props;
    return (
      <div>
        <p>{user.name}</p>
      </div>
    )
  }
}

export default UserShow;