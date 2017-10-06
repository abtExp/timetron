const { ipcRenderer, remote } = require('electron'),
LocalStore = require('../store/LocalStore');

let localStore;

ipcRenderer.on('set-time', (event, obj) => {
    localStore = new LocalStore(obj);
    ipcRenderer.send('timer-set');
})

ipcRenderer.on('start-timer',_=>{
    localStore.Run();
})

ipcRenderer.on('update-timer',(e,o)=>{
    localStore.Update(o);
})

function changeTimerState(action) {
    localStore.UpdateGlobalStore(action);
}