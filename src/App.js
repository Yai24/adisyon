import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Masalar from './components/Masalar';
import Detail  from './components/Detail';

class App extends Component {
  render() {
    return (
      <Router>
        <div>

          <Route
            path="/desk"
            component={Masalar}
          />

          <Route
            path="/detail/:id"
            component={Detail}
          />
          
        </div>
      </Router>
    );
  }
}

export default App;
