import React, { Component } from 'react';

import { Form, Modal, Button } from 'antd';
import InputForm from './InputForm';

export default class TarefaForm extends Component {

    state = {
        tarefa: {}
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            tarefa: nextProps.tarefa
        })
    }

    onChange = (event) => {
        const { id, value } = event.target;
        const { tarefa } = this.state;
        this.setState({
            tarefa: {
                ...tarefa,
                [id]: value,
            }
        });
    }

    onFormSubmit = (event) => {
        event.preventDefault();

        const { tarefa } = this.state;

        this.props.onSalvar(tarefa);
    }

    render() {
        const { visible, onCancelar } = this.props;
        const { tarefa } = this.state;
        return (
            <Modal
                visible={visible}
                onCancel={onCancelar}
                footer={null}
                title="Tarefa"
            >
                <Form onSubmit={this.onFormSubmit}>
                    <InputForm
                        type="text"
                        id="titulo"
                        ref="titulo"
                        onChange={this.onChange}
                        label="Título"
                        value={tarefa.titulo}
                        errorMessage="Informe o título da tarefa."
                        validator={text => !!text} />

                    <InputForm
                        type="textarea"
                        id="descricao"
                        ref="descricao"
                        onChange={this.onChange}
                        label="Descrição"
                        value={tarefa.descricao} />

                    <Form.Item style={{ textAlign: 'right' }}>
                        <Button htmlType="button" onClick={onCancelar}>
                            Cancelar
                        </Button>
                        {' '}
                        <Button type="primary">
                            Salvar
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}