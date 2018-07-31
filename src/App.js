import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Masalar from './components/Masalar';
import Detail  from './components/Detail';
import Admin from './admin';
import Dashboard from './admin/Dashboard';

class App extends Component {
  render() {
    return (
      <Router>
        <div>

          <Route
            path="/desk"
            exact
            component={Masalar}
          />

          <Route
            path="/detail/:id"
            exact
            component={Detail}
          />

          <Route
            path="/admin"
            exact
            component={Admin}
          />
          
          <Route
            path="/admin/dashboard"
            exact
            component={Dashboard}
          />

        </div>
      </Router>
    );
  }
}

export default App;
