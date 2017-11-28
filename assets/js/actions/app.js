import { Socket } from 'phoenix';


export function getSocket() {
  return dispatch => {
    const socket = new Socket('/socket', {});
    socket.connect();
    dispatch({ type: 'SOCKET_CONNECT', socket });
  }
}

// TODO pass username?
export function joinTableChannel(channelName, username) {
  return (dispatch) => {
    const socket = new Socket('/socket', {});
    socket.connect();

    const channel = socket.channel('table:' + channelName, {});
    channel.join()
      .receive('ok', resp => {
        console.log('connected,', resp);
        dispatch({ type: 'CHANNEL_CONNECT', channel });
      })
      .receive('error', resp => {
        console.log('error');
        //TODO put error flash
      });
  }
}
