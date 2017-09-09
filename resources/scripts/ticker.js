function ticker(timer){
    if(timer.finished || !timer.state){
        clearInterval(timer.ticker);
        timer.ticker = null;
        // store.Update();
        changeTimerState(timer.id);
        return;
    }
    else{
        timer.ticker = setInterval(_=>{
            if(timer.mins !== 0 || timer.secs !== 0 || timer.hrs !== 0){
            if(timer.secs === 0 && timer.mins !== 0){
                timer.secs = 59;
                timer.mins--;
            }
            else if((timer.mins === 0 && timer.secs === 0) && timer.hrs !== 0){
                timer.hrs--;
                timer.mins = 59;
                timer.secs = 59;
            }
            else{
                timer.secs--;
            }
        }
        else{
            timer.finished = true;
            timer.state = false;
            return;
        }
        // store.Update();
        changeTimerState(timer.id);
        },1000);
        return;
    }
}