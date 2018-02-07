import React, { Component } from 'react';

import { Layout, Form, Button, Input } from 'antd';

import InputForm from '../components/InputForm';

const FormItem = Form.Item;
const { Content } = Layout;

export default class CadastroPage extends Component {

    state = {
        nome: '',
    };

    onChange = (event) => {
        const { id, value } = event.target;
        this.setState({
            [id]: value,
        });
    }

    validateNome = (text) => {
        return text && text.length >= 2;
    }

    validateEmail = (text) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(text.toLowerCase());
    }

    render() {
        const { nome_valid, email_valid } = this.state;
        return (
            <Content>

                <Form>
                    <h3>Informe os dados para cadastro.</h3>

                    <InputForm
                        type="text"
                        id="nome"
                        onChange={this.onChange}
                        label="Nome"
                        errorMessage="Informe o nome do usuário."
                        validator={this.validateNome} />

                    <InputForm
                        type="email"
                        id="email"
                        onChange={this.onChange}
                        label="E-mail"
                        errorMessage="Informe um endereço de e-mail válido."
                        validator={this.validateEmail} />

                    <FormItem
                        validateStatus={"success"}
                        label="Senha"
                        help="Informe uma senha com o mínimo de 6 caracteres.">
                        <Input id="senha" type="password" onChange={this.onChange} />
                    </FormItem>

                    <FormItem>

                        <Button type="danger">Voltar</Button>
                        {' '}
                        <Button htmlType="submit" type="primary">Salvar</Button>

                    </FormItem>

                </Form>

            </Content>
        );
    }
}