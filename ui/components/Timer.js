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
            timer : this.props.state.state
        })
        this.props.state.on('update-state',(o)=>{
            this.setState({
                timer:o
            })
        })
    }

    close(){
        changeTimerState('delete-timer',this.state.timer);
    }

    toggle(){
        if(this.state.timer.state){
            changeTimerState('pause-timer',this.state.timer);
        }
        else{
            changeTimerState('play-timer',this.state.timer);
        }
    }

    componentWillUnmount(){
        console.log('Deleting Timer From Node');
    }

    render(){
        return(
            <div className='timers' id={`timer${this.state.timer.id}`}>
            <span id='close_btn'><button onClick={this.close.bind(this)} id='close'>Delete Timer</button></span>
            <div onClick={this.toggle.bind(this)} className='timeDisp'>
            <Title className='timeD' content={this.state.timer.title} />
            <Title className='timeD' content={this.state.timer.hrs} />
            <Title className='timeD' content={this.state.timer.mins} />
            <Title className='timeD' content={this.state.timer.secs} />
            </div>
            </div>
        )
    }
}