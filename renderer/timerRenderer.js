const { ipcRenderer, remote } = require('electron'),
LocalStore = require('../store/LocalStore');

let localStore;

ipcRenderer.on('set-time', (event, obj) => {
    createTimer(obj);
    localStore = new LocalStore(obj);
})

ipcRenderer.on('start-timer',(e,o)=>{
    localStore.Run();
})

function changeTimerState(action) {
    localStore.UpdateGlobalStore(action);
}