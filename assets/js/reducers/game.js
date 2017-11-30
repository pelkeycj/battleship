const initialState = {
  game: null,
  player: null,
  opponent: null,
  status: null,
  ships_to_place: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'JOIN_GAME_CHANNEL':
      console.log('joined channel', action.resp);
      return Object.assign({}, state, {
        game: action.resp,
        player: action.resp.player,
        opponent: action.resp.opponent,
        status: action.resp.status,
        ships_to_place: action.resp.ships_to_place
      });
    default:
      return state;
  }

}