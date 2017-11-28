//@flow
import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import { Row, Col } from 'react-grid-system';
import { connect } from 'react-redux';

// Table has users, messages(Message component to render)

type Props = {
  table: Object,
  user: Object,
}

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: '3px',
    borderBottomStyle: 'solid',
  },
  users: {
    borderRightWidth: '3px',
    borderRightStyle: 'solid',
  }
});

class Table extends React.Component {

  props: Props
  render() {
    const { table, user } = this.props;
    let tableName = '';
    if (table) {
      tableName = table.name;
    }
    let username = '';
    if (user) {
      username = user.name;
    }

    return (
      <div>
        <h1 className={css(styles.header)}>{'Table: ' + tableName}</h1>
        <Row>
          <Col md={4} className={css(styles.users)}>
            <h3>Users</h3>
          </Col>
          <Col md={8}>
            <h3>Chat</h3>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(
  state => ({
    user: state.user.user,
    table: state.table.table,
  }),
  null,
)(Table);