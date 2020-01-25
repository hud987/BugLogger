import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"
import axios from 'axios';

export default class TicketList extends Component {
  state = {
    tickets: [],  
    columns: [{
      dataField: 'description',
      text: 'Description',
      sort: true,
      style: { fontSize: 14,padding: 3, paddingLeft: 13 },
      headerStyle: { fontSize: 14, paddingBottom: 0,alignItems: "left" },
    }, {
      dataField: 'project',
      text: 'Project',
      sort: true,
      style: { fontSize: 14, padding: 3, paddingLeft: 13 },
      headerStyle: { fontSize: 14, paddingBottom: 0,alignItems: "left" },
    }, {
      dataField: 'type',
      text: 'Type',
      sort: true,
      style: { fontSize: 14, padding: 3, paddingLeft: 13 },
      headerStyle: { fontSize: 14, paddingBottom: 0,alignItems: "left" },
    },{
      dataField: 'status',
      text: 'Status',
      sort: true,
      style: { fontSize: 14, padding: 3, paddingLeft: 13 },
      headerStyle: { fontSize: 14, paddingBottom: 0,alignItems: "left" },
    },{
      dataField: 'time',
      text: 'Created',
      sort: true,
      style: { fontSize: 14, padding: 3, paddingLeft: 13 },
      headerStyle: { fontSize: 14, paddingBottom: 0,alignItems: "left" },
    }, {
      dataField: '',
      text: '',
      formatter: (cell, row) => { return (
        <div><div><a href={"/tickets/details/"+row.id}>Details</a></div>
        <div><a href={"/tickets/edit/"+row.id}>Edit</a></div></div>
        )},
      style: { fontSize: 14, padding: 3, paddingLeft: 13 },
      headerStyle: { fontSize: 14, paddingBottom: 0,alignItems: "left" },
    }, {
      dataField: 'id',
      text: '',
      hidden: true,
    }, ], 
  } 

  componentDidMount() {
    axios.get('/api/tickets/')
    .then(response => {
      console.log(response.data)
      const newTickets = response.data.map(ticket => (
        {description: ticket.description,
          project: ticket.projectTitle,
          submitter: ticket.submiter,
          status: ticket.status,
          time: Date(ticket.createdAt).substring(0,21),
          type: ticket.type,
          id: ticket._id}))
      this.setState({tickets: newTickets})
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
          bordered={false}
          keyField='title' 
          data={ this.state.tickets } 
          columns={ this.state.columns } />
      </div>
    );
  }
}