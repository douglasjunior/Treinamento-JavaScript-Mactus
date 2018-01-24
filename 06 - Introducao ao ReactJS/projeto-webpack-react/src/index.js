import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';

import Relogio from './components/Relogio';
import Contador from './components/Contador';
import InputText from './components/InputText';
import InputEmail from './components/InputEmail';

const StyleRed = {
    color: 'red',
    fontSize: 20
}

const App = (props) => {
    return (
        <div>
            <h1 style={{ color: 'red' }}>
                Olá React com JSX!
            </h1>
            <Relogio />
            <Contador valorInicial={10} style={StyleRed} />
            <InputText label="Nome" />
            <InputText label="Sobrenome" />
            <InputEmail label="E-mail" />
            <InputText label="Idade" validador={function (valor) {
                return valor > 0 && valor < 99;
            }} />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
