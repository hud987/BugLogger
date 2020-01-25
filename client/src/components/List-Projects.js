import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"
import axios from 'axios';

export default class ProjectList extends Component {
  state = {
    projects: [],  
    columns: [{
      dataField: 'title',
      text: 'Title',
      sort: true,
      style: { fontSize: 14, padding: 3, paddingLeft: 13},
      headerStyle: { fontSize: 14, paddingBottom: 0,alignItems: "left" },
    }, {
      dataField: 'description',
      text: 'Description',
      sort: true,
      style: { fontSize: 14,padding: 3, paddingLeft: 13 },
      headerStyle: { fontSize: 14, paddingBottom: 0,alignItems: "left" },
    }, {
      dataField: 'numUsers',
      text: 'Users',
      sort: true,
      style: { fontSize: 14, padding: 3, paddingLeft: 13 },
      headerStyle: { fontSize: 14, paddingBottom: 0,alignItems: "left" },
    }, {
      dataField: 'numTickets',
      text: 'Tickets',
      sort: true,
      style: { fontSize: 14, padding: 3, paddingLeft: 13 },
      headerStyle: { fontSize: 14, paddingBottom: 0,alignItems: "left" },
    },  {
      dataField: '',
      text: '',
      formatter: (cell, row) => { return (
        <div><a href={"/projects/details/"+row.id}>Details</a></div>
        )},
      style: { fontSize: 14, padding: 3, paddingLeft: 13 },
      headerStyle: { fontSize: 14, paddingBottom: 0,alignItems: "left" },
    },  {
      dataField: 'id',
      text: 'id',
      hidden: true,
      style: { fontSize: 14, padding: 3, paddingLeft: 13 },
      headerStyle: { fontSize: 14, paddingBottom: 0,alignItems: "left" },
    }, ],
  } 

  componentDidMount() {
    axios.get('/api/projects/')
    .then(response => {
      const newProjects = response.data.map(project => (
        {title: project.title, 
          description: project.description,
          numUsers: project.users.length,
          numTickets: project.tickets.length,
          id: project._id}))
      this.setState({projects: newProjects})
    })
    .catch(function (error) {
        console.log(error);
    })
  }

  render() {
    return (
      <div>
        <BootstrapTable 
          bootstrap4
          keyField='id' 
          bordered={false}
          data={ this.state.projects } 
          columns={ this.state.columns } />
      </div>
    );
  }
}