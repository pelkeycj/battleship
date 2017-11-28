const initialState = {
  socket: null,
  channel: null,
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
    default:
      return state;
  }
}
