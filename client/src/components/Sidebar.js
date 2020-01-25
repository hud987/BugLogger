import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import home from '../images/home-icon.png';
import manageUsers from '../images/manage-projects.png';
import projects from '../images/projects.png';
import tickets from '../images/tickets.png';

//import profile from '../images/profile.png';
//import logoutImage from '../images/logout.png';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import React from 'react';
//import { BrowserRouter as Router, Route } from "react-router-dom";
//import { useAuth0 } from "../react-auth0-spa";

export default function Sidebar(){
  //const { logout } = useAuth0();

  var selected="home"
  var str = window.location.pathname.split("/"); 
  if (str[1] === 'user'){
    selected='userProfile'
  } else if (str[1] === 'projects'){
    selected='myProjects'
  } else if (str[1] === 'tickets'){
    selected='myTickets'
  } else if (str[1] === 'users'){
    selected='users'
  }

  return(
      <SideNav>
        <SideNav.Toggle onClick={(selected) => {
            //console.log(this.props.expanded)
            //this.props.changeExpanded()
        }}/>
        <SideNav.Nav defaultSelected={selected}>
            <NavItem eventKey="home" onClick={() => {
              window.location.href = "/"
            }}>
              <NavIcon>
                <img src={home} style={{paddingBottom: 10}} alt={"Dashboard"}/>
                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText>
                Dashboard
              </NavText>
            </NavItem>
            <NavItem eventKey="myProjects" onClick={() => {
              window.location.href = "/projects"
            }}>
              <NavIcon>
                <img src={projects} style={{paddingBottom: 10}} alt={"Projects"}/>
                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText>
                Projects
              </NavText>
            </NavItem>

            <NavItem eventKey="myTickets" onClick={() => {
              window.location.href = "/tickets"
            }}>
              <NavIcon>
                  <img src={tickets} style={{paddingBottom: 10}} alt={"Tickets"}/> 
                  <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText>
                Tickets
              </NavText>  
            </NavItem>

            <NavItem eventKey="users" onClick={() => {
              window.location.href = "/users"
            }}>
              <NavIcon>
                <img src={manageUsers} style={{paddingBottom: 10}} alt={"Users"}/> 
                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText>
                Users
              </NavText>
            </NavItem>
            {/*
            <NavItem eventKey="profile" onClick={() => {
              window.location.href = "/user"
            }}>
              <NavIcon>
                <img src={profile} style={{paddingBottom: 10}} alt={"User Profile"}/> 
                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText>
                User Profile
              </NavText>
              <NavText>
                Profile
              </NavText>
            </NavItem>

            <NavItem eventKey="logout" onClick={() => {
            logout()
            }}>
              <NavIcon>
                <img src={logoutImage} style={{paddingBottom: 10}} alt={"Logout"}/> 
                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText>
                  Logout
              </NavText>
            </NavItem>
          */}
        </SideNav.Nav>
      </SideNav>
  )
}


