import React from 'react';

import UsuarioLogado from '../utils/UsuarioLogado';

export default () => {
    return (
        <div>
            <h1>Login</h1>
            <button onClick={() => {
                UsuarioLogado.estadoLogado = true;
            }}>Logar</button>
        </div>
    )
}