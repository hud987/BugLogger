import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import axios from 'axios'

export default class ShoppingList extends Component {
  state = {
    items: []
  }

  componentDidMount() {
    axios.get('/api/items/')
    .then(items => {
      console.log(items.data)
      this.setState({items: items.data})
    })
  }

  onDeleteClick = id => {
    axios.delete('/api/items/'+id)
    .then(items => {})
  }

  render(){
    const { items } = this.state;
    return (
      <Container>
        <Button 
          color='dark' 
          style={{marginBottom: '2rem'}} 
          onClick={() => {
            const name=prompt('Enter Item');
            if(name){
              const newItem = {
                name: name
              }
              axios.post('/api/items/', newItem)
              .then(items => {})
            }
          }}>
          Add Item
        </Button>

        <ListGroup>
          {items.map(({ _id, name}) => (
            <ListGroupItem key={_id}>
              <Button
                style={{margin: 10}}
                className='remove-btn'
                color='danger'
                size='sm'
                onClick={ this.onDeleteClick.bind(this, _id) }
              >
                &times;
              </Button>
              {name}
            </ListGroupItem>
          ))}

        </ListGroup>

      </Container>
    );
  }

}
