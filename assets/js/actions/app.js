import { Socket } from 'phoenix';

// TODO handle incoming messages

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

export function createAndJoinTable(lobby, params, router) {
  return (dispatch) => {
    lobby.push('create_table', params)
      .receive('ok', resp => {
        joinTable(dispatch, resp.data.id, params.username);
        router.history.push('/table');
      })
      .receive('error', resp => {
        console.log('error: could not create table');
        // TODO put error flash
      });
  }
}

export function joinExisting(params, router) {
  return (dispatch) => {
    joinTable(dispatch, params.joinCode, params.username);
    router.history.push('/table');
  }
}

function joinTable(dispatch, id, username = null) {
  const socket = new Socket('/socket', {});
  socket.connect();
  const channel = socket.channel('table:' + id, {});
  channel.join()
    .receive('ok', resp => {
      dispatch({ type: 'TABLE_JOIN', username: username, table: resp.data, channel: channel })
    })
    .receive('error', resp => {
      console.log('error', resp);
      // TODO put error flash
    });
}
