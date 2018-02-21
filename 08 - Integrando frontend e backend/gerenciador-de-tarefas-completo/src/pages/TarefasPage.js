import React, { Component } from 'react';

import { Input, Button, Row, Col } from 'antd';
import axios from 'axios';

import TarefasTable from '../components/TarefasTable';
import TarefaForm from '../components/TarefaForm';

const { Search } = Input;

export default class TarefasPage extends Component {

    state = { tarefas: [], showForm: false, tarefaSelecionada: null };

    componentDidMount() {
        this.getTarefas();
    }

    getTarefas = (busca = '') => {
        axios.get('/tarefas', {
            params: {
                titulo: busca
            }
        }).then(response => {
            this.setState({
                tarefas: response.data
            })
        }).catch(ex => {
            console.error(ex, ex.response);
        })
    }

    onConcluidaChange = (tarefaId, concluida) => {
        let axiosMethod;
        if (concluida) {
            axiosMethod = axios.put('/tarefas/concluida/' + tarefaId);
        } else {
            axiosMethod = axios.delete('/tarefas/concluida/' + tarefaId);
        }
        axiosMethod.then(response => {
            if (response.status === 204) {
                const tarefas = this.state.tarefas;
                const tarefa = tarefas.find(tarefa => tarefa.id === tarefaId);
                tarefa.concluida = concluida;
                this.setState({ tarefas });
            }
        }).catch(ex => {
            console.error(ex, ex.response);
        })
    }

    onEditarClick = (tarefaId) => {
        axios.get('/tarefas/' + tarefaId)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        tarefaSelecionada: response.data,
                        showForm: true
                    });
                }
            }).catch(ex => {
                console.error(ex, ex.response);
            })
    }

    onExcluirClick = (tarefaId) => {
        if (window.confirm(`Deseja excluir a tarefa ${tarefaId}?`)) {
            axios.delete('/tarefas/' + tarefaId)
                .then(response => {
                    if (response.status === 204) {
                        const tarefas = this.state.tarefas;
                        const index = tarefas.findIndex(tarefa => tarefa.id === tarefaId);
                        tarefas.splice(index, 1);
                        this.setState({ tarefas });
                    }
                }).catch(ex => {
                    console.error(ex, ex.response);
                })
        }
    }

    onSalvarTarefa = (tarefa) => {
        let axiosMethod;
        if (tarefa.id) {
            axiosMethod = axios.put('/tarefas/' + tarefa.id, tarefa);
        } else {
            axiosMethod = axios.post('/tarefas', tarefa);
        }
        axiosMethod.then(response => {
            if (response.status === 201) {
                const tarefas = this.state.tarefas;
                tarefas.unshift(response.data)
                this.setState({ tarefas });
            } else if (response.status === 200) {
                const tarefas = this.state.tarefas;
                const index = tarefas.findIndex(t => t.id === tarefa.id);
                tarefas.splice(index, 1, response.data);
                this.setState({ tarefas });
            }
            this.closeForm();
        }).catch(ex => {
            console.error(ex, ex.response);
            this.closeForm();
        })
    }

    onNovaTarefaClick = () => {
        this.setState({ showForm: true, })
    }

    closeForm = () => {
        this.setState({ showForm: false, tarefaSelecionada: null })
    }

    onBuscaChange = (event) => {
        clearTimeout(this.buscaTimeout);
        const value = event.target.value;
        this.buscaTimeout = setTimeout(() => {
            this.getTarefas(value);
        }, 500);
    }

    onBuscaClick = (value) => {
        this.getTarefas(value)
    }

    render() {
        const { tarefas, showForm, tarefaSelecionada } = this.state;
        return (
            <div>
                <h2>Tarefas</h2>

                <Row>
                    <Col lg={8} xl={12}>
                        <Button size="large"
                            onClick={this.onNovaTarefaClick}
                            style={{
                                backgroundColor: '#060',
                                color: '#fff'
                            }}
                        >
                            Nova tarefa
                        </Button>
                    </Col>
                    <Col lg={16} xl={12}>
                        <Search placeholder="Pesquisar tarefa" enterButton="Buscar" size="large"
                            onChange={this.onBuscaChange}
                            onSearch={this.onBuscaClick} />
                    </Col>
                </Row>

                <br /><br />

                <TarefasTable tarefas={tarefas}
                    onConcluidaChange={this.onConcluidaChange}
                    onExcluirClick={this.onExcluirClick}
                    onEditarClick={this.onEditarClick} />

                <TarefaForm showForm={showForm} tarefa={tarefaSelecionada} onFecharForm={this.closeForm} onSalvarTarefa={this.onSalvarTarefa} />
            </div>
        )
    }
}
