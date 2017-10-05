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
        this.Update(obj);
    }

    Delete(id) {
        this.state = this.state.filter(i => i.id !== id);
        this.Update(id);
    }

    Run(id) {
        let timer = this.state.find(i => i.id === id);
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

    Update(param) {
        if(typeof param === 'Number') let timer = this.state.find(i => i.id === param);
        else timer = param;
        this.emit('UPDATE', timer);
    }

    UpdateAll() {
        this.emit('UPDATE_ALL', this.state);
        this.state.map(i=>this.Update(i.id));
    }
}