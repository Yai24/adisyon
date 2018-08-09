import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Masalar from './components/Masalar';
import Detail  from './components/Detail';
import Admin from './admin';
import Dashboard from './admin/Dashboard';
import Login from './components/Login';

class BrowserRouter extends Component {
    render() {
        return (
        <Router>
            <div>
                <Route
                    path="/"
                    exact
                    component={Login}
                />

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
        )
    }
}

export default BrowserRouter;