import React from 'react';

import {
    Route,
    Redirect
} from 'react-router-dom';

import UsuarioLogado from '../utils/UsuarioLogado';

export default (props) => {
    const { component: Component, ...othersProps } = props;
    return (
        <Route {...othersProps} render={props => {
            if (UsuarioLogado.estadoLogado) {
                return <Component {...props} />;
            }
            return (
                <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }} />
            )
        }} />
    )
}
