const { ipcRenderer } = require('electron');
const { EventEmitter } = require('events');
/* Schema : 
    TimerObject = {
        id : unique_id,
        title : 'String',
        hrs : 0-any,
        mins : 0-59,
        secs : 0-59,
        notes : ['if any'],
        state : Boolean,
        finish : Boolean,
        ticker : interval
    }
*/

class LocalStore extends EventEmitter{
    constructor(obj){
        super();
        console.log(`Creating a new Timer instance of ${this}`);
        this.Update(obj);
    }

    Run(){
        console.log('Resuming Timer');
        this.state.state = true;
        ticker(this);
        this.UpdateGlobalStore('update-timer');
    }
    
    Pause(){
        console.log('Pausing Timer');
        this.state.state = false;
        clearInterval(this.state.ticker);
        this.state.ticker = null;
        this.Update(this.state);
        this.UpdateGlobalStore('update-timer');
    }

    Delete(){
        console.log('Deleting Timer');
        clearInterval(this.state.ticker);
        this.removeAllListeners();
        this.UpdateGlobalStore('delete-timer');
    }

    Update(obj){
        console.log('Updating the Timer State');
        this.state = obj;
        this.emit('update-state',this.state);
    }
    
    UpdateGlobalStore(event){
        console.log('Updating the Global Store');
        ipcRenderer.send(event,this.state);
    }
}

module.exports = LocalStore;