const { EventEmitter } = require('events');

class LocalTimerStore extends EventEmitter{
    constructor(){
        super();
        this.timers = [];
    }

    Add(timerStoreObject){
        this.timers.push(timerStoreObject);
        timerStoreObject.UpdateGlobalStore('add-timer');        
        this.Update();
    }

    Delete(timerStoreObject){
        this.timers = this.timers.filter(i=>i.state.id === timerStoreObject.state.id);
        timerStoreObject.Delete();
        this.Update();
    }

    Update(timerStoreObject,e){
        this.emit('update-state',this.timers);
    }
}

module.exports = LocalTimerStore;