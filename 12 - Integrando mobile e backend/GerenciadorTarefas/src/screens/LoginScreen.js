import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import axios from 'axios';
import { NavigationActions } from 'react-navigation';

import StatusBar from '../components/StatusBar';
import TextInput from '../components/TextInput';
import { validateEmail, validateSenha, checkFormIsValid } from '../utils/Validator';
import Button from '../components/Button';
import { saveToken } from '../utils/LoginManager';

const styles = StyleSheet.create({
    container: {
        flex: 1,
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

export default class LoginScreen extends Component {

    state = {
        email: '', 
        senha: ''
    }

    onChange = (id, value) => {
        this.setState({
            [id]: value,
        });
    }

    onLoginPress = () => {
        if (checkFormIsValid(this.refs)) {
            this.requestLogin();
        }
    }

    replaceScreen = (routeName) => {
        const { navigation } = this.props;
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: routeName })
            ]
        })
        navigation.dispatch(resetAction);
    }

    requestLogin = () => {
        const { email, senha } = this.state;
        axios.post('/usuarios/login', {
            email, senha
        }).then(response => {
            const { data, status } = response;
            saveToken(data.token);
            this.replaceScreen('Home');
        }).catch(ex => {
            console.warn(ex);
            const { response } = ex;
            if (response) {
                if (response.status === 401) {
                    alert('Usuário ou senha incorretos.');
                } else {
                    alert('Vefifique os dados informados e tente novamente.');
                }
            } else {
                alert('Verifique sua conexão com a internet.');
            }
        })
    }

    render() {
        const { email, senha } = this.state;
        return (
            <View style={styles.container}>
                <StatusBar />

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
                    title="Entrar"
                    onPress={this.onLoginPress}
                    buttonStyle={styles.button}
                    containerViewStyle={styles.buttonContainer}
                />

            </View>
        );
    }

}