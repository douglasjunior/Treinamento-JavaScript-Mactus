import React, { Component } from 'react';
import {
    View, Text,
    FlatList, StyleSheet,
    Alert, Switch, RefreshControl,
    TouchableOpacity, Animated
} from 'react-native';

import axios from 'axios';

import TextInput from '../components/TextInput';
import CardView from '../components/CardView';
import Colors from '../values/Colors';
import Icon from '../components/Icon';

const styles = StyleSheet.create({
    listContainer: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        paddingBottom: 88
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemText: {
        flex: 1
    }
});

export default class TarefasScreen extends Component {

    state = {
        tarefas: [],
        formVisible: false,
        tarefaEdit: {},
        refreshing: false,
        fabBottom: new Animated.Value(24)
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

    onEditarClick = (tarefa) => {
        axios.get(`/tarefas/${tarefa.id}`)
            .then(response => {
                const { data } = response;
                // navegar para TarefaScreen
                const params = {
                    tarefa: data,
                    refresh: this.getTarefas
                };
                this.props.navigation.navigate('Tarefa', params)
            }).catch(ex => {
                console.warn(ex);
            })
    }

    onAddTarefa = () => {
        const params = {
            tarefa: null,
            refresh: this.getTarefas
        };
        this.props.navigation.navigate('Tarefa', params)
    }

    renderItem = (record) => {
        const { item, index } = record;

        return (
            <CardView
                onPress={() => this.onEditarClick(item)}
                onLongPress={() => this.onExcluirClick(item)}
            >
                <View style={styles.itemContainer} >
                    <View style={styles.itemText}>
                        <Text>Tarefa #{item.id}</Text>
                        <Text>{item.titulo}</Text>
                    </View>
                    <Switch
                        value={item.concluida}
                        onValueChange={checked => this.onConcluidaChange(item, checked)}
                    />
                </View>
            </CardView>
        )
    }

    rolarParaBaixo = () => {
        this.scrollDown = true;
        Animated.timing(this.state.fabBottom, {
            toValue: -72,
            duration: 500,
        }).start();
    }

    rolarParaCima = () => {
        this.scrollDown = false;
        Animated.timing(this.state.fabBottom, {
            toValue: 24,
            duration: 500,
        }).start();
    }

    onScroll = (event) => {
        // if (event.nativeEvent.contentOffset.y === 0 && this.scrollDown) {
        //     this.rolarParaCima();
        // } else if (event.nativeEvent.velocity.y > 0 && !this.scrollDown) {
        //     this.rolarParaBaixo();
        // } else if (event.nativeEvent.velocity.y < 0 && this.scrollDown) {
        //     this.rolarParaCima();
        // }
    }

    renderFAB = () => {
        return (
            <Animated.View style={{
                height: 48, width: 48,
                position: 'absolute',
                bottom: this.state.fabBottom,
                right: 24,
                backgroundColor: Colors.primary,
                borderRadius: 24,
                elevation: 4,
            }}>
                <TouchableOpacity onPress={this.onAddTarefa} style={{ flex: 1 }}>
                    <View
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}
                    >
                        <Icon family="MaterialIcons" name="add" color="#fff" size={24} />
                    </View>
                </TouchableOpacity>
            </Animated.View>
        )
    }

    render() {
        const { tarefas, refreshing } = this.state;
        return (
            <View style={{ flex: 1 }}>

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
                    onScroll={this.onScroll}
                />

                {this.renderFAB()}

            </View>
        );
    }

}
