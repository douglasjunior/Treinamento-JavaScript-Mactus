import React, { Component } from 'react';
import {
    View, Text,
    ImageBackground,
    StyleSheet,
} from 'react-native';

import StatusBar from '../components/StatusBar';

const styles = StyleSheet.create({
    background: {
        flex: 1,
        paddingTop: 20
    }
});

export default class BemVindoScreen extends Component {

    render() {
        return (
            <ImageBackground
                source={require('../drawables/background.jpg')}
                style={styles.background}
                resizeMode="cover"
            >
                <StatusBar translucent backgroundColor="transparent" />

            </ImageBackground>
        );
    }

}