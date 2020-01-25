import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'

import ShowProjects from './components/Show-Projects'
import DetailsProjects from './components/Details-Project'

import ShowTickets from './components/Show-Tickets'
import DetailsTickets from './components/Details-Ticket'

import ShowUsers from './components/Show-Users'
import DetailsUser from './components/Details-User'

function App() {
  return (
    <div>
      <Sidebar/>
      <div style={{paddingLeft: 60}}>
        <Router>
        <Container style={{paddingTop: 15}}>

          <Route path="/" exact component={Dashboard}/>

          <Route path="/projects" exact component={ShowProjects}/>
          <Route path="/projects/details/:id" exact component={DetailsProjects} />

          <Route path="/tickets" exact component={ShowTickets} />
          <Route path="/tickets/details/:id" exact component={DetailsTickets} />

          <Route path="/users" exact component={ShowUsers} />
          <Route path="/users/details/:id" exact component={DetailsUser} />

          {/* 
          <Route path="/projects/edit/:id" exact component={EditProject} />
          <Route path="/projects/users/:id" exact component={EditProjectUsers} />
          <Route path="/projects/ticket/:id" exact component={CreateTicket} />
          <Route path="/projects/create" exact component={CreateProject} />

          <Route path="/tickets/edit/:id" exact component={EditTicket} />
          
          <Route path="/users/edit/:id" exact component={UsersEdit} />
          <Route path="/users/create" exact component={CreateUser} />
          */}
        </Container>
        </Router>
      </div>
    </div>
  );
}

export default App;
