import React from 'react';

import Title from './Title';

export default class Timer extends React.Component {
    constructor() {
        super();
        this.state = {
            timer: {},
            dispatcher:''
        };
    }

    componentWillMount() {
        this.setState({
            timer: this.props.state.state,
            dispatcher:this.props.dispatcher
        })
        this.props.state.on('update-state', (o) => {
            this.setState({
                timer: o
            })
        })
    }

    close() {
        changeTimerState('delete-timer', this.state.timer, this.state.dispatcher);
    }

    toggle() {
        if (this.state.timer.state) {
            changeTimerState('pause-timer', this.state.timer, this.state.dispatcher);
        } else {
            changeTimerState('play-timer', this.state.timer, this.state.dispatcher);
        }
    }

    componentWillUnmount() {
        console.log('Deleting Timer From Node');
    }

    render() {
        return ( 
        <div className = 'timers' id = { `timer${this.state.timer.id}` }>
            <button onClick = { this.close.bind(this) } id = 'close' className='btn'></button>
                <Title className = 'timeD' content = { this.state.timer.title }/>
            <div onClick = { this.toggle.bind(this) } className = 'timeDisp'>
                <Title className = 'timeD' content = { this.state.timer.hrs }/>
                <Title className = 'timeD' content = { this.state.timer.mins }/>
                <Title className = 'timeD' content = { this.state.timer.secs }/>
            </div>
        </div>
        )
    }
}