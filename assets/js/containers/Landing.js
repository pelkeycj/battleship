import React from 'react';
import { Row, Col } from 'react-grid-system';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
import { joinAppGeneral } from '../actions/app';

//TODO handle submits
  // app joins a general channel?
    // send CREATE_TABLE/ JOIN TABLE down channel with params
    // and then join?
    // on app mount we need to create socket and join channel general

//TODO create channel, table resource
  // users will join a channel for the table_id
  // use presence to track users?

  // PRIORITY 1: USERS JOIN TABLES AND chat/ see list of users

class Landing extends React.Component {
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



export default Landing;
