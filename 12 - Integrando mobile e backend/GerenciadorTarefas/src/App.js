import React, { Component } from 'react';

import { NativeModules } from 'react-native';

const { Calculador } = NativeModules;

import AppNavigator from './screens';

export default class App extends Component {

  componentWillMount() {
    Calculador.somar(0, 3)
      .then(resultado => {
        console.log('Resultado', resultado)
      })
      .catch(ex => {
        console.warn(ex);
      })
  }

  render() {
    return (
      <AppNavigator />
    );
  }
}
