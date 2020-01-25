import React, { Component } from 'react';
import { Container, Card } from 'reactstrap';
import axios from 'axios';

export default class ProjectCardlist extends Component {
  state = {
    projects: [],
  } 

  componentDidMount() {
    if (this.props.id != null){
      //get all projects that have a userId if userId is passed
      axios.get('/api/projects/inproject/'+this.props.id)
      .then(response => {
        const newProjects = response.data.map(project => (
          {title: project.title,
          description: project.description,
          tickets: project.tickets.length,
          id: project._id,}))
        this.setState({projects: newProjects})
      })
      .catch(function (error) {
          console.log(error);
      })
    } else {
      //otherwise just get all projects
      axios.get('/api/projects')
      .then(response => {
        const newProjects = response.data.map(project => (
          {title: project.title,
          description: project.description,
          tickets: project.tickets.length,
          id: project._id,}))
        this.setState({projects: newProjects})
      })
      .catch(function (error) {
          console.log(error);
      })
    }
  }
  
  render() {
    return (
      <div>
        <Card style={{background: 'linear-gradient(to right bottom, #888888, #cccccc)', border: 0, height: this.props.height,padding: 3}}>
        <h6 style={{paddingLeft: 17,paddingTop: 5}}>Projects</h6>
        <Card style={{backgroundColor: 'transparent' ,border: 0,height: this.props.height, overflowY: "scroll"}}>
        <Container style={{}}>
        {
          //put info of each project into a card
          this.state.projects.map(project => {
            return(
            <Card onClick={() => {window.location.href = "/projects/details/"+project.id}} style={{backgroundColor: "white",border: 0,marginBottom:3,padding:5,color: 'black',cursor: 'pointer'}}>
              <h3>{project.title}</h3>
              <h6>{project.description}</h6>
              <div><div className='float-right'style={{fontSize:14}}>tickets: {project.tickets}</div>
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
