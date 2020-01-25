import React, { useState, useEffect, } from 'react';
import axios from 'axios';
import Select from 'react-select'
import { Row, Col, Form, Button, Card, Input } from 'reactstrap';
//import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"

//created as a functional component to test auth0 hook,
export default function CreateTicket() {
  const [projectId] = useState(window.location.pathname.split('/')[3]);
  const [assignedToId, setAssignedToId] = useState({});
  const [assignedToUsername, setAssignedToUsername] = useState("");
  const [constUsers, setConstUsers] = useState([]);
  const [description, setDescription] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [type, setType] = useState("Bug");
  const [types] = useState([{ value: "Bug" , label: "Bug"},
                                      { value: "Aesthic" , label: "Aesthic"},
                                      { value: "Feature" , label: "Feature"}]);

  useEffect(() => {
    axios.get('/api/projects/'+projectId)
    .then(response => {
      setProjectTitle(response.data.title)
    })
    .catch(function (error) {
      console.log(error);
    })

    //get users for drop down selection
    axios.get('/api/projects/getusers/'+projectId)
    .then(response => {
      axios.get('/api/users/searchid',{params: {ids: response.data}} )
      .then(response => {
        const newUsers = []
        response.data.map(currentuser => {
          return newUsers.push({ value: currentuser._id , label: currentuser.username})
        })
        setConstUsers(newUsers)
      })
    })
    
  }, [projectId]);

  const onChangeDescription = (e) => {
    return setDescription(e.target.value)
  }

  const handleChangeUser = (changedVal) => {
    setAssignedToId(changedVal.value)
    setAssignedToUsername(changedVal.label)
    return
  }

  const handleChangeType = (changedVal) => {
    return setType(changedVal.value)
  }

  const onSubmit = (e) => {
    e.preventDefault();

    if(assignedToUsername === ""){
      return alert("please select a user")
    }

    var ticket = {
      newId: {},
      description: description,
      type: type,
      assignedToId: assignedToId,
      assignedToUsername: assignedToUsername,
      project: projectId,
      projectTitle: projectTitle,
    }

    console.log('adding ticket')
    axios.post('/api/tickets/add',ticket)
    .then(res => {
      console.log('adding ticket to project')
      axios.post('/api/projects/addticket/'+projectId, res.data)
    })
    .then(res => {
      return window.location = '/projects/details/'+projectId
    });
  }

  return (
    <div>
      <Row>
        <Col sm={3}></Col>
        <Col>
        <Card style={{background: 'linear-gradient(to right bottom, #888888, #cccccc)', border: 0,padding: 15}}>
        <h3 style={{color: 'white'}}>Add Ticket</h3>
        <div style={{paddingBottom: 15}}><a href={"/projects/details/"+projectId} style={{cursor: 'pointer'}}>Cancel</a></div>
        <Form onSubmit={onSubmit}>
          <div style={{flexDirection: 'row'}}>
            <label style={{color: 'white'}}>Description: </label>
              <Input 
                type="text"
                required
                value={description}
                onChange={onChangeDescription}
              />
            <label style={{color: 'white'}}>Assign To: </label>
                <Select required options={constUsers} onChange={handleChangeUser}/>
            <label style={{color: 'white'}}>Type: </label>
              <Select defaultValue={types[0]} options={types} onChange={handleChangeType}/>
            <div className="form-group" style={{paddingTop:30}}>
              <Button type="submit" color='primary' style={{fontWeight: 'bold'}}>
                Submit Ticket
              </Button>
            </div>
          </div>  
        </Form>
        </Card>
        </Col>
        <Col sm={3}></Col>
      </Row>
    </div>
  )
}