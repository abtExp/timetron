function ticker(timer) {
    if (timer.finished || !timer.state) {
        eject(timer);
        return;
    } else {
        timer.ticker = setInterval(_ => {
            if (timer.mins !== 0 || timer.secs !== 0 || timer.hrs !== 0) {
                if (timer.secs === 0 && timer.mins !== 0) {
                    timer.secs = 59;
                    timer.mins--;
                } else if ((timer.mins === 0 && timer.secs === 0) && timer.hrs !== 0) {
                    timer.hrs--;
                    timer.mins = 59;
                    timer.secs = 59;
                } else {
                    timer.secs--;
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
    timer.finished = true;
    timer.state = false;
    clearInterval(timer.ticker);
    timer.ticker = null;
    changeTimerState('pause-timer',timer.id);
}