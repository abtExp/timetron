const { ipcRenderer, remote } = require('electron'),
LocalStore = require('../store/LocalStore');
let localStore = new LocalStore({});

ipcRenderer.on('set-time', (event, obj) => {
    localStore.state = obj;
    ipcRenderer.send('timer-set');
})

ipcRenderer.on('start-timer',_=>{
    changeTimerState('play-timer');
})

ipcRenderer.on('pause-timer',(e,o)=>{
    changeTimerState('pause-timer');
})

ipcRenderer.on('update-timer',(e,o)=>{
    changeTimerState('update-timer',o);
})

function changeTimerState(action,obj) {
    if(action === 'play-timer') localStore.Run();
    else if(action === 'pause-timer') localStore.Pause();
    else if(action === 'delete-timer') localStore.Delete();
    else if(action === 'update-timer') localStore.Update(obj);
}