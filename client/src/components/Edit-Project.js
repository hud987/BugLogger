import React, { Component } from 'react';
import { Button, Row, Col, Card, Form, Input, Modal, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

export default class EditProject extends Component {
  state = {
      title: "",
      description: "",
      id: {},
      users: [],
      tickets: [],
      show: false,
  }
  
  //get project details
  componentDidMount() {
    axios.get('/api/projects/'+this.props.match.params.id)
    .then(response => {
      this.setState({title: response.data.title})
      this.setState({description: response.data.description})
      this.setState({users: response.data.users})
      this.setState({tickets: response.data.tickets})
      this.setState({id: response.data._id})
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  handleShow = () => {
    this.setState({show: !this.state.show})
  }

  //delete project, remove project from users, delete tickets, remove tickets from users
  handleDelete = () => {
    const project = {
      tickets: this.state.tickets,
      users: this.state.users,
      id: this.state.id
    }
    console.log(project.tickets)

    axios.post('/api/tickets/deletemany/', project)
    .then(response => {
      axios.post('/api/users/removeproject/', project)
    })
    .then(response => {
      axios.delete('/api/projects/'+this.props.match.params.id)
    })
    .then(response => {
      return window.location = '/projects'
    })
  }

  //handle title text change
  onChangeTitle = (e) => {
    return this.setState({title: e.target.value})
  }

  //handle description text change
  onChangeDescription = (e) => {
    return this.setState({description: e.target.value})
  }

  //make project and send it to update project at id
  handleSubmit = (e) => {
    e.preventDefault()

    const project = {
      title: this.state.title,
      description: this.state.description,
      users: this.state.users,
      tickets: this.state.tickets,
    }

    axios.post('/api/projects/update/'+this.props.match.params.id, project)
    .then(response => {
      window.location = '/projects'
    })

  }

  render() {
    return (
      <div>
        <Row>
          <Col sm={3}></Col>
          <Col>
          <Card style={{background: 'linear-gradient(to right bottom,#888888, #cccccc)' , border: 0,padding: 15}}>
            <Form onSubmit={this.handleSubmit.bind(this)}>
              <h3 style={{color: 'white'}}>Edit Project</h3>
              <div style={{color:'white'}}><a href={"/projects/details/"+this.props.match.params.id} style={{cursor: 'pointer'}}>Cancel</a> | <a href={'#'} onClick={this.handleShow}>Delete</a></div>
              
              <div style={{paddingTop:20, color: 'white'}}><h5>Title</h5></div>
              <div><Input type='text' value={ this.state.title } onChange={this.onChangeTitle.bind(this)}/></div>
              <div style={{paddingTop:20,color: 'white'}}><h5>Description</h5></div>
              <div><Input type='text' value={ this.state.description } onChange={this.onChangeDescription.bind(this)}/></div>

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
        <ModalBody>Are you sure you want to delete this project?</ModalBody>
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
