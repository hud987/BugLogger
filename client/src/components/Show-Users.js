import React, { Component } from 'react';
import { Button, Row, Col } from 'reactstrap';
import UserList from './List-Users'

export default class ShowUsers extends Component {
  render() {
    return (
      <div style={{paddingLeft:0}}>
        <Row>
          <Col className="float-bottom" style={{paddingTop: 14}}>
            <h2>Users</h2>
          </Col>
          <Col style={{paddingTop: 14}}>
            <Button className="float-right"
            onClick={() => {window.location.href = "/users/create"}}
            size = "sm"
            style={{backgroundColor: "#007bff", margin: 0, marginBottom: 10, border: 0}} 
            >
            <h6 style={{paddingTop: 7, fontWeight: "bold", fontSize: 15}}>Add User</h6>
            </Button>
          </Col>
        </Row>
        <div style={{height: '85vh', overflowY: 'scroll'}}>
          <UserList mini={false}/>
        </div>
      </div>
    )
  }
}