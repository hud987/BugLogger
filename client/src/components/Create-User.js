import React, { Component } from 'react';
import { Button, Row, Col, Card, Form, Input } from 'reactstrap';
import Select from 'react-select'
import axios from 'axios';

export default class CreateUser extends Component {
  state = {
    username: "",
    email: "",
    role: 'Devloper',
    roles: [{ value: "Admin" , label: "Admin"},
        { value: "Devloper" , label: "Devloper"},
        { value: "Manager" , label: "Manager"}],
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

    onSubmit = (e) => {
        e.preventDefault();
        const user = {
            username: this.state.username,
            email: this.state.email,
            role: this.state.role,
        }

        axios.post("/api/users/add",user)
            .then(res => window.location = '/users');
    }

    render() {
        return (
            <div>
                <Row>
                <Col sm={3}></Col>
                <Col>
                <Card style={{background: 'linear-gradient(to right bottom,#888888, #cccccc)' , border: 0, padding: 15}}>
                <h3 style={{color: 'white'}}>Create New User</h3>
                <div style={{paddingBottom: 15}}><a href={"/users"} style={{cursor: 'pointer'}}>Cancel</a></div>

                <Form onSubmit={this.onSubmit.bind(this)}>
                    <label style={{color: 'white'}}>Username: </label>
                    <Input ref="text"
                        required
                        value={this.state.username}
                        onChange={this.onChangeUsername.bind(this)}
                        />
                    <label style={{color: 'white'}}>Email: </label>
                    <Input ref="text"
                        required
                        value={this.state.email}
                        onChange={this.onChangeEmail.bind(this)}
                        />
                    <label style={{color: 'white'}}>Role: </label>
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
            </div>
        )
    }
}