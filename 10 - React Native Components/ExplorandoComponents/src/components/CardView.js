import React, { Component } from 'react';
import {
    View, Text,
    Image, StyleSheet,
    Dimensions, Button,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform, Linking,
} from 'react-native';

import { Button as Btn } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';

const { OS, Version } = Platform;

const Touchable = (props) => {
    return OS === 'android' && Version >= 21
        ? <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('#ffffff', false)}
            {...props} />
        : <TouchableOpacity {...props} />;
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 2,
        overflow: 'hidden',
        elevation: 2,
        marginBottom: 8
    },
    title: {
        fontSize: 18,
        color: '#000',
        marginVertical: 8,
    },
    text: {
        fontSize: 16,
        color: '#00000080'
    },
    content: {
        padding: 16
    },
    image: {
        height: 200,
        width: 200,
    },
    button: {
        marginTop: 8,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
    },
    buttonContainer: {
        padding: 16,
        backgroundColor: '#0000ff',
        borderRadius: 4,
        elevation: 2
    }
});

export default class CardView extends Component {

    abrirLink = () => {
        const { image } = this.props;
        if (image.uri) {
            Linking.openURL(image.uri);
        } else {
            Linking.openURL("geo:?q=Campo Mourão - PR")
        }
    }

    render() {
        const { width } = Dimensions.get('window');
        const imageWidth = width - 32;

        const { image, title, text } = this.props;

        return (
            <View style={styles.card}>

                <Image source={image}
                    style={[styles.image, { width: imageWidth }]}
                />

                <View style={styles.content}>

                    <Text style={styles.title}>
                        {title}
                    </Text>

                    <Text style={styles.text}>
                        {text}
                    </Text>

                    <View style={styles.button}>
                        {/* <Button
                            onPress={() => alert('Clicou no item ' + title)}
                            color="#ff0000"
                            title="Clique Aqui"
                        /> */}

                        <Touchable onPress={this.abrirLink}>
                            <View style={styles.buttonContainer} >
                                <Text style={styles.buttonText} >
                                    Clique aqui
                                </Text>
                            </View>
                        </Touchable>
                    </View>

                    <Btn title='BOTÃO' />

                    <Btn title='BOTÃO COM ÍCONE'
                        icon={{
                            name: 'arrow-right',
                            size: 24,
                            color: 'red'
                        }}
                        iconComponent={Icon}
                    />
                    <Btn title='BOTÃO MENU'
                        icon={{
                            name: 'menu',
                        }}
                        iconComponent={IconMaterial}
                    />

                </View>

            </View>
        );
    }
}