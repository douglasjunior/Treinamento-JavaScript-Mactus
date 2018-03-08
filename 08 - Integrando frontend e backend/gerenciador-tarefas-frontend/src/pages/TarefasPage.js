import React, { PureComponent } from 'react';

import moment from 'moment';
import axios from 'axios';
import { Table, Switch, Button, Modal } from 'antd';

import TarefaForm from '../components/TarefaForm';

const { Column } = Table;

export default class TarefasPage extends PureComponent {

    state = {
        tarefas: [],
        formVisible: false,
        tarefaEdit: {}
    }

    componentDidMount() {
        this.getTarefas();
    }

    getTarefas = () => {
        axios.get('/tarefas')
            .then(response => {
                const { data } = response;
                this.setState({
                    tarefas: data
                })
            }).catch(ex => {
                console.warn(ex);
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
        Modal.confirm({
            title: `Deseja excluir a tarefa #${tarefa.id}?`,
            okText: 'Sim',
            onOk: () => this.excluirTarefa(tarefa),
            cancelText: 'Não',
            maskClosable: true
        })
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
        this.setState({
            formVisible: true,
            tarefaEdit: {}
        })
    }

    onEditarClick = (tarefa) => {
        this.setState({
            formVisible: true,
            tarefaEdit: tarefa
        })
    }

    onFormCancelar = () => {
        this.setState({
            formVisible: false,
        })
    }

    onFormSalvar = (tarefa) => {
        if (tarefa.id) {
            // editando
        } else {
            // cadastrando
        }
        this.setState({
            formVisible: false,
        })
    }

    render() {
        const { tarefas, formVisible, tarefaEdit } = this.state;
        return (
            <div>
                <Button icon="plus" type="primary"
                    onClick={this.onAdicionarClick}
                >
                    Adicionar tarefa
                </Button>
                <TarefaForm
                    visible={formVisible}
                    onCancelar={this.onFormCancelar}
                    onSalvar={this.onFormSalvar}
                    tarefa={tarefaEdit} />
                <br />
                <Table
                    dataSource={tarefas}
                    rowKey={tarefa => tarefa.id} >
                    <Column
                        key="id"
                        title="#"
                        dataIndex="id"
                        render={(text) => (
                            <strong>{text}</strong>
                        )}
                    />
                    <Column
                        key="titulo"
                        title="Título"
                        dataIndex="titulo"
                    />
                    <Column
                        key="createdAt"
                        title="Data"
                        dataIndex="createdAt"
                        render={(text) => moment(text).format('DD/MM/YYYY [às] HH:mm')}
                    />
                    <Column
                        key="concluida"
                        title="Concluída"
                        dataIndex="concluida"
                        render={(text, tarefa) => (
                            <Switch checked={text} onChange={(checked) => this.onConcluidaChange(tarefa, checked)} />
                        )}
                    />
                    <Column
                        key="acoes"
                        title="Ações"
                        render={(text, tarefa) => (
                            <Button.Group size="small">
                                <Button icon="edit"
                                    onClick={() => this.onEditarClick(tarefa)}
                                >Editar</Button>
                                <Button type="danger" icon="delete"
                                    onClick={() => this.onExcluirClick(tarefa)}
                                >
                                    Excluir
                                </Button>
                            </Button.Group>
                        )}
                    />
                </Table>
            </div>
        );
    }
}