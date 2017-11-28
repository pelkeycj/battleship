import { Socket } from 'phoenix';


export function getSocket() {
  return dispatch => {
    const socket = new Socket('/socket', {});
    socket.connect();
    dispatch({ type: 'SOCKET_CONNECT', socket });
  }
}

export function joinChannel(name) {
  return (dispatch) => {
    const socket = new Socket('/socket', {});
    socket.connect();

    const channel = socket.channel('table:' + name, {});

    channel.join()
      .receive('ok', resp => {
        dispatch({ type: 'CHANNEL_CONNECT', channel });
      })
      .receive('error', resp => {
        console.log('error', resp);
        //TODO put error flash
      });
  }
}


export function createAndJoinTable(lobby, params) {
  return (dispatch) => {
    lobby.push('create_table', params)
      .receive('ok', resp => {
        joinTable(dispatch, resp.data.id);
      })
      .receive('error', resp => {
        // TODO put error flash
      });
  }
}

export function joinExisting(params) {
  return (dispatch) => {
    joinTable(dispatch, params.joinCode)
  }
}

function joinTable(dispatch, id) {
  const socket = new Socket('/socket', {});
  socket.connect();
  const channel = socket.channel('table:' + id, {});
  channel.join()
    .receive('ok', resp => {
      console.log('joined', id);
      dispatch({ type: 'CHANNEL_CONNECT', channel })
    })
    .receive('error', resp => {
      console.log('error');
      // TODO put error flash
    });
}
