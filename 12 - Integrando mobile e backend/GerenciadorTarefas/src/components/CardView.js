import React, { Component } from 'react';
import {
    View, Text,
    Image, StyleSheet,
    Dimensions, Button,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform, Linking,
} from 'react-native';

import Colors from '../values/Colors';

const { OS, Version } = Platform;

const Touchable = (props) => {
    return OS === 'android' && Version >= 21
        ? <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple(Colors.primary, false)}
            {...props} />
        : <TouchableOpacity {...props} />;
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 2,
        overflow: 'hidden',
        elevation: 2,
        marginBottom: 16
    },
    content: {
        padding: 16,
        backgroundColor: '#fff',
    },
});

export default class CardView extends Component {

    render() {
        const { onPress, onLongPress, children } = this.props;
        return (
            <View style={styles.card}>
                <Touchable onPress={onPress} onLongPress={onLongPress}>
                    <View style={styles.content}>
                        {children}
                    </View>
                </Touchable>
            </View>
        );
    }
}