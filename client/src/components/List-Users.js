import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"
import axios from 'axios';

export default class UserList extends Component {
  state = {
    users: [],  
    miniColumns: [{
      dataField: 'username',
      text: 'Users',
      sort: true,
      style: { fontSize: 14, padding: 3, paddingLeft: 13},
      headerStyle: { fontSize: 14, paddingBottom: 0,alignItems: "left" },
    },{
      dataField: 'role',
      text: 'Role',
      sort: true,
      style: { fontSize: 14, padding: 3, paddingLeft: 13},
      headerStyle: { fontSize: 14, paddingBottom: 0,alignItems: "left" },
    }],

    columns: [{
      dataField: 'username',
      text: 'Users',
      sort: true,
      style: { fontSize: 14, padding: 3, paddingLeft: 13},
      headerStyle: { fontSize: 14, paddingBottom: 0,alignItems: "left" },
    }, {
      dataField: 'email',
      text: 'Email',
      sort: true,
      style: { fontSize: 14, padding: 3, paddingLeft: 13},
      headerStyle: { fontSize: 14, paddingBottom: 0,alignItems: "left" },
    }, {
      dataField: 'role',
      text: 'Role',
      sort: true,
      style: { fontSize: 14, padding: 3, paddingLeft: 13},
      headerStyle: { fontSize: 14, paddingBottom: 0,alignItems: "left" },
    },{
      dataField: '',
      text: '',
      formatter: (cell, row) => { return (
        <div><a href={"/users/details/"+row.id}>Details</a></div>
        )},
      style: { fontSize: 14, padding: 3, paddingLeft: 13},
      headerStyle: { fontSize: 14, paddingBottom: 0,alignItems: "left" },
    },{
      dataField: 'id',
      text: 'id',
      hidden: true,
    }, ],
  } 

  componentDidMount() {
    //filter out users for displaying in project detials
    if (this.props.filter){
      axios.get('/api/projects/getusers/'+this.props.id)
      .then(response => {
        axios.get('/api/users/searchid',{params: {ids: response.data}} )
        .then(response => {
          console.log(response.data)
          const newUsers = response.data.map(user => (
            {id: user._id,
              username: user.username, 
              email: user.email,
              role: user.role}))
          this.setState({users: newUsers})
        })
      })
      .catch(function (error) {
          console.log(error);
      })
    } else { //else show all users
      axios.get('/api/users')
      .then(response => {
        console.log(response.data)
        const newUsers = response.data.map(user => (
          {id: user._id,
            username: user.username, 
            email: user.email,
            role: user.role}))
        this.setState({users: newUsers})
      })
      .catch(function (error) {
          console.log(error);
      })
    }
  }

  renderList = () => {
    if (this.props.mini){
      return(
      <BootstrapTable 
        bootstrap4 
        bordered={false}
        keyField='username' 
        data={ this.state.users } 
        columns={ this.state.miniColumns } 
      />)
    } else {
      return (
      <BootstrapTable 
        bootstrap4 
        bordered={false}
        keyField='username' 
        data={ this.state.users } 
        columns={ this.state.columns } 
      />)
    }
  }

  render() {
      return (
        <div>
          { this.renderList(this) }
        </div>
      );
    }
}