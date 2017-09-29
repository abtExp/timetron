const { ipcRenderer, remote } = require('electron');

ipcRenderer.on('set-time', (event, obj) => {
    createTimer(obj);
    ipcRenderer.send('timer-set');
})

function deleteTimer(id) {
    ipcRenderer.send('delete-timer', id);
}

function changeTimerState(id) {
    ipcRenderer.send('pause-timer', id);
}

function updateTimer(id) {
    ipcRenderer.send('update-timer', id);
}