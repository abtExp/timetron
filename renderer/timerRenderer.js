const electron = require('electron'),
ipc = electron.ipcRenderer;

ipc.on('set-time',(id)=>{
    createTimer(id);
    ipc.send('timer-set');
})

function deleteTimer(id){
    console.log('deleting');
    ipc.send('delete-timer',id);
    ipc.on('closing',()=>{
        Actions.fire(0,'DELETE_TIMER',id);
    })
}