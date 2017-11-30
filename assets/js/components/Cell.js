import React from 'react';
import { Col } from 'react-grid-system';
import { css, StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
  bodyCell: {
    width: '30px',
    height: '30px',
    display: 'table-cell',
    borderWeight: '1px',
    borderColor: 'black',
    borderStyle: 'solid',
  },
});

type Props = {
  symbol: string,
  row: number,
  col: number,
}

class Cell extends React.Component {
  constructor() {
    super();

    this.getColor = this.getColor.bind(this);
  }

  getColor() {
    switch (this.props.symbol) {
      case '?':
        return 'gray';
      case '~':
        return 'blue';
      case '|':
        return 'black';
      case 'O':
        return 'white';
      case 'X':
        return 'red';
      default:
        return 'gray';
    }
  }


  render() {
    return (
      <div className={css(styles.bodyCell)} style={{ backgroundColor: this.getColor() }}>
      </div>
    );
  }

}

export default Cell;