const { EventEmitter } = require('events');

class LocalTimerStore extends EventEmitter{
    constructor(){
        super();
        this.timers = [];
    }

    Add(timerStoreObject){
        this.timers.push(timerStoreObject);
        this.Update(timerStoreObject,'add-timer');
    }

    Delete(timerStoreObject){
        this.timers = this.timers.filter(i=>i.state.id === timerStoreObject.state.id);
        this.Update(timerStoreObject,'delete-timer');
    }

    Update(timerStoreObject,event){
        console.log(event);
        this.emit('update-state',this.timers);
        timerStoreObject.UpdateGlobalStore(event);
    }
}

module.exports = LocalTimerStore;