import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

// need client view of game from store
// each user should connect to the same game channel for comms
//

type Props = {
  user: Object,
  game: Object,
  //player: Object,
  //opponent: Object,
 // status: string,
 // ships_to_place: Object,
}

class GameView extends React.Component {

  render() {
    const { game } = this.props;
    let player, opponent, ships_to_place, status;
    if (game) {
      player = game.player;
      opponent = game.opponent;
      status = game.status;
      ships_to_place = game.ships_to_place;
    }

    return (
      <div>
        <h1>Game</h1>
        <Row>
          <Col md={6}>
            <h2>Grid1</h2>
          </Col>
          <Col md={6}>
            <h2>Grid2</h2>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(
  state => ({
    user: state.user.user,
    game: state.game.game,
  }),
  null,
)(GameView);