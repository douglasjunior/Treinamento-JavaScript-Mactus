import React, { Component } from 'react';

import { Link, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const TAREFAS = [
  { id: 1, titulo: 'Aprender JavaScript' },
  { id: 2, titulo: 'Dominar o mundo' },
]

export default class Tarefas extends Component {
  render() {
    const links = TAREFAS.map((tarefa) => {
      return (
        <li key={tarefa.id} >
          <Link to={"/tarefas/" + tarefa.id}>{tarefa.titulo}</Link>
        </li>
      )
    });

    const { location } = this.props;

    return (

      <div >
        <h1>Listagem de Tarefas</h1>

        <ul>
          {links}
        </ul>

        <div style={{ position: 'relative' }}>


          <Route
            path="/tarefas/:tarefaId"
            render={(props) => {
              const { match } = props;
              const tarefa = TAREFAS.find(((tarefa) => {
                return tarefa.id === parseInt(match.params.tarefaId, 10);
              }))
              return (
                <TransitionGroup>
                  <CSSTransition
                    key={match.params.tarefaId}
                    classNames="fade"
                    timeout={{ exit: 300, enter: 300 }}
                  >
                    <p style={{
                      position: 'absolute', top: 0,
                      left: 0, bottom: 0, right: 0,
                    }}>Você selecionou a tarefa {tarefa.titulo}</p>
                  </CSSTransition>
                </TransitionGroup>
              );
            }} />



        </div>
      </div>
    )
  }
}