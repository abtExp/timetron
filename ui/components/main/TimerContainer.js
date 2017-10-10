import React from 'react';
import ReactDOM from 'react-dom';

import Timer from '../Timer';

class TimerContainer extends React.Component {
    constructor(){
        super();
        this.state = {
            timer : {
                id : 'unique_id',
                title : 'timer',
                hrs : 0,
                mins : 0,
                secs : 0,
                notes : 'if any',
                state : false,
                finish : false,
                ticker : null
            }
        }
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