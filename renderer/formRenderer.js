const { ipcRenderer } = require('electron');

function addTimer(obj) {
    ipcRenderer.send('create-timer', obj);
}

// function render(id) {
//     ipcRenderer.send('create-timer', id);
// }

ipcRenderer.on('update-state',(e,o)=>{
    console.log(o);
})

function deleteTimer(id) {
    console.log('deleting');
    ipcRenderer.send('delete-timer', id);
    ipcRenderer.on('closing', () => {
        Actions.fire(0, 'DELETE_TIMER', id);
    })
}