import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import 'antd/dist/antd.css';
import 'moment/locale/pt-br';
import { HashRouter } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:3001/api";
axios.defaults.withCredentials = true;

/**
 * Componente que define o roteador usado no react-router
 */
const Index = () => (
    <HashRouter>
        <App />
    </HashRouter>
);

ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
