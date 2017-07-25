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
        if(this.state.timer.state){
            Actions.fire(0,'PAUSE_TIMER',this.state.timer.id);
            ticker(this.state.timer);
        }
        else{
            Actions.fire(0,'RUN_TIMER',this.state.timer.id);
            ticker(this.state.timer);
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