import React, { Component } from 'react';
import UserList from './List-Users';
import { Container, Row, Col, Card } from 'reactstrap';
import axios from 'axios';

export default class DetailsProject extends Component {
    state = {
      users: [],
      tickets: [],
      project: {},
    } 
    
    componentDidMount() {
        axios.get('/api/projects/'+this.props.match.params.id)
        .then(response => {
          this.setState({project: response.data})
        })
        .catch(function (error) {
            console.log(error);
            //window.location = '/projects'
        })

        axios.get('/api/tickets/inproject/'+this.props.match.params.id)
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
      let styles = {
        backgroundCard: {
            background: 'linear-gradient(to right bottom, #888888, #cccccc)', border: 0, height: "75vh",padding: 3, //overflowY: "scroll"
        }
      }
        return (
            <div>
            <h3> { this.state.project.title } </h3>
            <a href={"/projects/"} style={{cursor: 'pointer'}}>Back to List</a> | <a href={"/projects/edit/"+this.props.match.params.id} style={{cursor: 'pointer'}}>Edit Project</a>
                <Row style={{paddingTop:20,paddingBottom:5}}>
                    <Col><h6> { this.state.project.description } </h6></Col>
                    <Col></Col>
                </Row>
                <Row >
                    <Col>
                        <Card style={styles.backgroundCard}>
                        <h6 style={{color: 'white',paddingLeft: 17,paddingRight: 31,paddingTop: 5}}>
                            Users
                            <a className='float-right' href={"/projects/users/"+this.props.match.params.id}>
                                manage
                            </a>
                        </h6>
                        <Card style={{backgroundColor: 'transparent' ,border: 0,height: "75vh",overflowY: "scroll"}}>
                        <Container>
                            <Card style={{backgroundColor: 'white'}}>
                                <UserList mini={true} filter={true} id={this.props.match.params.id}/>
                            </Card>  
                        </Container>
                        </Card>   
                        </Card>   
                    </Col>

                    <Col style={{backgroundColor: ''}}>
                        <Card style={styles.backgroundCard}>
                        <h6 style={{color: 'white',paddingLeft: 17,paddingRight: 31,paddingTop: 5}}>
                            Tickets
                            <a className='float-right' href={"/projects/ticket/"+this.props.match.params.id}>
                                add
                            </a>
                        </h6>
                        
                        <Card style={{backgroundColor: 'transparent' ,border: 0,height: "75vh",overflowY: "scroll"}}>
                        <Container>

                        {
                            this.state.tickets.map(ticket => {
                                return(
                                <Card 
                                    onClick={() => {window.location.href = "/tickets/details/"+ticket.id}}
                                    style={{backgroundColor: "white", border: 0, marginBottom:3, padding:5, color: 'black', cursor: 'pointer'}}
                                >
                                <div className='float-left'style={{fontSize:14}}>
                                    {ticket.assignedToUsername}
                                    <div className='float-right'>
                                        {ticket.status}
                                    </div>
                                </div>
                                <h5 style={{paddingTop: 5}}>{ticket.description}</h5>
                                <div className='float-left'style={{fontSize:14}}>
                                    {ticket.type}
                                    <div className='float-right'>
                                        {ticket.submiter}
                                    </div>
                                </div>
                                </Card>) 
                            })
                        }

                        </Container>   
                        </Card>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}
