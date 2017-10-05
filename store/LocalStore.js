const { ipcRenderer } = require('electron');

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

class LocalStore{
    constructor(obj){
        this.state = obj;
        this.UpdateGlobalStore('add-timer');
    }

    Run(){
        this.state.state = true;
        ticker(this);
        this.UpdateGlobalStore('run-timer');
    }

    Pause(){
        this.state.state = false;
        this.UpdateGlobalStore('pause-timer');
    }

    Delete(){
        this.UpdateGlobalStore('delete-timer');
    }

    Update(obj){
        this.state = obj;
    }
    
    UpdateGlobaStore(event){
        ipcRenderer.send(event,this.state);
    }
}