import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

export default class PerfilScreen extends Component {

    voltar = () => {
        this.props.navigation.goBack(null);
    }

    render() {
        return (
            <View>
                <Text>Perfil Screen</Text>
                <Button 
                    title="Voltar"
                    onPress={this.voltar} />
            </View>
        );
    }

}