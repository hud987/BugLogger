import React, { Component } from 'react';
import { Button, Row, Col } from 'reactstrap';
import ProjectList from './List-Projects'

export default class ShowProjects extends Component {
  render() {
    return (
      <div style={{paddingLeft:0}}>
        <Row>
          <Col className="float-bottom" style={{paddingTop: 14}} >
            <h2>Projects</h2>
          </Col>
          <Col style={{paddingTop: 14}}>
            <Button className="float-right"
            onClick={() => {window.location.href = "/projects/create"}}                
            color='primary'
            size = "sm"
            style={{margin: 0, marginBottom: 10, border: 0}} 
            >
            <h6 style={{paddingTop: 7, fontWeight: "bold", fontSize: 12}}>Create Project</h6>
            </Button>
          </Col>
        </Row>
      <div style={{height: '85vh', overflowY: 'scroll'}}>
    <ProjectList />
    </div>
    </div>
    )
  }
}