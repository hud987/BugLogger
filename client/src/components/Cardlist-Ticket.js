import React, { Component } from 'react';
import { Container, Card } from 'reactstrap';
import axios from 'axios';

export default class TicketCardlist extends Component {
  state = {
      tickets: [],
    } 

  componentDidMount() {
    if (this.props.id != null){
      axios.get('/api/tickets/assignedto/'+this.props.id)
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
    } else {
      axios.get('/api/tickets')
      .then(response => {
        const newTickets = response.data.map(ticket => (
          {description: ticket.description,
            assignedToUsername: ticket.assignedToUsername,
          project: ticket.project,
          submiter: ticket.submiter,
          status: ticket.status,
          type: ticket.type,
          id: ticket._id}))
        this.setState({tickets: newTickets})
      })
      .catch(function (error) {
          console.log(error);
      })
    }
  }

  render() {
    return (
      <div>
        <Card style={{background: 'linear-gradient(to right bottom, #888888, #cccccc)', border: 0, height: this.props.height, padding: 3}}>
        <h6 style={{paddingLeft: 17,paddingTop: 5}}>Tickets</h6>
        <Card style={{backgroundColor: 'transparent' ,border: 0, height: this.props.height, overflowY: "scroll"}}>
        <Container style={{}}>
        {
          this.state.tickets.map(ticket => {
            return(
            <Card onClick={() => {window.location.href = "/tickets/details/"+ticket.id}} style={{backgroundColor: "white",border: 0,marginBottom:3,padding:5,color: 'black',cursor: 'pointer'}}>
              <div className='float-left'style={{fontSize:14}}>
                <div className='float-right'>{ticket.status}</div>
              </div>
              <h5 style={{paddingTop: 5}}>{ticket.description}</h5>
              <div className='float-left'style={{fontSize:14}}>
                <div className='float-right'>{ticket.assignedToUsername}</div>
              </div>
            </Card>
            ) 
          })
        } 
        </Container>
        </Card>   
        </Card>   
      </div>
    );
  }
}
