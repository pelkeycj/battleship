import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Grid from './Grid';
import ChatPanel from './ChatPanel';


type Props = {
  user: Object,
  game: Object,
  player: Object,
  opponent: Object,
  status: string,
  ships_to_place: Object,
}

class GameView extends React.Component {

  render() {
    const { game, user, player, opponent, status, ships_to_place } = this.props;

    return (
      <div>
        <h1>Game</h1>
        <h4>{'Status: ' + status}</h4>
        <Row>
          <Col md={5}>
            {player &&
              <Grid style={{ width: '100%'}}  player={player}
                    status={status} ships_to_place={ships_to_place} is_user={true} />
            }
          </Col>
          <Col md={5}>
            {opponent &&
              <Grid style={{ width: '100%'}} player={opponent} status={status} is_user={false} />
            }
          </Col>
          <Col md={2}>
            <ChatPanel />
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
    status: state.game.status,
    player: state.game.player,
    opponent: state.game.opponent,
  }),
  null,
)(GameView);