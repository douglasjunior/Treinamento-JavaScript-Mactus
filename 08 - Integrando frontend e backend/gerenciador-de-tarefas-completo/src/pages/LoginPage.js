import React, { PureComponent } from 'react';

import { Layout, Button } from 'antd';
import { Redirect } from 'react-router-dom';
// import {
//     Button, Container, Form,
//     FormGroup, Col,
// } from 'reactstrap';
import axios from 'axios';
import { Form, Row, Col } from 'antd';

import "./LoginPage.css";
import InputForm from '../components/InputForm';
import { isLoggedIn, saveToken } from '../utils/LoginManager';
import { validateEmail, validateSenha, checkFormIsValid } from '../utils/Validator';

const { Content } = Layout;
const FormItem = Form.Item;

export default class LoginPage extends PureComponent {

    state = { email: '', senha: '' };

    onFormSubmit = (event) => {
        event.preventDefault();

        if (checkFormIsValid(this.refs)) {
            this.postLogin();
        }
    }

    postLogin = () => {
        const { email, senha } = this.state;

        axios.post("/usuarios/login", {
            email, senha
        }).then(response => {
            console.log(response.status);
            if (response.status === 200) {
                saveToken(response.data.token);
                this.props.history.push('/');
            } else {
                alert('Não foi efetuar login, verifique os dados informados e tente novamente.');
            }
        }).catch(ex => {
            console.error(ex);
            const { response } = ex;
            if (response) {
                console.error('response', response)
                if (ex.response.status === 401) {
                    alert('Usuário ou senha incorretos.');
                } else if (ex.response.status === 422) {
                    alert('Não foi efetuar login, verifique os dados informados e tente novamente.');
                } else {
                    alert('Não foi efetuar login, tente novamente mais tarde.');
                }
            } else {
                alert('Não foi efetuar login, verifique sua conexão com a internet.');
            }
        })
    }

    onCadastrarClick = () => {
        const { history } = this.props;
        history.push('/cadastro')
    }

    onInputChange = (event) => {
        const { id, value } = event.target;
        const state = {};
        state[id] = value;
        this.setState(state);
    }

    render() {
        if (isLoggedIn()) {
            return <Redirect to="/" />
        }

        const { email, senha } = this.state;

        return (
            <Row align="middle" justify="center">

                <Form onSubmit={this.onFormSubmit} className="login-page-form">

                    <InputForm label="E-mail" id="email" ref="email" value={email} onChange={this.onInputChange} required={true}
                        validator={validateEmail} errorMessage="Informe um e-mail válido." />

                    <InputForm label="Senha" id="senha" ref="senha" value={senha} onChange={this.onInputChange} type="password" required={true}
                        validator={validateSenha} errorMessage="A senha deve conter no mínimo 6 e no máximo 8 caracteres." />

                    <FormItem>
                        <Button type="primary" htmlType="submit" className="login-page-form-button">
                            Entrar
                        </Button>
                        Ou <a onClick={this.onCadastrarClick}>Cadastre-se agora!</a>
                    </FormItem>
                </Form>

            </Row>
        )
    }
}