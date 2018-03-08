import React, { Component } from 'react';

import axios from 'axios';
import moment from 'moment';
import { Layout, Form, Button } from 'antd';

import './style.css';
import InputForm from '../../components/InputForm';
import * as Validators from '../../utils/Validators';
import * as Maskers from '../../utils/Maskers';

const FormItem = Form.Item;
const { Content } = Layout;

export default class CadastroPage extends Component {

    state = {
        nome: '',
        email: '',
        cpf: '',
        nascimento: '',
        senha: '',
    };

    onChange = (event) => {
        const { id, value } = event.target;
        this.setState({
            [id]: value,
        });
    }

    onSubmitForm = (event) => {
        event.preventDefault();

        if (Validators.isFormValid(this.refs)) {
            this.requestCadastro();
        }
    }

    requestCadastro = () => {
        const { nome, email, cpf, nascimento, senha } = this.state;

        axios.post('/usuarios', {
            nome, email, senha, cpf,
            nascimento: moment(nascimento, 'DD/MM/YYYY').format('YYYY-MM-DD')
        }).then(response => {
            alert('Usuário cadastrado com sucesso.');
            this.props.history.push('/login');
        }).catch((ex) => {
            console.error(ex);
            if (ex.response) {
                console.error(ex.response);
                const { status, data } = ex.response;
                if (status === 412 && data.type === 'unique' &&
                    data.field === 'email') {
                    alert('E-mail já cadastrado na base de dados.')
                } else {
                    alert('Verifique os dados informados e tente novamente.');
                }
            } else {
                alert('Verifique sua conexão com a internet.');
            }
        })
    }

    render() {
        const { nome, email, cpf, nascimento, senha } = this.state;
        return (
            <Content>

                <Form onSubmit={this.onSubmitForm}
                    className="cadastro-page-form">
                    <h3>Informe os dados para cadastro.</h3>

                    <InputForm
                        type="text"
                        id="nome"
                        ref="nome"
                        onChange={this.onChange}
                        label="Nome"
                        value={nome}
                        errorMessage="Informe o nome do usuário."
                        validator={Validators.validateNome} />

                    <InputForm
                        type="email"
                        id="email"
                        ref="email"
                        onChange={this.onChange}
                        label="E-mail"
                        value={email}
                        errorMessage="Informe um endereço de e-mail válido."
                        validator={Validators.validateEmail} />

                    <InputForm
                        type="text"
                        id="cpf"
                        ref="cpf"
                        onChange={this.onChange}
                        label="CPF"
                        value={cpf}
                        errorMessage="Informe o CPF com 11 dígitos."
                        validator={Validators.validateCPF}
                        masker={Maskers.maskCPF} />

                    <InputForm
                        type="date"
                        id="nascimento"
                        ref="nascimento"
                        onChange={this.onChange}
                        value={nascimento}
                        dateFormat="DD/MM/YYYY"
                        label="Data de nascimento"
                        errorMessage="Informe a data de nascimento."
                        validator={Validators.validateNascimento} />

                    <InputForm
                        type="password"
                        id="senha"
                        ref="senha"
                        onChange={this.onChange}
                        value={senha}
                        label="Senha"
                        errorMessage="Informe sua senha entre 6 e 8 caracteres."
                        validator={Validators.validateSenha} />

                    <FormItem>

                        <Button htmlType="button" type="danger">Voltar</Button>
                        {' '}
                        <Button htmlType="submit" type="primary">Salvar</Button>

                    </FormItem>

                </Form>

            </Content>
        );
    }
}