import React, { Component } from 'react';

// import {
//     Modal,
//     ModalHeader,
//     ModalBody,
//     ModalFooter,
//     Button,
//     Form
// } from 'reactstrap';

import { Modal } from 'antd';

import InputForm from './InputForm';
import { checkFormIsValid } from '../utils/Validator';

const TAREFA = { id: '', titulo: '', descricao: '' };

export default class TarefaForm extends Component {

    state = { tarefa: { ...TAREFA } };

    componentWillReceiveProps(nextProps) {
        if (nextProps.showForm && nextProps.tarefa !== this.props.tarefa) {
            this.setState({ tarefa: nextProps.tarefa });
        }
        if (!nextProps.showForm) {
            this.setState({ tarefa: { ...TAREFA } });
        }
    }

    onSubmitForm = (event) => {
        if (checkFormIsValid(this.refs)) {
            this.props.onSalvarTarefa(this.state.tarefa);
        }
    }

    onInputChange = (event) => {
        const { id, value } = event.target;
        this.setState({
            tarefa: {
                ...this.state.tarefa,
                [id]: value
            }
        });
    }

    render() {
        const { showForm, onFecharForm } = this.props;
        const { tarefa: { id, titulo, descricao }, } = this.state;
        return (
            <Modal
                visible={showForm}
                onOk={this.onSubmitForm}
                onCancel={onFecharForm}
                className={this.props.className}
                title={`Tarefa`}
            >

                {id ? (
                    <InputForm label="#" id="id" ref="id" value={id} disabled={true} />
                ) : null}

                <InputForm label="Título" id="titulo" ref="titulo" value={titulo}
                    onChange={this.onInputChange} required
                    validator={value => !!value && value.length <= 200}
                    errorMessage="O título é obrigatório e deve ter menos de 200 caracteres." />

                <InputForm type="textarea" label="Descrição" id="descricao" ref="descricao"
                    value={descricao} onChange={this.onInputChange} />

            </Modal>
        )
    }
}
