const { ipcRenderer } = require('electron'),
LocalStore = require('../store/LocalStore'),
localStore = [];

function addTimer(obj) {
    ipcRenderer.send('create-timer', obj);
    localStore.push(new LocalStore(obj));
}

ipcRenderer.on('start-timer',(e,o)=>{
    localStore.find(i=>i.state.id === o.id).Run();
})

ipcRenderer.on('update-timer',(e,o)=>{
    localStore.find(i=>i.state.id === o.id).Update(o);
})

function deleteTimer(id) {
    localStore.find(i=>i.state.id === id).Delete();
}

function changeTimerState(action,id) {
    localStore.find(i=>i.state.id===id).UpdateGlobalStore(action);
}