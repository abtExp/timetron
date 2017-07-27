const { ipcRenderer } = require('electron');
// remote = electron.remote,
// dialog = remote.dialog;

ipcRenderer.on('set-time',(event,obj)=>{
    createTimer(obj);
    ipcRenderer.send('timer-set');
})

function createTimer(obj){
    dialog.showMessageBox({
        title : 'Received',
        message : `${obj.store.state[0].title}`
    })
    Actions = obj.Actions;
    store = obj.store;
    tmr = Actions.fire(0,'GET_TIMER',obj.id);
    console.log(tmr.title);
}

function deleteTimer(id){
    console.log('deleting');
    ipcRenderer.send('delete-timer',id);
    ipcRenderer.on('closing',()=>{
        Actions.fire(0,'DELETE_TIMER',id);
    })
}