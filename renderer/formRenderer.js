const { ipcRenderer } = require('electron'),
LocalStore = require('../store/LocalStore'),
LocalTimerStore = require( '../store/LocalTimerStore');

const localStore = new LocalTimerStore();

function addTimer(obj) {
    ipcRenderer.send('create-timer', obj);
    let timer = new LocalStore(obj);
    localStore.Add(timer);
}

ipcRenderer.on('start-timer', (e, o) => {
    changeTimerState('play-timer', o, 'timer');
})

ipcRenderer.on('pause-timer', (e, o) => {
    changeTimerState('pause-timer', o, 'timer');
})

ipcRenderer.on('update-timer', (e, o) => {
    changeTimerState('update-timer', o, 'timer');
})

ipcRenderer.on('delete-timer', (e, o) => {
    changeTimerState('delete-timer', o)
})

function changeTimerState(action, obj, dispatcher, self = 'form') {
    let timer = localStore.timers.find(i => i.state.id === obj.id);
    if (action === 'play-timer') timer.Run(self,dispatcher);
    else if (action === 'pause-timer') timer.Pause(self,dispatcher);
    else if (action === 'delete-timer') localStore.Delete(timer);
    else if (action === 'update-timer') timer.Update(o,self,dispatcher);
}