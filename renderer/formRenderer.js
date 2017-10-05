const { ipcRenderer } = require('electron'),
localStore = [];

function addTimer(obj) {
    ipcRenderer.send('create-timer', obj);
    localStore.push(new LocalStore(obj));
}

ipcRenderer.on('start-timer',(e,o)=>{
    localStore.find(i=>i.id === o.id).Run();
})

ipcRenderer.on('update-timer',(e,o)=>{
    //Update The State for the component
    localStore.find(i=>i.id === o.id).Update(o);
})

function deleteTimer(id) {
    localStore.find(i=>i.id === id).Delete();
}

function changeTimerState(action,id) {
    localStore.find(i=>i.id===id).UpdateGlobalStore(action);
}