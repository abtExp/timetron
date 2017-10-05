import React from 'react';
import ReactDOM from 'react-dom';

import Timer from '../Timer';

class TimerContainer extends React.Component {
    render() {
        return ( 
            <Timer state = { tmr }/>
        );
    }
}

const app_container = document.getElementById('timer');
ReactDOM.render( < TimerContainer /> , app_container);