const { ipcRenderer } = require('electron'),
LocalStore = require('../store/LocalStore'),
LocalTimerStore = require('../store/LocalTimerStore');
localStore = new LocalTimerStore();

function addTimer(obj) {
    ipcRenderer.send('create-timer', obj);
    let timer = new LocalStore(obj);
    localStore.Add(timer);
}

ipcRenderer.on('start-timer',(e,o)=>{
    changeTimerState('play-timer',o);
})

ipcRenderer.on('update-timer',(e,o)=>{
    changeTimerState('update-timer',o);
})

function changeTimerState(action,obj) {
    console.log(`Performing action ${action} on timer ${obj}`);
    let timer = localStore.timers.find(i=>i.state.id===obj.id);
    if(action === 'play-timer') timer.Run();
    else if(action === 'pause-timer') timer.Pause();
    else if(action === 'delete-timer') localStore.Delete(timer);
    else if(action === 'update-timer') timer.Update(obj);
}