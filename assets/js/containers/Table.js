//@flow
import React from 'react';
import { Row, Col } from 'react-grid-system';
import { connect } from 'react-redux';

// Table has users, messages(Message component to render)

type Props = {
  table: Object,
}

class Table extends React.Component {

  props: Props
  render() {
    const { table } = this.props.table;
    const tableName = table.name;

    return (
      <div>
        <h1>{'Table: ' + tableName}</h1>
      </div>
    )
  }
}

export default connect(
  state => ({
    table: state.table.table,
  }),
  null,
)(Table);