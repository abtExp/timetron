const electron = require('electron'),
ipc = electron.ipcRenderer;

function render(id){
    ipc.send('create-timer',id);
}

function deleteTimer(id){
    console.log('deleting');
    ipc.send('delete-timer',id);
    ipc.on('closing',()=>{
        Actions.fire(0,'DELETE_TIMER',id);
    })
}