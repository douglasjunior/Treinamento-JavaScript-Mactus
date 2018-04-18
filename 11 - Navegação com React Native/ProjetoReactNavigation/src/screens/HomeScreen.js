import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';



export default class HomeScreen extends Component {

    navegarParaPerfil = () => {
        this.props.navigation.navigate('Perfil');
    }

    navegarParaRelatorios = () => {
        this.props.navigation.navigate('Relatorios');
    }

    render() {
        return (
            <View>
                <Text>Home Screen</Text>
                <Button
                    title="Abrir Perfil"
                    onPress={this.navegarParaPerfil} />
                <Button
                    title="Abrir Relatórios"
                    onPress={this.navegarParaRelatorios} />
            </View>
        );
    }

}