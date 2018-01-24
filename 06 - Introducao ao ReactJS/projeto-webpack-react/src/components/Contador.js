import React, { Component } from 'react';

import { Button } from 'reactstrap';

export default class Contador extends Component {

    constructor(props) {
        super(props);

        this.state = {
            count: props.valorInicial || 0
        }
    }

    incrementar = () => {
        this.setState({
            count: this.state.count + 1
        })
    }

    decrementar = () => {
        this.setState({
            count: this.state.count - 1
        })
    }

    render() {
        return (
            <div>
                <p>{this.state.count}</p>
                <Button color="danger" onClick={this.decrementar}>-</Button>
                <Button color="success" onClick={this.incrementar}>+</Button>
            </div>
        );
    }
}