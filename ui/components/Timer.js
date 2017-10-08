import React from 'react';

import Title from './Title';

export default class Timer extends React.Component{
    constructor(){
        super();
        this.state = {
            timer : {}
        };
    }

    componentWillMount(){
        this.setState({
            timer : this.props.state
        })
    }

    close(){
        changeTimerState('delete-timer',this.state.timer);
    }

    toggle(){
        //make a toggle function to send ipc requests to the main process
        if(this.state.timer.state){
            ticker(this.state.timer);
            changeTimerState('pause-timer',this.state.timer);
        }
        else{
            ticker(this.state.timer);
            changeTimerState('play-timer',this.state.timer);
        }
    }

    render(){
        return(
            <div class='timers'>
            <span id='close_btn'><div onClick={this.close.bind(this)} id='close'></div></span>
            <div onClick={this.toggle.bind(this)}>
            <Title content={this.state.timer.title} /> 
            <Title content={this.state.timer.hrs} />
            <Title content={this.state.timer.mins} />
            <Title content={this.state.timer.secs} />
            </div>
            </div>
        )
    }
}