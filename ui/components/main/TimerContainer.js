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
        console.log('mounting');
        console.log(localStore);
        this.setState({
            timer : localStore.state
        })
    }

    componentDidMount(){
        localStore.on('update-state',(e,o)=>{
            this.setState({
                timer : o
            })
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