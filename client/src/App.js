import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import ShoppingList from './components/ShoppingList'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <div>
      <Sidebar/>
      <div style={{paddingLeft: 60}}>
        <Router>
        <Container>

          <Route path="/" exact component={Dashboard}/>

          <Route path="/projects" exact component={ShoppingList}/>
          
        </Container>
        </Router>
      </div>
    </div>
  );
}

export default App;
