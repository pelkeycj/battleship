import React from 'react';
import { Row, Col } from 'react-grid-system';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getSocket, joinTableChannel } from '../actions/app';

//TODO handle submits
  // app joins a general channel?
    // send CREATE_TABLE/ JOIN TABLE down channel with params
    // and then join?
    // on app mount we need to create socket and join channel general

//TODO create channel, table resource
  // users will join a channel for the table_id
  // use presence to track users?

  // PRIORITY 1: USERS JOIN TABLES AND chat/ see list of users

type Props = {
  socket: Object,
  getSocket: () => void,
  joinTableChannel: () => void,
}

class Landing extends React.Component {

  componentWillMount() {
    //this.props.getSocket();
    this.props.joinTableChannel('lobby');
  }

  // TODO submission to join a table/create a table
  // table name field?

  render() {
    return (
      <Row>
        <Col md={8} offset={{ md: 2 }} >
          <form>
            <FormGroup id="username">
            <FormControl
            type="text"
            placeholder="Username"
            />
            </FormGroup>

            <FormGroup id="table-code">
              <FormControl
              type="text"
              placeholder="Join Code"
              />
            </FormGroup>

            <Button type="submit">
              Join Table
            </Button>

            <p>or</p>
            <Button type="submit">
              Create Table
            </Button>
          </form>
        </Col>
      </Row>
    );
  }
}



export default connect(
  (state) => ({
    socket: state.table.socket,
  }),
  { getSocket, joinTableChannel },
)(Landing);
