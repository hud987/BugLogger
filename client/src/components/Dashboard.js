import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import ProjectCardlist from './Cardlist-Project';
import TicketCardlist from './Cardlist-Ticket';

export default class Dashboard extends Component {
  render() {
    return (
      <div>
      <h3>Bug Logger Dashboard</h3>
        <Row>
          <Col></Col>
          <Col></Col>
        </Row>
        <Row >
          <Col sm={8}>
            <ProjectCardlist id={null} height="85vh"/>
          </Col>

          <Col style={{}}>
            <TicketCardlist id={null} height="85vh"/>
          </Col>
        </Row>
      </div>
    );
  }
}
