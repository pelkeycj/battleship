import React from 'react';
import { Row, Col } from 'react-grid-system';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';


//TODO handle submits
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
