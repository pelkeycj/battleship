import { Socket } from 'phoenix';

// TODO user should join unique channel?
    // For challenges, etc
// TODO handle incoming messages

// TODO on join get all current presences, track in state,
// update on presence_diff event

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
        joinTable(dispatch, resp.data.id, params.user);
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
    joinTable(dispatch, params.joinCode, params.user);
    router.history.push('/table');
  }
}

function joinTable(dispatch, id, user = null) {
  const socket = new Socket('/socket', {});
  socket.connect();
  const channel = socket.channel('table:' + id, {user: user});
  channel.join()
    .receive('ok', resp => {
      dispatch({ type: 'TABLE_JOIN', table: resp.data, channel: channel })
    })
    .receive('error', resp => {
      console.log('error', resp);
      // TODO put error flash
    });

  channel.on('presence_diff', msg => console.log('presence_diff', msg));
}

export function signin(channel, username, router) {
  return (dispatch) => {
    channel.push('create_user', { username })
      .receive('ok', resp => {
        console.log('setting user');
        dispatch({ type: 'SET_USER', user: resp.data });
        router.history.push('/home');
      })
      .receive('error', resp => {
        // TODO put flash
        console.log('error', resp);
      });
  }
}
