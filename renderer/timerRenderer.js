const electron = require('electron'),
    ipc = electron.ipcRenderer,
    dialog = electron.remote.dialog;

ipc.on('set-time', (event, obj) => {
    createTimer(obj);
    ipc.send('timer-set');
})

function createTimer(obj) {
    // Actions = obj.Actions;
    store = obj.store;
    id = obj.id;
    Actions.subscribers = [store];
}

function deleteTimer(id) {
    console.log('deleting');
    ipc.send('delete-timer', id);
    ipc.on('closing', () => {
        Actions.fire(0, 'DELETE_TIMER', id);
    })
}