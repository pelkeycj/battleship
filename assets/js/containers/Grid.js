
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { css, StyleSheet } from 'aphrodite';
import Cell from '../components/Cell';

const styles = StyleSheet.create({
  headerCell: {
    width: '30px',
    height: '30px',
    backgroundColor: 'white',
    textAlign: 'center',
    display: 'table-cell',
  },

  row: {
    display: 'table-row',
    clear: 'both',
    overflow: 'hidden',
    width: '100%'
  },

  grid: {
    display: 'table',
    width: '100%',
  },

});


type Props = {
  is_user: boolean,
  player: Object,
  status: string,
  ships_to_place: Object,
}

class Grid extends React.Component {
  constructor() {
    super();
    this.getDisplayText = this.getDisplayText.bind(this);
  }

  //TODO handle clicks (depending on status)
    // add ship
    // attack
  // ONLY if is_user == true

  getDisplayText() {
    let text;
    if (this.props.is_user) {
      text = "Your board";
    } else {
      text = this.props.player.name + '\'s board';
    }
    return text;
  }

  buildHeaderRow() {
    const colTitles = ' ABCDEFGHIJ';
    return (
      <div className={css(styles.row)}>
        {
          [...colTitles].map(l => {
            return (<div className={css(styles.headerCell)}>
              {l}
            </div>)
          })
        }
      </div>
    )
  }

  buildBodyRow(rowIdx, row) {
    return (
      <div className={css(styles.row)}>
        <div className={css(styles.headerCell)}>
          {rowIdx}
        </div>
        {row.map((symbol, colIdx) => {
          return <Cell symbol={symbol} row={rowIdx} col={colIdx} />
        })}
      </div>
    );
  }

  buildGrid(grid) {
    const headerRow = this.buildHeaderRow();
    return (
      <div className={css(styles.grid)}>
        {headerRow}
        {grid.map((row, rowIdx) => {
          return this.buildBodyRow(rowIdx, row);
        })}
      </div>
    );
  }

  render() {
    const { player, status, is_user } = this.props;
    console.log('player', player);
    const text = this.getDisplayText();
    return (
      <div>
        <p>{text}</p>
        {this.buildGrid(player.grid)}
      </div>
    )
  }
}

export default Grid;