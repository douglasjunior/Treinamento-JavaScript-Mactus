import { AppRegistry } from 'react-native';
import App from './src/App';

import axios from 'axios';
axios.defaults.baseURL = 'http://192.168.1.178:3001/api'

AppRegistry.registerComponent('ProjetoReactNavigation', () => App);
