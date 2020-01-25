import React, { Component } from 'react';
import { Row, Col, Card } from 'reactstrap';
import axios from 'axios';

export default class DetailsTicket extends Component {
  state = {
    title: "",
    description: "",
    ticket: {},
  }
  
  componentDidMount() {
    axios.get('/api/tickets/'+this.props.match.params.id)
    .then(response => {
      this.setState({ticket: response.data})
    })
    .catch(function (error) {
      console.log(error);
      window.location = '/tickets'
    })
  }

  render() {
    return (
      <div>
        <Row>
          <Col sm={3}></Col>
          <Col>
          <Card style={{background: 'linear-gradient(to right bottom, #888888, #cccccc)', border: 0,padding: 15}}>
            <h3 style={{color: 'white'}}>Ticket Details</h3>
            <div style={{color: 'white'}}><a href={"/tickets/"} style={{cursor: 'pointer'}}>Back to List</a> | <a href={"/tickets/edit/"+this.props.match.params.id} style={{cursor: 'pointer'}}>Edit Ticket</a></div>
            <div style={{textDecorationLine:'underline',paddingTop:20, color: 'white'}}><h5>Description</h5></div>
            <div style={{color: 'white'}}>{ this.state.ticket.description }</div>
            <Row>
              <Col>
                <h5 style={{textDecorationLine:'underline', paddingTop:20, color: 'white'}}>Assigned To</h5>
                <div style={{color: 'white'}}>{ this.state.ticket.assignedToUsername }</div>
                <h5 style={{textDecorationLine:'underline',paddingTop:20, color: 'white'}}>Project</h5>
                <div style={{color: 'white'}}>{ this.state.ticket.projectTitle }</div>
                <h5 style={{textDecorationLine:'underline',paddingTop:20, color: 'white'}}>Status</h5>
                <div style={{color: 'white'}}>{ this.state.ticket.status }</div>
              </Col>
              <Col>
                <h5 style={{textDecorationLine:'underline',paddingTop:20, color: 'white'}}>Type</h5>
                <div style={{color: 'white'}}>{ this.state.ticket.type }</div>
                <h5 style={{textDecorationLine:'underline',paddingTop:20, color: 'white'}}>Created</h5>
                <div style={{color: 'white'}}>{ Date(this.state.ticket.createdAt).substring(0,21) }</div>
              </Col>
            </Row>
          </Card>
          </Col>
          <Col sm={3}></Col>
        </Row>
      </div>
    );
  }
}
