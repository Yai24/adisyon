import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Masalar from './components/Masalar';

class App extends Component {
  render() {
    return (
      <Router>
        <Route
          path="/desk"
          component={Masalar}
        />
      </Router>
    );
  }
}

export default App;
