import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import StatusBar from '../components/StatusBar';
import { getUsuario } from '../utils/LoginManager';
import Colors from '../values/Colors';

const styles = StyleSheet.create({
    container: { 
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 16
    },
    text: {
        fontSize: 24,
        color: Colors.textPrimaryDark,
    }
})

export default class HomeScreen extends Component {

    state = {
        usuario: {}
    }

    async componentDidMount() {
        const usuario = await getUsuario();
        this.setState({ usuario });
    }

    render() {
        const {usuario} = this.state;
        return (
            <View style={styles.container}>
                <StatusBar />
                <Text style={styles.text}>
                    Olá {usuario.nome}, bem vindo!
                </Text>
            </View>
        );
    }

}