const { ipcRenderer } = require('electron'),
LocalStore = require('../store/LocalStore'),
localStore = [];

function addTimer(obj) {
    ipcRenderer.send('create-timer', obj);
    localStore.push(new LocalStore(obj));
}

ipcRenderer.on('start-timer',(e,o)=>{
    changeTimerState('play-timer',o);
})

ipcRenderer.on('update-timer',(e,o)=>{
    changeTimerState('update-timer',o);
})

function changeTimerState(action,obj) {
    console.log(`Performing action ${action} on timer ${obj}`);
    console.log(localStore[0].state.id);
    let timer = localStore.find(i=>i.state.id===obj.id);
    if(action === 'play-timer') timer.Run();
    else if(action === 'pause-timer') timer.Pause();
    else if(action === 'delete-timer') timer.Delete();
    else if(action === 'update-timer') timer.Update(obj);
}