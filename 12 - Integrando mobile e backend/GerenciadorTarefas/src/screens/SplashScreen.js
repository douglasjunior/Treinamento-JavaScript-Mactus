import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { NavigationActions } from 'react-navigation';

import { isLoggedIn } from '../utils/LoginManager';

export default class SplashScreen extends Component {

    async componentDidMount() {
        const isLogged = await isLoggedIn();
        if (isLogged) {
            this.replaceScreen('Home');
        } else {
            this.replaceScreen('BemVindo');
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

    render() {
        return (
            <View>
            </View>
        );
    }

}