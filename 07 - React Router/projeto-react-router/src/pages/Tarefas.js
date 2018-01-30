import React from 'react';

import {
  Link,
  Route
} from 'react-router-dom';

const TAREFAS = [
  { id: 1, titulo: 'Aprender JavaScript' },
  { id: 2, titulo: 'Dominar o mundo' },
]

export default () => {
  const links = TAREFAS.map((tarefa) => {
    return (
      <li key={tarefa.id} >
        <Link to={"/tarefas/" + tarefa.id}>{tarefa.titulo}</Link>
      </li>
    )
  });

  return (
    <div>
      <h1>Listagem de Tarefas</h1>

      <ul>
        {links}
      </ul>

      <Route path="/tarefas/:tarefaId" render={(props) => {
        const { match } = props;
        const tarefa = TAREFAS.find(((tarefa) => {
          return tarefa.id === parseInt(match.params.tarefaId);
        }))
        return (
          <p>Você selecionou a tarefa {tarefa.titulo}</p>
        );
      }} />
    </div>
  )
}