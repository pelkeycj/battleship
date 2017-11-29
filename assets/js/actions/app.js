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

export function createAndJoinTable(lobby, params, router) {
  return (dispatch) => {
    lobby.push('create_table', params)
      .receive('ok', resp => {
        joinTable(dispatch, resp.data.id, params.user, router);
      })
      .receive('error', resp => {
        console.log('error: could not create table');
        // TODO put error flash
      });
  }
}

export function joinExisting(params, router) {
  return (dispatch) => {
    joinTable(dispatch, params.joinCode, params.user, router);
  }
}

function joinTable(dispatch, id, user = null, router) {
  const socket = new Socket('/socket', {});
  socket.connect();
  const channel = socket.channel('table:' + id, {user: user});
  channel.join()
    .receive('ok', resp => {
      dispatch({ type: 'TABLE_JOIN', table: resp.data, channel: channel });
      router.history.push('/table');
    })
    .receive('error', resp => {
      console.log('error', resp);
      // TODO put error flash
    });

  setActions(dispatch, channel);
}

export function signin(channel, username, router) {
  return (dispatch) => {
    channel.push('create_user', { username })
      .receive('ok', resp => {
        dispatch({ type: 'SET_USER', user: resp.data });
        router.history.push('/home');
      })
      .receive('error', resp => {
        // TODO put flash
        console.log('error', resp);
      });
  }
}

export function sendMsg(channel, msg) {
  return (dispatch) => {
    channel.push('new_msg', msg)
      .receive('ok', resp => console.log('sent msg', resp))
      .receive('error', resp => console.log('failed to send msg', resp));
  }
}

// reduce complexity of structure to just a map for each user
function processPresenceStateResp(presenceState) {
  let users = [];
  Object.keys(presenceState).map( id => {
    let metaMap = presenceState[id].metas[0];
    metaMap['id'] = id;
    users.push(metaMap);
  });
  return users;
}

function setActions(dispatch, channel) {
  channel.on('presence_diff', msg => {
    dispatch({ type: 'PRESENCE_DIFF', joins: processPresenceStateResp(msg.joins)
      , leaves: processPresenceStateResp(msg.leaves) });

  });
  channel.on('presence_state', msg => {
    dispatch({ type: 'PRESENCE_STATE', users: processPresenceStateResp(msg) })

  });

  channel.on('new_msg', msg => {
    dispatch({ type: 'NEW_MSG', message: msg});
  });
}