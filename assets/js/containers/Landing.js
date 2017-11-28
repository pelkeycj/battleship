import React from 'react';
import { Row, Col } from 'react-grid-system';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { createAndJoinTable, joinChannel, joinExisting } from '../actions/app';

type Props = {
  channel: Object,
  joinChannel: () => void,
  createAndJoinTable: () => void,
  joinExisting: () => void,
}

class Landing extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      tableName: '',
      joinCode: '',
    };

    this. handleCreate = this.handleCreate.bind(this);
    this.handleJoin = this.handleJoin.bind(this);
  }

  componentWillMount() {
    this.props.joinChannel('lobby');
  }

  handleCreate(e) {
    e.preventDefault();
    const { username, tableName } = this.state;
    const params = {
      username,
      tableName,
    };


    if (username && tableName) {
      this.props.createAndJoinTable(this.props.channel, params, this.context.router);
    } else {
      // TODO put flash error
      console.log('error: invalid username or tablename');
    }
  }

    // TODO probably need to send the router to create and join
  handleJoin(e) {
    e.preventDefault();
    const { username, joinCode } = this.state;
    const params = {
      username,
      joinCode,
    };

    if (username && joinCode) {
      this.props.joinExisting(params, this.context.router);
    } else {
      console.log('error: invalid username or join code');
    }
  }

  props: Props

  render() {
    return (
      <Row>
        <Col md={8} offset={{ md: 2 }} >
          <form>
            <FormGroup id="username">
            <FormControl
              type="text"
              placeholder="Username"
              onChange={(e) => this.setState({ username: e.target.value })}

            />
            </FormGroup>

            <FormGroup id="table-code">
              <FormControl
                type="text"
                placeholder="Join Code"
                onChange={(e) => this.setState({ joinCode: e.target.value })}
              />
            </FormGroup>

            <Button type="submit" onClick={this.handleJoin}>
              Join Table
            </Button>

            <p>or</p>
            <FormGroup id="table-name">
              <FormControl
                type="text"
                placeholder="Table Name"
                onChange={(e) => this.setState({ tableName: e.target.value })}

              />
            </FormGroup>
            <Button type="submit" onClick={this.handleCreate}>
              Create Table
            </Button>
          </form>
        </Col>
      </Row>
    );
  }
}

Landing.contextTypes = {
  router: PropTypes.object,
};


export default connect(
  (state) => ({
    channel: state.table.channel,
  }),
  { createAndJoinTable, joinChannel, joinExisting },
)(Landing);
