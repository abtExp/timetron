import React from 'react';
import ReactDOM from 'react-dom';

import Timer from '../Timer';

class TimerContainer extends React.Component {
    constructor(){
        super();
        this.state = {
            timer : {}
        }
    }

    componentWillMount(){
        this.setState({
            timer : tmr
        })
    }

    render() {
        return ( 
            <Timer state = { this.state.timer }/>
        );
    }
}

const app_container = document.getElementById('timer');
ReactDOM.render( < TimerContainer /> , app_container);