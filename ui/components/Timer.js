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
        const hrs = this.state.timer.hrs >= 10 ? this.state.timer.hrs : `0${this.state.timer.hrs}`,
            mins = this.state.timer.mins >= 10 ? this.state.timer.mins : `0${this.state.timer.mins}`,
            secs = this.state.timer.secs >= 10 ? this.state.timer.secs : `0${this.state.timer.secs}`;
        return ( 
        <div className = 'timers' id = { `timer${this.state.timer.id}` }>
            <button onClick = { this.close.bind(this) } id = 'close' className='btn'></button>
            <button onClick = { this.close.bind(this) } id = 'delete' className='btn'></button>
                <Title className = 'timeD' content = { this.state.timer.title }/>
            <div onClick = { this.toggle.bind(this) } className = 'timeDisp'>
                <Title className = 'timeD' content = { hrs }/><span className='separator'>:</span>
                <Title className = 'timeD' content = { mins }/><span className='separator'>:</span>
                <Title className = 'timeD' content = { secs }/>
            </div>
        </div>
        )
    }
}