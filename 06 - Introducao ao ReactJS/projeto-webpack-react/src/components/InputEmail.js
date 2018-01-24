import React, { Component } from 'react';

import InputText from './InputText';
import { validarEmail } from '../utils/Validadores';

export default class InputEmail extends Component {
    render() {
        return (
            <InputText type="email" validador={validarEmail} {...this.props} />
        );
    }
}