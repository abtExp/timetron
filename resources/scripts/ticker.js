function ticker(timer) {
    console.log('Tick-Tock');
    if (timer.state.finished || !timer.state.state) {
        eject(timer);
        return;
    } else {
        let ticker = setInterval(_ => {
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
                if (timer.state.finished || !timer.state.state) {
                    clearInterval(timer.state.ticker);
                    timer.state.ticker = null;
                    return;
                }
            } else {
                eject(timer);
                return;
            }
            timer.Update(timer.state);
        }, 1000);
        timer.state.ticker = ticker;
        return;
    }
}

function eject(timer) {
    timer.state.finished = true;
    timer.state.state = false;
    clearInterval(timer.state.ticker);
    timer.state.ticker = null;
    // have to get the dispatcher here as well
    changeTimerState('pause-timer', timer.state);
}