import React, { Component } from 'react';

import { Form, Input } from 'antd';

const FormItem = Form.Item;

export default class InputForm extends Component {

    state = {
        valid: null
    }

    onChange = (event) => {
        const { value } = event.target;

        this.setState({
            valid: this.props.validator(value)
        });

        this.props.onChange(event);
    }

    render() {
        const { valid } = this.state;
        const { id, label, errorMessage } = this.props;
        const help = valid === false ? errorMessage : '';
        const validateStatus = valid === false ? 'error' : 'success';
        return (
            <FormItem
                validateStatus={validateStatus}
                label={label}
                help={help}
            >
                <Input id={id} onChange={this.onChange} />
            </FormItem>
        );
    }
}