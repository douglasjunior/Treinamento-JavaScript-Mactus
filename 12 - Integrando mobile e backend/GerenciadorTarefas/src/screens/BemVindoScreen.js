import React, { Component } from 'react';
import {
    View, Text,
    ImageBackground, Image,
    StyleSheet, Platform,
} from 'react-native';

import StatusBar from '../components/StatusBar';
import Button from '../components/Button';
import Colors from '../values/Colors';

const { OS } = Platform;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        paddingTop: 20
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        marginBottom: 16,
    },
    buttonText: {
        fontSize: 20,
    },
    logo: {
        width: 200,
        height: 200,
    }
});

export default class BemVindoScreen extends Component {

    onEntrarPress = () => {
        this.props.navigation.navigate('Login');
    }

    onCadastrarPress = () => {
        this.props.navigation.navigate('Usuario');
    }

    render() {
        return (
            <ImageBackground
                source={require('../drawables/background.jpg')}
                style={styles.background}
                resizeMode="cover"
            >
                <StatusBar translucent backgroundColor="transparent" />

                <View style={styles.container}>
                    <Image source={require('../drawables/logo.png')}
                        style={styles.logo} resizeMode="contain"
                    />
                </View>

                <Button
                    title="Cadastre-se"
                    buttonStyle={styles.button}
                    textStyle={styles.buttonText}
                    backgroundColor={Colors.accent}
                    onPress={this.onCadastrarPress}
                />
                <Button
                    title="Entrar"
                    buttonStyle={styles.button}
                    textStyle={styles.buttonText}
                    onPress={this.onEntrarPress}
                />

            </ImageBackground>
        );
    }

}