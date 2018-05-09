import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class TarefaScreen extends Component {

    onFormSalvar = (tarefa) => {
        if (tarefa.id) {
            this.editarTarefa(tarefa);
        } else {
            this.cadastrarTarefa(tarefa);
        }
    }

    editarTarefa = (tarefa) => {
        axios.put(`/tarefas/${tarefa.id}`, {
            titulo: tarefa.titulo,
            descricao: tarefa.descricao,
        }).then(response => {
            const { data } = response;
            const { tarefas } = this.state;
            const index = tarefas.findIndex(t => t.id === tarefa.id);
            tarefas.splice(index, 1, data);
            this.setState({
                tarefas: [...tarefas],
                formVisible: false,
                tarefaEdit: null,
            });
        }).catch(ex => {
            console.warn(ex);
        });
    }

    cadastrarTarefa = (tarefa) => {
        axios.post('/tarefas', {
            titulo: tarefa.titulo,
            descricao: tarefa.descricao,
        }).then(response => {
            const { data } = response;
            const { tarefas } = this.state;
            tarefas.unshift(data);
            this.setState({
                tarefas: [...tarefas],
                formVisible: false,
            })
        }).catch(ex => {
            console.warn(ex);
        })
    }

    render() {
        return (
            <View />
        );
    }

}