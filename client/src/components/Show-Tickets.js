import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import TicketList from './List-Tickets'

export default class ShowTickets extends Component {
  render() {
    return (
      <div style={{paddingLeft:0}}>
        <Row>
          <Col className="float-bottom" style={{paddingTop: 14}} >
            <h2>Tickets</h2>
          </Col>
          <Col style={{paddingTop: 14}}>
          </Col>
        </Row>
      <div style={{height: '85vh', overflowY: 'scroll'}}>
    <TicketList/>
    </div>
    </div>
    )
  }
}