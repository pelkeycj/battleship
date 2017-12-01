import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Grid from './Grid';
import ChatPanel from './ChatPanel';
import { placeShip, attack } from '../actions/app';


type Props = {
  user: Object,
  game: Object,
  player: Object,
  opponent: Object,
  status: string,
  ships_to_place: Object,
  channel: Object,
  game_id: string,
  placeShip: () => void,
  attack: () => void,
}

class GameView extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(params) {
    console.log('game view click handler');
    params["game_id"] = this.props.game_id;
    const { status, channel, user, ships_to_place } = this.props;
    if (status == 'PLACING' && ships_to_place
      && (ships_to_place.length > 0) && user.id == params.id) {
      this.props.placeShip(channel, params);
    }
    else if (status == 'ATTACK') {
      params["id"] = user.id + '';
      console.log('attack', params);
      this.props.attack(channel, params);
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('current', this.props);
    console.log('next', nextProps);
  }

  render() {
    const { game, user, player, opponent, status, ships_to_place } = this.props;

    return (
      <div>
        <h1>Game</h1>
        <h4>{'Status: ' + status}</h4>
        <Row>
          <Col md={5}>
            {player &&
              <Grid style={{ width: '100%'}}  player={player} handleClick={this.handleClick}
                    status={status} ships_to_place={ships_to_place} is_user={true} />
            }
          </Col>
          <Col md={5}>
            {opponent &&
              <Grid style={{ width: '100%'}} player={opponent}  handleClick={this.handleClick}
                    status={status} is_user={false} />
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
    ships_to_place: state.game.ships_to_place,
    channel: state.game.game_channel,
    game_id: state.game.game_id,
  }),
  { placeShip, attack },
)(GameView);