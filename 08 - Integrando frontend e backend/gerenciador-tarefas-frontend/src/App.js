import React, { Component } from 'react';

import './App.css';
import { LocaleProvider } from 'antd';
import pt_BR from 'antd/lib/locale-provider/pt_BR';

import MainLayout from './layouts/MainLayout';

class App extends Component {
  render() {
    return (
      <LocaleProvider locale={pt_BR} >
        <MainLayout />
      </LocaleProvider>
    );
  }
}

export default App;
