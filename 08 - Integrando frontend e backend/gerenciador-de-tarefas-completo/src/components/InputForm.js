import React, { Component } from 'react';

import { Form, Input, DatePicker } from 'antd';

const FormItem = Form.Item;

export default class InputForm extends Component {

    state = { valid: null };

    onChange = (event) => {
        console.log(event.target.value);
        const { validator, onChange } = this.props;
        onChange(event);
        if (validator) {
            this.setState({ valid: validator(event.target.value) })
        }
    }

    onDateChange = (date, dateString) => {
        console.log(date, dateString)
        const { validator, id, onChange, } = this.props;
        onChange({
            target: {
                value: dateString,
                id: id,
            }
        });
        if (validator) {
            this.setState({ valid: !!validator(dateString) })
        }
    }

    isValid = () => {
        if (!this.props.required)
            return true;

        if (this.state.valid !== null)
            return this.state.valid;

        const { validator, value } = this.props;
        let valid = false;
        if (validator) valid = !!validator(value);
        this.setState({ valid });

        return valid;
    }

    render() {
        const { label, id, errorMessage, type, dateFormat, validator, value, required, onChange, formItemLayout, ...others } = this.props;
        const { valid } = this.state;

        let CustomInput;
        if (type === 'date') {
            CustomInput = (
                <DatePicker id={id} onChange={this.onDateChange} format={dateFormat} />
            )
        } else {
            CustomInput = (
                <Input id={id} valid={valid} value={value} type={type} {...others} onChange={this.onChange} />
            )
        }

        return (
            <FormItem
                validateStatus={valid === null ? null : valid ? "success" : "error"}
                help={valid === false ? errorMessage : null}
                label={label}
                {...formItemLayout}
            >
                {CustomInput}
            </FormItem>
        )
    }
}