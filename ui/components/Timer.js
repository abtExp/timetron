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

    // componentDidMount(){

    // }

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
            <div>
            <span id='close_btn'><button onClick={this.close.bind(this)}>close</button></span>
            <div id='timer' onClick={this.toggle.bind(this)}>
            <Title content={this.state.timer.title} /> 
            <Title content={this.state.timer.hrs} />
            <Title content={this.state.timer.mins} />
            <Title content={this.state.timer.secs} />
            </div>
            </div>
        )
    }
}