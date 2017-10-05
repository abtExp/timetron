const { ipcRenderer } = require('electron');

function addTimer(obj) {
    ipcRenderer.send('create-timer', obj);
}

// function render(id) {
//     ipcRenderer.send('create-timer', id);
// }

ipcRenderer.on('start-timer',(e,o)=>{
    ticker(o);
})

ipcRenderer.on('update-state',(e,o)=>{
    console.log(o);
})

function deleteTimer(id) {
    ipcRenderer.send('delete-timer', id);
}

function changeTimerState(action,id) {
    ipcRenderer.send(action, id);
}