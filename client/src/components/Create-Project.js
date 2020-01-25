import React, { Component } from 'react';
import { Row, Col, Card } from 'reactstrap';
import axios from 'axios';
import Select from 'react-select'

export default class CreateProject extends Component {
  state = {
    title: "",
    description: "",
    tickets: [],
    usersStatic: [],
    users: [],
    userIds: [],
  } 

    componentDidMount() {
        //get users for drop down selection
        axios.get('/api/users')
        .then(response => {
            var data = []
            response.data.map(currentuser => {
                return data.push({ value: currentuser._id , label: currentuser.username})
            })
            this.setState({usersStatic: data})
        })
        .catch((error) => {
            console.log(error);
        })
    }

    onChangeTitle = (e) => {
        return this.setState({title: e.target.value})
    }
    
    onChangeDescription = (e) => {
        return this.setState({description: e.target.value})
    }
    
    handleChangeUsers = (changedVal) => {
        return this.setState({users: changedVal})
    }

    onSubmit = (e) => {
        e.preventDefault();
        var userIds = this.state.users.map(currentuser => {
            return ( currentuser.value )
        })

        var project = {
            id: {},
            title: this.state.title,
            description: this.state.description,
            users: userIds,
        }
        
        axios.post('/api/projects/add',project)
        .then(res => {
            project.id = res.data._id
            axios.post('/api/users/updateprojects', project)
        })
        .then(() => {
            return window.location = '/projects'
        });
    }

    render() {
        return (
            <div>
                <Row>
                <Col sm={3}></Col>
                <Col>
                <Card
                style={{
                    background: 'linear-gradient(to right bottom, #888888, #cccccc)', border: 0,padding: 15, //overflowY: "scroll"
                }}>
                <h3 style={{color: 'white'}}>Create New Project</h3>
                <div style={{paddingBottom: 15}}><a href={"/projects"} style={{cursor: 'pointer'}}>Cancel</a></div>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="form-group">
                        <label style={{color: 'white'}}>Project Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.title}
                            onChange={this.onChangeTitle.bind(this)}
                        />
                    </div>
                    <div className="form-group">
                        <label style={{color: 'white'}}>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription.bind(this)}
                        />
                    </div>
                    <div>
                    <label style={{color: 'white'}}>Add Users: </label>
                        <Select isMulti options={this.state.usersStatic} onChange={this.handleChangeUsers.bind(this)}/>
                    </div>
                    <div className="form-group" style={{paddingTop:30}}>
                        <input style={{fontWeight: 'bold'}} type="submit" value="Create Project" className="btn btn-primary" />
                    </div>
                </form>
                </Card></Col>
                <Col sm={3}></Col>
                </Row>
            </div>
        )
    }
}