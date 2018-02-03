import React, { Component } from 'react';

import { Route, Link } from 'react-router-dom';

const PESSOAS = [
    {
        id: 1,
        nome: 'Douglas',
        amigos: [2, 3],
    },
    {
        id: 2,
        nome: 'João',
        amigos: [1, 3, 4],
    },
    {
        id: 3,
        nome: 'José',
        amigos: [1, 2, 4],
    },
    {
        id: 4,
        nome: 'Maria',
        amigos: [2, 3],
    },
]

const find = (pessoaId) => {
    const pessoaEncontrada = PESSOAS.find(pessoa =>
        pessoa.id === parseInt(pessoaId, 10)
    );
    return pessoaEncontrada || PESSOAS[0];
}

const Amigo = ({ match }) => {
    const pessoa = find(match.params.id);
    return (
        <div>
            <h3>Amigos do {pessoa.nome}</h3>
            <ul>
                {pessoa.amigos.map(id => (
                    <li key={id}>
                        <Link to={`${match.url}/${id}`}>
                            {find(id).nome}
                        </Link>
                    </li>
                ))}
            </ul>
            <Route path={`${match.url}/:id`} component={Amigo} />
        </div>
    )
}


export default class Amigos extends Component {
    state = {}

    render() {
        return (
            <div>
                <h1>Amigos</h1>

                <Route component={Amigo} />
            </div>
        );
    }
}