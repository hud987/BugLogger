import React, { Component } from 'react';
import { Button, Row, Col, Card, Form, Input, Modal, ModalBody, ModalFooter } from 'reactstrap';
import Select from 'react-select'
import axios from 'axios';

export default class EditUsers extends Component {
  state = {
    show: false,
    id: {},
    role: "",
    email: '',
    username: '',
    usersStatic: [],
    roles: [{ value: "Admin" , label: "Admin"},
            { value: "Devloper" , label: "Devloper"},
            { value: "Manager" , label: "Manager"}],
  }

  componentDidMount() {
    axios.get('/api/users/'+this.props.match.params.id)
    .then(response => {
      this.setState({id: response.data._id})
      this.setState({username: response.data.username})
      this.setState({email: response.data.email})
      this.setState({role: response.data.role})
    })
    .catch((error) => {
      console.log(error);
    })
  }

  handleShow = () => {
    this.setState({show: !this.state.show})
  }

  onChangeUsername = (e) => {
    this.setState({username: e.target.value})
  }

  onChangeEmail = (e) => {
    this.setState({email: e.target.value})
  }

  handleChangeRole = (e) => {
    this.setState({role: e.value})
  }

  //delete user, leave all tickets assigned to user however
  handleDelete = () => {
    axios.delete('/api/users/'+this.state.id)
    .then(res => {
      axios.post('/api/projects/removeoneuser/'+this.state.id)
    })
    .then(response => {
      window.location = '/users'
    })
  }

  //change user fields, update ticket assignedToUsername field
  handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      id: this.state.id,
      username: this.state.username,     
      email: this.state.email,     
      role: this.state.role,        
    }

    axios.post('/api/users/update/'+this.props.match.params.id, user)
    .then(res => {
      axios.post('/api/tickets/updateassignment', user)
    })
    .then(res => {
      window.location = '/users'
    })
  }

  render() {
    return (
      <div>
      <Row>
        <Col sm={3}></Col>
        <Col>
          <Card style={{background: 'linear-gradient(to right bottom, #888888, #cccccc)', border: 0,padding: 15}}>
          <Form onSubmit={this.handleSubmit.bind(this)}>
            <h3 style={{color: 'white'}}>Edit User</h3>
            <div style={{color: 'white'}}><a href={"/tickets/details/"+this.props.match.params.id} style={{cursor: 'pointer'}}>Cancel</a> | <a href={"#"} onClick={this.handleShow}>Delete</a></div>
            <div style={{paddingTop:20, color: 'white'}}><h5>Username</h5></div>
            <div><Input type="text" value={ this.state.username } onChange={this.onChangeUsername.bind(this)}/></div>
            <div style={{paddingTop:20, color: 'white'}}><h5>Email</h5></div>
            <div><Input type="text" value={ this.state.email } onChange={this.onChangeEmail.bind(this)}/></div>
            <div style={{paddingTop:20, color: 'white'}}><h5>Role</h5></div> 
            <div><Select options={this.state.roles} value={{ value: this.state.role, label: this.state.role }} onChange={this.handleChangeRole.bind(this)}/></div>
            
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
      <ModalBody>Are you sure you want to delete this user?</ModalBody>
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
    )
  }
}