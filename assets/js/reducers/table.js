const initialState = {
  socket: null,
  channel: null,
  table: null,
  username: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'SOCKET_CONNECT':
      return {
        socket: action.socket,
      };
    case 'CHANNEL_CONNECT':
      return {
        channel: action.channel,
      };
    case 'TABLE_JOIN':
      console.log('action', action);
      console.log('table', action.table);
      return {
        channel: action.channel,
        table: action.table,
        username: action.username,
      };
    default:
      return state;
  }
}
