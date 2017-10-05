const { ipcRenderer, remote } = require('electron');

ipcRenderer.on('set-time', (event, obj) => {
    createTimer(obj);
    if(tmr.title) ipcRenderer.send('timer-set');
    else ipcRenderer.send('abort');
})

ipcRenderer.on('start-timer',(e,o)=>{
    ticker(o);
})

function deleteTimer(id) {
    ipcRenderer.send('delete-timer', id);
}

function changeTimerState(action,id) {
    ipcRenderer.send(action, id);
}

function updateTimer(id) {
    ipcRenderer.send('update-timer', id);
}