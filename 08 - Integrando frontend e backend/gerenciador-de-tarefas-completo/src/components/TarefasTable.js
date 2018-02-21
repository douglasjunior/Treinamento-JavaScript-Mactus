import React, { Component } from 'react';

import moment from 'moment';
import { Table, Button, Switch } from 'antd';

const { Column } = Table;

export default class TarefasTable extends Component {

    render() {
        const { onConcluidaChange, onExcluirClick, onEditarClick } = this.props;

        return (
            <Table rowKey={tarefa => tarefa.id} dataSource={this.props.tarefas} pagination={false} >
                <Column
                    title='#'
                    dataIndex='id'
                    key='id'
                />
                <Column
                    title='Título'
                    dataIndex='titulo'
                    key='titulo'
                />
                <Column
                    title='Criado em'
                    dataIndex='createdAt'
                    key='createdAt'
                    render={(text, tarefa) => (
                        <span>
                            {moment(tarefa.createdAt).format('DD/MM/YYYY')}
                        </span>
                    )}
                />
                <Column
                    title='Concluída'
                    dataIndex='concluida'
                    key='concluida'
                    render={(text, tarefa) => (
                        <Switch checked={tarefa.concluida}
                            onChange={checked => onConcluidaChange(tarefa.id, checked)} />
                    )}
                />
                <Column
                    title='Opções'
                    key='opcoes'
                    render={(text, tarefa) => (
                        <Button.Group size="small">
                            <Button type="ghost" onClick={() => onEditarClick(tarefa.id)}>Editar</Button>
                            <Button type="danger" onClick={() => onExcluirClick(tarefa.id)}>Excluir</Button>
                        </Button.Group>
                    )}
                />
            </Table>
        );
    }
}
