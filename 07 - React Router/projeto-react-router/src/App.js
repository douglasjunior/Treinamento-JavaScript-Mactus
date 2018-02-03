import React, { Component } from 'react';
import './App.css';

import {
  HashRouter,
  Route,
  Link,
  Switch
} from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Tarefas from './pages/Tarefas';
import Amigos from './pages/Amigos';
import Sobre from './pages/Sobre';
import PrivateRoute from './components/PrivateRoute';
import CustomLink from './components/CustomLink';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          <ul>
            <CustomLink to="/" exact>Home</CustomLink>
            <CustomLink to="/tarefas">Tarefas</CustomLink>
            <CustomLink to="/amigos">Amigos</CustomLink>
            <CustomLink to="/sobre">Sobre</CustomLink>
          </ul>

          <div>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login" component={Login} />
              <PrivateRoute path="/tarefas" component={Tarefas} />
              <Route path="/amigos" component={Amigos} />
              <Route path="/sobre" component={Sobre} />
              <Route render={() => (
                <div>
                  <p>Página não encontrada</p>
                  <Link to="/">Ir para o home</Link>
                </div>
              )} />
            </Switch>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
