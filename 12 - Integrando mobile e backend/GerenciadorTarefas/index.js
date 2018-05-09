import { AppRegistry } from 'react-native';
import App from './src/App';

import axios from 'axios';

import { getToken } from './src/utils/LoginManager';

axios.defaults.baseURL = 'http://10.10.10.224:3001/api';
axios.interceptors.request.use(async request => {
    const token = await getToken();
    request.headers['x-access-token'] = token;
    return request;
});

AppRegistry.registerComponent('ProjetoReactNavigation', () => App);
