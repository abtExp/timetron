const { ipcRenderer } = require('electron');
const { EventEmitter } = require('events');

class LocalStore extends EventEmitter {
    constructor(obj) {
        super();
        this.state = obj;
    }

    Run(self,dispatcher) {
        this.state.state = true;
        clearInterval(this.state.ticker);
        ticker(this);
        this.Update();
        if(self === dispatcher) this.UpdateGlobalStore('play-timer', dispatcher);
    }

    Pause(self, dispatcher) {
        clearInterval(this.state.ticker);
        this.state.state = false;
        this.Update();
        if(self === dispatcher) this.UpdateGlobalStore('pause-timer', dispatcher);
    }

    Delete(self, dispatcher) {
        clearInterval(this.state.ticker);
        this.removeAllListeners();
        this.UpdateGlobalStore('delete-timer', dispatcher);
        this.state = {};
    }

    Update() {
        this.emit('update-state', this.state);
    }

    UpdateGlobalStore(e, dispatcher = 'timer') {
        console.log('Updating the Global Store');
        ipcRenderer.send(e, this.state, dispatcher);
    }
}

module.exports = LocalStore;