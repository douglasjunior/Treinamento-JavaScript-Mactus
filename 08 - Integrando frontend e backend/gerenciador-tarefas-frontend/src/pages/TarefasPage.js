import React, { Component } from 'react';

import moment from 'moment';
import axios from 'axios';
import { Table, Switch, Button } from 'antd';

const { Column } = Table;

export default class TarefasPage extends Component {

    state = {
        tarefas: []
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

    render() {
        const { tarefas } = this.state;
        return (
            <div>
                <Table dataSource={tarefas} >
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
                        render={(text) => (
                            <Switch checked={text} />
                        )}
                    />
                    <Column
                        key="acoes"
                        title="Ações"
                        render={() => (
                            <Button.Group size="small">
                                <Button icon="edit">Editar</Button>
                                <Button type="danger" icon="delete">Excluir</Button>
                            </Button.Group>
                        )}
                    />
                </Table>
            </div>
        );
    }
}