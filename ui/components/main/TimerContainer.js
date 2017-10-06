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

    componentDidMount(){
        console.log('mounting');
        console.log(localStore);
        this.setState({
            timer : localStore.state
        })
    }

    render() {
        return ( 
            <Timer state = { this.state.timer } key={this.state.timer.id}/>
        );
    }
}

const app_container = document.getElementById('timer');
ReactDOM.render( < TimerContainer /> , app_container);