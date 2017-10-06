function ticker(timer) {
    console.log('Tick-Tock');
    if (timer.state.finished || !timer.state.state) {
        eject(timer);
        return;
    } else {
        timer.state.ticker = setInterval(_ => {
            if (timer.state.mins !== 0 || timer.state.secs !== 0 || timer.state.hrs !== 0) {
                if (timer.state.secs === 0 && timer.state.mins !== 0) {
                    timer.state.secs = 59;
                    timer.state.mins--;
                } else if ((timer.state.mins === 0 && timer.state.secs === 0) && timer.state.hrs !== 0) {
                    timer.state.hrs--;
                    timer.state.mins = 59;
                    timer.state.secs = 59;
                } else {
                    timer.state.secs--;
                }
            } else {
                eject(timer);
                return;
            }
        }, 1000);
        return;
    }
}

function eject(timer){
    timer.state.finished = true;
    timer.state.state = false;
    clearInterval(timer.state.ticker);
    timer.state.ticker = null;
    changeTimerState('pause-timer',timer.state.id);
}