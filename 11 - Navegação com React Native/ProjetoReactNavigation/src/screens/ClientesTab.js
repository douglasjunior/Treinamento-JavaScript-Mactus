import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

export default class ClientesTab extends Component {

    voltar = () => {
        this.props.navigation.goBack(null);
    }

    render() {
        return (
            <View>
                <Text>Aba Clientes</Text>
                <Button
                    title="Voltar"
                    onPress={this.voltar} />
            </View>
        );
    }

}