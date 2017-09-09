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

    componentDidMount(){
        ticker(this.state.timer);
    }

    close(){
        deleteTimer(this.state.timer.id);
    }

    toggle(){
        //make a toggle function to send ipc requests to the main process
        if(this.state.timer.state){
            ticker(this.state.timer);
            changeState(this.state.timer.id);
        }
        else{
            ticker(this.state.timer);
            changeTimerState(this.state.timer.id);
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