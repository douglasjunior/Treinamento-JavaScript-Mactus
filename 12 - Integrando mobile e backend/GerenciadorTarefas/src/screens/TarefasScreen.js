import React, { Component } from 'react';
import {
    View, Text,
    FlatList, StyleSheet,
    Alert, Switch, RefreshControl,
} from 'react-native';

import axios from 'axios';

import TextInput from '../components/TextInput';
import CardView from '../components/CardView';
import Colors from '../values/Colors';

const styles = StyleSheet.create({
    listContainer: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    }
});

export default class TarefasScreen extends Component {

    state = {
        tarefas: [],
        formVisible: false,
        tarefaEdit: {},
        refreshing: false,
    }

    componentDidMount() {
        this.getTarefas();
    }

    getTarefas = () => {
        this.setState({
            refreshing: true,
        });
        axios.get('/tarefas')
            .then(response => {
                const { data } = response;
                this.setState({
                    tarefas: data,
                    refreshing: false,
                })
            }).catch(ex => {
                console.warn(ex);
                this.setState({
                    refreshing: false,
                });
            })
    }

    onConcluidaChange = (tarefa, concluida) => {
        let request;
        if (concluida) {
            request = axios.put(`/tarefas/concluida/${tarefa.id}`);
        } else {
            request = axios.delete(`/tarefas/concluida/${tarefa.id}`);
        }
        request
            .then(response => {
                tarefa.concluida = concluida;
                const { tarefas } = this.state;
                this.setState({
                    tarefas: [...tarefas]
                });
            }).catch(ex => {
                console.warn(ex);
            })
    }

    onExcluirClick = (tarefa) => {
        Alert.alert(`Confirmar exclusão`, 'Deseja excluir esta tarefa?', [
            {
                text: 'Não',
                style: 'cancel',
            }, {
                text: 'Sim',
                style: 'destructive',
                onPress: () => this.excluirTarefa(tarefa)
            }
        ])
    }

    excluirTarefa = (tarefa) => {
        axios.delete(`/tarefas/${tarefa.id}`)
            .then(response => {
                const { tarefas } = this.state;
                const index = tarefas.findIndex(t => t.id === tarefa.id);
                tarefas.splice(index, 1);
                this.setState({
                    tarefas: [...tarefas]
                })
            }).catch(ex => {
                console.warn(ex);
            })
    }

    onAdicionarClick = () => {
        // navigar para TarefaScreen
    }

    onEditarClick = (tarefa) => {
        axios.get(`/tarefas/${tarefa.id}`)
            .then(response => {
                const { data } = response;
                // navigar para TarefaScreen
            }).catch(ex => {
                console.warn(ex);
            })
    }

    renderItem = (record) => {
        const { item, index } = record;

        return (
            <CardView
                onPress={() => this.onEditarClick(item)}
                onLongPress={() => this.onExcluirClick(item)}
            >
                <Text>{item.titulo}</Text>
                <Switch value={item.concluida} />
            </CardView>
        )
    }

    render() {
        const { tarefas, refreshing } = this.state;
        return (
            <View>

                <FlatList
                    data={tarefas}
                    keyExtractor={t => String(t.id)}
                    renderItem={this.renderItem}
                    contentContainerStyle={styles.listContainer}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={this.getTarefas}
                        />
                    }
                />

            </View>
        );
    }

}