module.exports = class Actions{
    static init(){
        Actions.subscribers = [];
    }

    static subscribe(store){
        Actions.subscribers.push(store);
    }

    static fire(store_id,type='', payload={}){
        if(type === 'ADD_TIMER'){
            Actions.subscribers[store_id].Add(payload);  
        } 
        else if(type === 'DELETE_TIMER'){
            Actions.subscribers[store_id].Delete(payload);
        }
        else if(type === 'RUN_TIMER'){
            Actions.subscribers[store_id].Run(payload);
        } 
        else if(type === 'PAUSE_TIMER'){
            Actions.subscribers[store_id].Pause(payload);
        } 
        else if(type === 'GET_ALL'){
            return Actions.subscribers[store_id].GetAll();
        }
        else if(type === 'GET_TIMER'){
            return Actions.subscribers[store_id].Get(payload);
        }
        else if(type === 'GET_COUNT'){
            return Actions.subscribers[store_id].state.length;
        }
        else if(type === 'UPDATE_TIMER'){
            Actions.subscribers[store_id].Update();
        }
    }
}