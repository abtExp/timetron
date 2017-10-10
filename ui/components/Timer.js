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
        localStore.on('update-state',(e,o)=>{
            this.setState({
                timer : o
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
            <div className='timers'>
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