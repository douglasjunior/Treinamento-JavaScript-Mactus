import React, { Component } from 'react';

export default class Relogio extends Component {

    state = {
        date: new Date()
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({ date: new Date() })
        }, this.getRandomArbitrary(500, 1000))
    }

    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    render() {
        const { date } = this.state;
        return (
            <h1>
                Hora certa: {date.toLocaleTimeString()}
            </h1>
        )
    }
}