import React, { Component } from 'react';

import { Redirect, Prompt } from 'react-router-dom';

import UsuarioLogado from '../utils/UsuarioLogado';

export default class Login extends Component {

    state = {
        previnirNavegacao: false
    }

    _onLoginClick = () => {
        // Excução da chamada ajax de Login.
        UsuarioLogado.estadoLogado = true;

        this.forceUpdate();
    }

    _onChange = (event) => {
        this.setState({
            previnirNavegacao: true
        })
    }

    render() {
        if (UsuarioLogado.estadoLogado) {
            const { from } = this.props.location.state || { from: { pathname: '/' } };

            return (
                <Redirect to={from} />
            )
        }

        return (
            <div style={{ textAlign: 'left', padding: 16 }}>

                <h1>Login</h1>

                <label>Usuário</label> <br />
                <input type="text" onChange={this._onChange} />

                <br />

                <label>Senha</label> <br />
                <input type="password" onChange={this._onChange} />

                <br /><br />

                <button onClick={this._onLoginClick}>Logar</button>

                <Prompt message="Tem certeza que deseja sair?"
                    when={this.state.previnirNavegacao}
                />

            </div>
        )
    }
}