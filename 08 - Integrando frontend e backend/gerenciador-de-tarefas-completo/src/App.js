import React, { Component } from 'react';
import './App.css';

import { Switch, Route } from 'react-router-dom';
import { LocaleProvider } from 'antd';
import ptBR from 'antd/lib/locale-provider/pt_BR'

import MainLayout from './layouts/MainLayout';

// import PrivateRoute from './components/PrivateRoute';
// import NavBar from './components/NavBar';
// import SideBar from './components/SideBar';
// import Content from './components/Content';

// import LoginPage from './pages/LoginPage';
// import UsuarioPage from './pages/UsuarioPage';


class App extends Component {

    render() {
        return (
            <LocaleProvider locale={ptBR}>
                <MainLayout />
            </LocaleProvider>
        )
    }
}

export default App;
