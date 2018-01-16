import React from 'react';
import ReactDOM from 'react-dom';

import Relogio from './components/Relogio';

const App = (props) => {
    return (
        <div>
            <h1 style={{ color: 'red' }}>
                Olá React com JSX!
                </h1>
                <Relogio />
                <Relogio />
                <Relogio />
                <Relogio />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
