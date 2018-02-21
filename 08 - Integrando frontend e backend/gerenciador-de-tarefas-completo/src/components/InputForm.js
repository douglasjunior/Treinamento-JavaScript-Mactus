import React, { Component } from 'react';

import 'rc-calendar/assets/index.css';
import 'rc-time-picker/assets/index.css';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';
import { Form, Input, Icon, Button } from 'antd';
import locale from 'rc-calendar/lib/locale/pt_BR';
import moment from 'moment';

const InputGroup = Input.Group;
const FormItem = Form.Item;

export default class InputForm extends Component {

    state = {
        valid: null,
        opened: false,
        focused: false,
    };

    onChange = (event) => {
        const { validator, onChange, masker } = this.props;
        if (masker) {
            event.target.value = masker(event.target.value);
        }
        if (validator) {
            this.setState({ valid: !!validator(event.target.value) })
        }
        onChange(event);
    }

    onDateChange = (date) => {
        const { validator, id, onChange, dateFormat } = this.props;
        const dateString = date.format(dateFormat);
        if (validator) {
            this.setState({ valid: !!validator(dateString) })
        }
        onChange({
            target: {
                value: dateString,
                id: id,
            }
        });
    }

    focus = () => {
        this.refs.Input.focus();
    }

    blur = () => {
        this.refs.Input.blur();
    }

    onFocus = () => {
        console.log('onFocus')

    }

    onBlur = () => {
        console.log('onBlur')
    }

    onFocusDatePicker = () => {
        console.log('onFocusDatePicker')
        if (this.props.autoOpen) {
            this.setState({ opened: true });
        }
    }

    onBlurDatePicker = () => {
        console.log('onBlurDatePicker')
    }

    onOpenChange = (opened) => {
        console.log('onOpenChange', opened)
        this.setState({ opened });
    }

    onDateSelect = (date) => {
        console.log('onDateSelect', date)
        const { onDateSelect } = this.props;
        if (onDateSelect) {
            onDateSelect(date);
        }
    }

    openDatePicker = () => {
        this.setState({ opened: true });
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

    stringDateToMoment = (stringDate) => {
        const date = moment(stringDate, this.props.dateFormat, true);
        return date && date.isValid() ? date : null;
    }

    render() {
        const { label, id, errorMessage, type, dateFormat, validator, masker, value,
            required, onChange, formItemLayout, onDateSelect, ...others } = this.props;
        const { valid, opened, focused } = this.state;

        let CustomInput;
        if (type === 'date') {
            CustomInput = (
                <div>
                    <InputGroup compact>
                        <Input id={id} value={value}
                            type="text"
                            style={{ width: 150 }}
                            {...others}
                            onChange={this.onChange}
                            onFocus={this.onFocusDatePicker}
                            onBlur={this.onBlurDatePicker}
                            ref="Input" />
                        <Button onClick={this.openDatePicker} type="primary" htmlType="button">
                            <Icon type="calendar" style={{ color: '#fff' }} />
                        </Button>
                    </InputGroup>
                    <DatePicker
                        animation="slide-up"
                        calendar={(
                            <Calendar
                                dateInputPlaceholder="please input"
                                formatter={dateFormat}
                                showDateInput={false}
                                autoFocus={false}
                                onSelect={this.onDateSelect}
                                locale={locale}
                            />
                        )}
                        onChange={this.onDateChange}
                        open={opened}
                        onOpenChange={this.onOpenChange}
                        autoFocus={false}
                        value={this.stringDateToMoment(value)}
                    >
                        {() => <span></span>}
                    </DatePicker>
                </div>
            )
        } else {
            CustomInput = (
                <Input id={id} value={value} type={type}
                    {...others}
                    onChange={this.onChange}
                    onFocus={this.onFocus} onBlur={this.onBlur} ref="Input" />
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
