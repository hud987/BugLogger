import React, { Component } from 'react';
import { Button, Row, Col, Form, Card } from 'reactstrap';
import Select from 'react-select'
import axios from 'axios';

export default class EditProjectUsers extends Component {
  state = {
      id: {},
      usersProject: [],
      usersToRemove: [],
      usersAll: [],
      usersToAdd: [],
  }
 
  componentDidMount() {
     //get project details
    axios.get('/api/projects/'+this.props.match.params.id)
    .then(response => {
      this.setState({title: response.data.title})
      this.setState({description: response.data.description})
      this.setState({id: response.data._id})
    })
    .catch(function (error) {
      console.log(error);
    })

    //get users in project
    axios.get('/api/users/inproject/'+this.props.match.params.id)
    .then(response => {
      var newUsers = []
      response.data.map(currentuser => {
        return newUsers.push({ value: currentuser._id , label: currentuser.username})
      })
      this.setState({usersProject: newUsers})
    })

    //get users not in project
    axios.get('/api/users/notinproject/'+this.props.match.params.id)
      .then(response => {
        var newUsers = []
        response.data.map(currentuser => {
          return newUsers.push({ value: currentuser._id , label: currentuser.username})
        })
        this.setState({usersAll: newUsers})
      })
    }

  //handle description text change
  onChangeRemoveUsers = (e) => {
    return this.setState({usersToRemove: e})
  }

  //handle title text change
  onChangeAddUsers = (e) => {
    return this.setState({usersToAdd: e})
  }

  //make project and send to update original project
  handleSubmit = (e) => {
    e.preventDefault()

    var newUsersToAdd = []
    var newUsersToRemove = []

    this.state.usersToAdd.map(currentuser => {
      return newUsersToAdd.push(currentuser.value)
    })
    this.state.usersToRemove.map(currentuser => {
      return newUsersToRemove.push(currentuser.value)
    })

    const project = {
      id: this.state.id,
      usersToAdd: newUsersToAdd,
      usersToRemove: newUsersToRemove,
    }
    const projectAdd = {
      id: this.state.id,
      users: newUsersToAdd,
    }
    const projectRemove = {
      id: this.state.id,
      users: newUsersToRemove,
    }
    axios.post('/api/projects/addusers/'+this.props.match.params.id, project)
    .then(response => {
      axios.post('/api/projects/removeusers/'+this.props.match.params.id, project)
    })
    .then(response => {
      axios.post('/api/users/updateprojects/', projectAdd)
    })
    .then(response => {
      axios.post('/api/users/removeproject/', projectRemove)
    })
    .then(response => {
      return window.location = '/projects/details/'+this.props.match.params.id
    })
  }

  render() {
    return (
      <div>
        <Row>
          <Col sm={3}></Col>
          <Col>
            <Card style={{background: 'linear-gradient(to right bottom, #555555, #cccccc)' , border: 0,padding: 15}}>
            <Form onSubmit={this.handleSubmit.bind(this)}>
              <h3 style={{color: 'white'}}>{this.state.title} Users</h3>
              <a href={"/projects/details/"+this.props.match.params.id} style={{cursor: 'pointer'}}>
                Cancel
              </a> 

              <div style={{paddingTop:20, color: 'white'}}><h5>Remove Users</h5></div>
              <div><Select isMulti options={ this.state.usersProject } onChange={this.onChangeRemoveUsers.bind(this)}/></div>
              <div style={{paddingTop:20,color: 'white'}}><h5>Add Users</h5></div>
              <div><Select isMulti options={ this.state.usersAll } onChange={this.onChangeAddUsers.bind(this)}/></div>

              <div style={{paddingTop:20}}>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>  
            </Card>      
          </Col>
          <Col sm={3}></Col>
        </Row>
      </div>
    );
  }
}
