import React, { Component } from 'react';

import {
    FormText, FormFeedback,
    FormGroup, Label, Input
} from 'reactstrap';

export default class InputText extends Component {
    state = {
        valor: '',
        shouldValidate: false
    }

    onChange = (event) => {
        const { value } = event.target;
        this.setState({
            valor: value,
            shouldValidate: true
        })
    }

    validar = () => {
        const { validador } = this.props;
        const { valor, shouldValidate } = this.state;

        if (!shouldValidate) return null;

        if (validador) {
            if (validador(valor))
                return true;
        } else if (valor) {
            return true;
        }

        return false;
    }

    render() {
        const { label, type } = this.props;
        return (
            <FormGroup style={{ paddingLeft: 16, paddingRight: 16 }}>
                <Label>{label} </Label>
                <Input type={type}
                    value={this.state.valor}
                    onChange={this.onChange}
                    valid={this.validar()} />
                <FormFeedback>
                    Informe o {label} no campo acima.
                </FormFeedback>
                <FormText>O valor digitado foi: {this.state.valor}</FormText>
            </FormGroup>
        );
    }
}