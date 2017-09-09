const EventEmitter = require('events').EventEmitter;
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

module.exports = class TimerStore extends EventEmitter {
    constructor() {
        super();
        this.state = [];
    }

    Add(obj) {
        this.state = [...this.state, obj];
        this.UpdateAll();
    }

    Delete(id) {
        this.state = this.state.filter(i => i.id !== id);
        this.UpdateAll();
    }

    Run(id) {
        let timer = this.state.find(i => i.id === id);
        //run decrease the timer
        timer.state = true;
        this.Update(id);
    }

    Pause(id) {
        let timer = this.state.find(i => i.id === id);
        timer.state = false;
        this.Update(id);
    }

    Get(id) {
        return this.state.find(i => i.id === id)
    }

    GetAll() {
        return this.state;
    }

    Update(id) {
        console.log("STORE UPDATED");
        let timer = this.state.find(i => i.id === id);
        this.emit('UPDATE', timer);
        this.UpdateAll();
    }

    UpdateAll() {
        this.emit('UPDATE_ALL', this.state);
    }
}