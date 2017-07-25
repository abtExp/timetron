const EventEmitter = require('events').EventEmitter,
Actions = require('../actions/Actions');
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

module.exports = class TimerStore extends EventEmitter{
    constructor(){
        super();
        this.state = [];
    }

    register(){
        console.log('Registering to actions...');
        Actions.subscribe(this);
    }

    Add(obj){
        this.state = [...this.state,obj];
        this.Update();
    }

    Delete(id){
        this.state = this.state.filter(i=>i.id !== id);
        this.Update();
    }

    Run(id){
        let timer = this.state.find(i=>i.id === id);
        //run decrease the timer
        timer.state = true;
        this.Update();
    }

    Pause(id){
        let timer = this.state.find(i=>i.id === id);
        timer.state = false;
        this.Update();
    }

    Get(id){
        return this.state.find(i=>i.id === id)
    }

    GetAll(){
        return this.state;
    }

    Update(){
        console.log("STORE UPDATED");
        this.emit('UPDATE',this.state);
    }
}
