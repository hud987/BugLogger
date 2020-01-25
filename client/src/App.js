import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'

import ShoppingList from './components/ShoppingList'
import Sidebar from './components/Sidebar'


function App() {
  return (
    <div>
      <Sidebar/>
      <div style={{paddingLeft: 60}}>
        <Router>
          <Route path="/" exact component={ShoppingList}/>

          <Route path="/projects" exact />

        </Router>
      </div>
    </div>
  );
}

export default App;
