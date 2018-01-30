import React, { Component } from 'react';
import './App.css';

import {
  HashRouter,
  Route,
  Link
} from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Tarefas from './pages/Tarefas';
import Sobre from './pages/Sobre';

import PrivateRoute from './components/PrivateRoute';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/tarefas">Tarefas</Link></li>
            <li><Link to="/sobre">Sobre</Link></li>
          </ul>

          <div>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/tarefas" component={Tarefas} />
            <Route path="/sobre" component={Sobre} />
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
