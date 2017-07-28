const electron = require('electron'),
ipc = electron.ipcRenderer,
dialog = electron.remote.dialog;

function render(id){
    console.log(Actions);
    dialog.showMessageBox({
        title : `${Actions.subscribers[0].state[0].title}`
    })
    let obj = {
        id,
        store
    }
    ipc.send('create-timer',obj);
}

function deleteTimer(id){
    console.log('deleting');
    ipc.send('delete-timer',id);
    ipc.on('closing',()=>{
        Actions.fire(0,'DELETE_TIMER',id);
    })
}