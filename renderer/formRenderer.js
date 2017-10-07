const { ipcRenderer } = require('electron'),
LocalStore = require('../store/LocalStore'),
localStore = [];

function addTimer(obj) {
    ipcRenderer.send('create-timer', obj);
    localStore.push(new LocalStore(obj));
}

ipcRenderer.on('start-timer',(e,o)=>{
    localStore.find(i=>i.state.id === o).Run();
})

ipcRenderer.on('update-timer',(e,o)=>{
    localStore.find(i=>i.state.id === o.id).Update(o);
})

function deleteTimer(id) {
    localStore.find(i=>i.state.id === id).Delete();
}

function changeTimerState(action,id) {
    console.log(`Performing action ${action} on timer ${id}`);
    console.log(localStore[0].state.id);
    let timer = localStore.find(i=>i.state.id===id);
    if(action === 'play-timer') timer.Run();
    else if(action === 'pause-timer') timer.Pause();
    else if(action === 'delete-timer') timer.Delete();
}