import React from 'react';
import ReactDOM from 'react-dom';

import Timer from '../Timer';

let tmr;

class TimerContainer extends React.Component {
    componentWillMount() {
        tmr = Actions.fire(0, 'GET_TIMER', id);
    }

    render() {
        return ( 
            <Timer state = { tmr }/>
        );
    }
}

const app_container = document.getElementById('timer');
ReactDOM.render( < TimerContainer / > , app_container);