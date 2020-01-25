import React, { Component } from 'react';
import { Button, Row, Col, Card, Form, Input, Modal, ModalBody, ModalFooter } from 'reactstrap';
import Select from 'react-select';
import axios from 'axios';

export default class EditTicket extends Component {
  state = {
      show: false,
      constUsers: [],
      assignedToId: {},
      assignedToUsername: "",
      status: "",
      type: "",
      description: "",
      projectId: '',
      ticketId: this.props.match.params.id,
      statuses: [{ value: "Open" , label: "Open"},
                 { value: "In Progress" , label: "In Progress"},
                 { value: "Closed" , label: "Closed"}],
      types: [{ value: "Aesthic" , label: "Aesthic"},
                 { value: "Bug" , label: "Bug"},
                 { value: "Feature" , label: "Feature"}],
  }
  
  componentDidMount() {
    //get ticket info
    axios.get('/api/tickets/'+this.props.match.params.id)
    .then(response => {
      this.setState({status: response.data.status})
      this.setState({assignedToId: response.data.assignedToId})
      this.setState({assignedToUsername: response.data.assignedToUsername})
      this.setState({type: response.data.type})
      this.setState({description: response.data.description})
      this.setState({projectId: response.data.project})

      //get users for drop down selection
      axios.get('/api/projects/getusers/'+response.data.project)
      .then(response => {
        axios.get('/api/users/searchid',{params: {ids: response.data}} )
        .then(response => {
          var newUsers = []
          response.data.map(currentuser => {
            return newUsers.push({ value: currentuser._id , label: currentuser.username})
          })
          this.setState({constUsers: newUsers})
        })
      })
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  handleShow = () => {
    return this.setState({show: !this.state.show})
  }

  //delete ticket, remove ticket from project, remove tickets from userId
  handleDelete = () => {
    const project = {ticket: this.state.ticketId}
    axios.post('/api/projects/removeticket/'+this.state.projectId, project)
    .then(response => {
      axios.delete('/api/tickets/'+this.state.ticketId)
    })
    .then(response => {
      return window.location = '/tickets'
    })
  }

  onChangeDescription = (e) => {
    return this.setState({description: e.target.value})
  }

  handleChangeAssignedTo = (changedVal) => {
    this.setState({assignedToId: changedVal.value})
    return this.setState({assignedToUsername: changedVal.label})
  }

  handleChangeStatus = (changedVal) => {
    return this.setState({status: changedVal.value})
  }

  handleChangeType = (changedVal) => {
    return this.setState({type: changedVal.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    var ticket = {
      description: this.state.description,
      status: this.state.status,
      type: this.state.type,
      assignedToId: this.state.assignedToId,
      assignedToUsername: this.state.assignedToUsername,
    }

    axios.post('/api/tickets/update/'+this.state.ticketId, ticket)
    .then(res => {
      return window.location = '/tickets/details/'+this.state.ticketId
    });
  }

  render() {
    return (
      <div>
        <Row>
        <Col sm={3}></Col>
        <Col>
        <Card style={{background: 'linear-gradient(to right bottom, #888888, #cccccc)', border: 0,padding: 15}}>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <h3 style={{color: 'white'}}>Edit Ticket</h3>
          <div style={{color: 'white'}}><a href={"/tickets/details/"+this.props.match.params.id} style={{cursor: 'pointer'}}>Cancel</a> | <a href={"#"} onClick={this.handleShow}>Delete</a></div>
            <div style={{paddingTop:20, color: 'white'}}><h5>Description</h5></div>
            <div>
              <Input type="text" value={ this.state.description } onChange={this.onChangeDescription.bind(this)}/>
            </div>
            <Row>
              <Col>
                <h5 style={{paddingTop:20, color: 'white'}}>Assigned To</h5>
                <Select options={this.state.constUsers} value={{ value: this.state.assignedToId, label: this.state.assignedToUsername }} onChange={this.handleChangeAssignedTo.bind(this)}/>
                <h5 style={{paddingTop:20, color: 'white'}}>Status</h5>
                <Select options={this.state.statuses} value={{ value: this.state.status, label: this.state.status }} onChange={this.handleChangeStatus.bind(this)}/>
              </Col>
              <Col>
                <h5 style={{paddingTop:20, color: 'white'}}>Type</h5>
                <Select options={this.state.types} value={{ value: this.state.type, label: this.state.type }} onChange={this.handleChangeType.bind(this)}/>
              </Col>
            </Row>
          <div style={{paddingTop:20}}>
          <Button color="primary" type="submit">
            Submit
          </Button>
          </div>
        </Form>
        </Card>
        </Col>
        <Col sm={3}></Col>

        </Row>
        <Modal isOpen={this.state.show}>
        <ModalBody>Are you sure you want to delete this ticket?</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleShow}>
            Cancel
          </Button>
          <Button color="danger" onClick={this.handleDelete}>
            Delete
          </Button>
        </ModalFooter>
      </Modal>
      </div>
    );
  }
}
