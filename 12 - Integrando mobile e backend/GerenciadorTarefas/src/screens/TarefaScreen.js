import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import axios from 'axios';
import { NavigationActions } from 'react-navigation';

import Button from '../components/Button';
import TextInput from '../components/TextInput';
import StatusBar from '../components/StatusBar';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    button: {
        marginTop: 8
    },
    buttonContainer: {
        marginLeft: 0,
        marginRight: 0,
    }
});

export default class TarefaScreen extends Component {

    state = {};

    constructor(props) {
        super(props);

        if (props.navigation.state.params) {
            this.state = {
                ...props.navigation.state.params.tarefa
            };
        }
    }

    onFormSalvar = () => {
        const tarefa = this.state;
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
            this.props.navigation.goBack(null);
            this.props.navigation.state.params.refresh();
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
            this.props.navigation.goBack(null);
            this.props.navigation.state.params.refresh();
        }).catch(ex => {
            console.warn(ex);
        })
    }

    onChange = (id, value) => {
        this.setState({
            [id]: value,
        });
    }

    render() {
        const { titulo, descricao } = this.state;
        return (
            <View style={styles.container}>
                <StatusBar />

                <TextInput
                    id="titulo"
                    ref="titulo"
                    label="Título"
                    value={titulo}
                    validator={n => Boolean(n)}
                    required
                    errorMessage="Informe o título da tarefa."
                    onChange={this.onChange}
                />

                <TextInput
                    id="descricao"
                    ref="descricao"
                    label="Descrição"
                    value={descricao}
                    onChange={this.onChange}
                />

                <Button
                    title="Salvar"
                    onPress={this.onFormSalvar}
                    buttonStyle={styles.button}
                    containerViewStyle={styles.buttonContainer}
                />

            </View>
        );
    }

}