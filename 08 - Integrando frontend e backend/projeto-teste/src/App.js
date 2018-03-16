import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    valor: ''
  }

  onChange = (e) => {
    const val = e.target.value
    const parts = val.match(/(\d+)([\+*])(\d+)/)
    if (!parts) return
    parts
    const left = parseInt(parts[1]) // ?
    const operator = parts[2] // ?
    const right = parseInt(parts[3]) // ?
    let result
    if (operator === '+') {
      result = left + right
    } else if (operator === '*') {
      result = left * right
    }
    result
    this.setState({ valor: result })
  }
  render() {
    const { valor } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <p className="App-intro">
          <input id="valor" onChange={this.onChange} />
          <div id="resultado">{valor}</div>
        </p>
      </div>
    );
  }
}

export default App;
