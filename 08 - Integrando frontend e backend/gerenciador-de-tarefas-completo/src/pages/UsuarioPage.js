import React, { Component } from 'react';

import { Form, Button } from 'antd';
import axios from 'axios';
import moment from 'moment';

import './UsuarioPage.css';
import InputForm from '../components/InputForm';
import { validateEmail, validateSenha, validateCPF, checkFormIsValid } from '../utils/Validator';

const FormItem = Form.Item;
const DATE_FORMAT = 'DD/MM/YYYY';

const formItemLayout = {
    labelCol: {
        xs: { span: 10 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 10 },
        sm: { span: 16 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 10,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

export default class UsuarioPage extends Component {

    state = {
        nome: '',
        email: '',
        senha: '',
        nascimento: null,
    };

    onFormSubmit = (event) => {
        event.preventDefault();

        if (checkFormIsValid(this.refs)) {
            this.postUsuario();
        }
    }

    postUsuario = () => {
        const { nome, email, cpf, senha, nascimento } = this.state;

        axios.post('/usuarios', {
            nome, email,
            senha,
            cpf,
            nascimento: moment(nascimento, DATE_FORMAT).format("YYYY-MM-DD")
        }).then(response => {
            console.log(response.status);
            if (response.status === 201) {
                alert('Usuário cadastrado com sucesso!');
                this.props.history.push('/login');
            } else {
                alert('Não foi possível cadastrar o usuário, verifique os dados informados e tente novamente.');
            }
        }).catch(ex => {
            console.error(ex);
            console.error('response', ex.response)
            if (ex.response.status === 422) {
                alert('Não foi possível cadastrar o usuário, verifique os dados informados e tente novamente.');
            } else if (ex.response.status === 412) {
                if (ex.response.data.type === 'unique')
                    alert('E-mail já cadastrado na base de dados.');
            } else {
                alert('Não foi possível cadastrar o usuário, tente novamente mais tarde.');
            }
        })
    }

    onCancelarClick = (event) => {
        this.props.history.push('/login');
    }

    onInputChange = (event) => {
        const { id, value } = event.target;
        const state = {};
        state[id] = value;
        this.setState(state);
    }

    onNascimentoChange = (date) => {
        this.setState({ nascimento: date });
    }

    validateNascimento = (value) => {
        return moment(value, DATE_FORMAT, true).isValid();
    }

    render() {
        const { nome, email, cpf, senha, nascimento } = this.state;
        return (
            <Form onSubmit={this.onFormSubmit} className="usuario-page-form">
                <h3>Informe seus dados para cadastro.</h3>

                <InputForm label="Nome" id="nome" ref="nome" value={nome} onChange={this.onInputChange} required={true}
                    validator={value => !!value && value.length >= 3} errorMessage="O nome é obrigatório."
                />

                <InputForm label="E-mail" id="email" ref="email" value={email} onChange={this.onInputChange} required={true}
                    validator={validateEmail} errorMessage="Informe um e-mail válido."
                />

                <InputForm label="Senha" id="senha" ref="senha" value={senha} onChange={this.onInputChange} required={true}
                    type="password"
                    validator={validateSenha} errorMessage="A senha deve conter no mínimo 6 e no máximo 8 caracteres."
                />

                <InputForm label="CPF" id="cpf" ref="cpf" value={cpf} onChange={this.onInputChange} required={true}
                    validator={validateCPF} errorMessage="O CPF deve conter 11 dígitos."
                />

                <InputForm label="Nascimento" id="nascimento" ref="nascimento" value={nascimento} onChange={this.onInputChange} required={true}
                    type="date" dateFormat={DATE_FORMAT}
                    validator={this.validateNascimento} errorMessage="Informe a data de nascimento no formato dd/mm/aaaa."
                />

                <FormItem>

                    <Button type="danger" onClick={this.onCancelarClick} tabIndex={-1} >Cancelar</Button>
                    {' '}
                    <Button htmlType="submit" type="primary" default>Salvar</Button>

                </FormItem>

            </Form>
        );
    }
}