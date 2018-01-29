const { ipcRenderer, remote } = require('electron'),
LocalStore = require('../store/LocalStore');

const localStore = new LocalStore({});

ipcRenderer.on('set-time', (event, obj) => {
    localStore.state = obj;
    ipcRenderer.send('timer-set',obj.id);
})

ipcRenderer.on('start-timer', _ => {
    changeTimerState('play-timer', 'form');
})

ipcRenderer.on('pause-timer', (e, o) => {
    changeTimerState('pause-timer', 'form');
})

ipcRenderer.on('update-timer', (e, o) => {
    changeTimerState('update-timer', o, 'form');
})

function changeTimerState(action, obj, dispatcher, self='timer') {
    if (action === 'play-timer') localStore.Run(self,dispatcher);
    else if (action === 'pause-timer') localStore.Pause(self,dispatcher);
    else if (action === 'delete-timer') localStore.Delete(self,dispatcher);
    else if (action === 'update-timer') localStore.Update(obj,self,dispatcher);
}