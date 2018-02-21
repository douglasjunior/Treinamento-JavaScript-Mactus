import React, { Component } from 'react';

import { Form, Input, DatePicker } from 'antd';

const FormItem = Form.Item;

export default class InputForm extends Component {

    state = {
        valid: null
    }

    onChange = (event) => {
        const { masker } = this.props;

        if (masker) {
            event.target.value = masker(event.target.value);
        }

        const { value } = event.target;

        this.setState({
            valid: this.props.validator(value)
        });

        this.props.onChange(event);
    }

    isValid = () => {
        const { value, validator } = this.props;

        const valid = validator(value);

        this.setState({ valid });

        return valid;
    }

    onDateChange = (event, stringDate) => {
        this.setState({
            valid: this.props.validator(stringDate)
        });

        this.props.onChange({
            target: {
                value: stringDate,
                id: this.props.id,
            }
        });
    }

    render() {
        const { valid } = this.state;
        const { id, label, errorMessage, type, dateFormat } = this.props;
        const help = valid === false ? errorMessage : '';
        const validateStatus = valid === false ? 'error' : 'success';

        let input = null;
        if (type === 'date') {
            input = (
                <DatePicker id={id}
                    format={dateFormat}
                    onChange={this.onDateChange} />
            );
        } else {
            input = (
                <Input id={id} type={type} onChange={this.onChange} />
            );
        }

        return (
            <FormItem
                validateStatus={validateStatus}
                label={label}
                help={help}
            >
                {input}
            </FormItem>
        );
    }
}