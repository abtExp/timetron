const { EventEmitter } = require('events');
module.exports = class TimerStore extends EventEmitter {
    constructor() {
        super();
        this.state = [];
    }

    Add(obj) {
        this.state = [...this.state, obj];
    }

    Delete(obj) {
        this.state = this.state.filter(i => i.id !== obj.id);
    }

    Get(id) {
        return this.state.find(i => i.id === id)
    }

    GetAll() {
        return this.state;
    }

    Update(e,obj,dispatcher) {
        let timer = this.state.find(i => i.id === obj.id);
        this.state[this.state.indexOf(timer)] = obj;
        this.emit('UPDATE', e,obj,dispatcher);
    }

    UpdateAll() {
        this.state.map(i=>this.Update(i));
    }
}