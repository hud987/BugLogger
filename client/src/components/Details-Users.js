import React, { Component } from 'react';
import { Row, Col, } from 'reactstrap';
import ProjectCardlist from './Cardlist-Project';
import TicketCardlist from './Cardlist-Ticket';
import axios from 'axios';

export default class DetailsUser extends Component {
  state = {
    projects: [],
    tickets: [],
    user: {},
  }
    
  componentDidMount() {
    axios.get('/api/users/'+this.props.match.params.id)
    .then(response => {
      this.setState({user: response.data})
    })
    .catch(function (error) {
      console.log(error);
      //window.location = '/users'
    })

    axios.get('/api/tickets/assignedto/'+this.props.match.params.id)
    .then(response => {
      if (response != null) {
        const newTickets = response.data.map(ticket => (
          {description: ticket.description,
          assignedToUsername: ticket.assignedToUsername,
          project: ticket.project,
          submiter: ticket.submiter,
          status: ticket.status,
          type: ticket.type,
          id: ticket._id}))
        this.setState({tickets: newTickets})
      }
    })
  }

    render() {
    return (
      <div>
        <h3> { this.state.user.username } </h3>
        <a href={"/projects/"} style={{cursor: 'pointer'}}>Back to List</a> | <a href={"/users/edit/"+this.props.match.params.id} style={{cursor: 'pointer'}}>Edit User</a>
        <Row style={{paddingTop:20,paddingBottom:5}}>
          <Col><h6> { this.state.user.email } </h6></Col>
        </Row>
        <Row style={{paddingBottom:5}}>
          <Col><h6> { this.state.user.role } </h6></Col>
        </Row>
        <Row >
          <Col sm={8}style={{backgroundColor: '', }}>
            <ProjectCardlist id={this.props.match.params.id} height="72vh"/>
          </Col>
          <Col style={{backgroundColor: ''}}>
            <TicketCardlist id={this.props.match.params.id} height="72vh"/>
          </Col>
        </Row>
      </div>
    );
  }
}
