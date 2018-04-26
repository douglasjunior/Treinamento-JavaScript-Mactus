import React, { Component } from 'react';
import {
    View, Text, ScrollView,
    StyleSheet
} from 'react-native';

import axios from 'axios';
import moment from 'moment';

import StatusBar from '../components/StatusBar';
import TextInput from '../components/TextInput';
import {
    validateCPF, validateEmail, validateSenha,
    checkFormIsValid
} from '../utils/Validator';
import { maskCPF, maskDate } from '../utils/Maskers';
import Button from '../components/Button';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        paddingVertical: 8,
        paddingHorizontal: 16
    },
    button: {
        marginTop: 8
    },
    buttonContainer: {
        marginLeft: 0,
        marginRight: 0,
    }
});

export default class UsuarioScreen extends Component {

    state = {
        nome: '',
        email: '',
        cpf: '',
        nascimento: '',
        senha: '',
    };

    onChange = (id, value) => {
        this.setState({
            [id]: value,
        });
    }

    onCadastrarPress = () => {
        if (checkFormIsValid(this.refs)) {
            this.requestCadastro();
        }
    }

    requestCadastro = () => {
        const { nome, email, cpf, nascimento, senha } = this.state;

        axios.post('/usuarios', {
            nome, email, senha,
            cpf: cpf.replace(/[^\d]/g, ''),
            nascimento: moment(nascimento, 'DD/MM/YYYY').format('YYYY-MM-DD')
        }).then(response => {
            alert('Usuário cadastrado com sucesso.');
            this.props.navigation.goBack(null);
        }).catch((ex) => {
            console.warn(ex);
            if (ex.response) {
                console.warn(ex.response);
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
        const {
            nome, email,
            cpf, nascimento,
            senha,
        } = this.state;
        return (
            <View style={styles.container}>
                <StatusBar />
                <ScrollView
                    keyboardShouldPersistTaps="always"
                    contentContainerStyle={styles.scrollContainer}
                >

                    <TextInput
                        id="nome"
                        ref="nome"
                        label="Nome"
                        value={nome}
                        validator={n => Boolean(n)}
                        required
                        errorMessage="Informe o nome do usuário."
                        onChange={this.onChange}
                    />
                    <TextInput
                        id="cpf"
                        ref="cpf"
                        label="CPF"
                        value={cpf}
                        validator={validateCPF}
                        masker={maskCPF}
                        keyboardType="numeric"
                        required
                        errorMessage="Informe um CPF válido."
                        onChange={this.onChange}
                    />
                    <TextInput
                        id="nascimento"
                        ref="nascimento"
                        label="Data nascimento"
                        type="date"
                        value={nascimento}
                        validator={d => moment(d, 'DD/MM/YYYY', true).isValid()}
                        dateFormat="DD/MM/YYYY"
                        keyboardType="numeric"
                        required
                        errorMessage="Informe a data no formado DD/MM/AAAAA."
                        onChange={this.onChange}
                    />
                    <TextInput
                        id="email"
                        ref="email"
                        label="E-mail"
                        value={email}
                        validator={validateEmail}
                        keyboardType="email-address"
                        required
                        errorMessage="Informe um E-mail válido."
                        onChange={this.onChange}
                        autoCapitalize="none"
                    />
                    <TextInput
                        id="senha"
                        ref="senha"
                        label="Senha"
                        value={senha}
                        validator={validateSenha}
                        required
                        secureTextEntry
                        errorMessage="Informe uma senha de 6 a 8 caracteres."
                        onChange={this.onChange}
                        autoCapitalize="none"
                    />

                    <Button
                        title="Cadastrar"
                        onPress={this.onCadastrarPress}
                        buttonStyle={styles.button}
                        containerViewStyle={styles.buttonContainer}
                    />

                </ScrollView>
            </View>
        );
    }

}