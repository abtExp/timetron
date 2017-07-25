import React from 'react';
import ReactDOM from 'react-dom';

import Timer from '../Timer';

let tmr = {};

function createTimer(id){
    tmr = Actions.fire(0,'GET_TIMER',id);
}

class TimerContainer extends React.Component{
    render(){
        return(
            <Timer state={tmr} />
        );
    }
}

const app_container = document.getElementById('timer');
ReactDOM.render(<TimerContainer />,app_container);