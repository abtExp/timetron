const electron = require('electron'),
    { app, BrowserWindow, dialog, ipcMain, autoUpdater } = electron,
    TimerStore = require('./store/TimerStore'),
    path = require('path'),
    fs = require('fs'),
    autoLaunch = require('auto-launch'),
    Actions = require('./actions/Actions'),
    store = new TimerStore();


/* Update and other stuff goes here  ***************************
 *       ______  _____           _____     _____    ************
 ****   /#####/ /#####\   _____  |####\   /#####\   ************
 ****     |#|  |##| |##| |_____| |#|_|#| |##| |##|  ************
 ****     |#|   \#####/          |####/   \#####/   ************
 ***************************************************************/

// The Dashboard Window
let mainWindow;

// The App start procedures 
app.on('ready', _ => {
    Actions.init();
    Actions.subscribe(store);

    const screen = electron.screen;
    let device_width = screen.getPrimaryDisplay().workAreaSize.width,
        device_height = screen.getPrimaryDisplay().workAreaSize.height;

    mainWindow = new BrowserWindow({
        width: 500,
        height: 600,
        x: device_width,
        y: device_height,
        resizable: true,
        fullscreenable: false,
        movable: false,
        // frame: false,
    });
    mainWindow.loadURL(path.join('file:///', __dirname, './ui/index.html'));
    mainWindow.show();

    // Event Listeners for update of timer states
    store.on('UPDATE', (e, param, dispatcher) => {
        if (dispatcher === 'timer') {
            mainWindow.webContents.send(e, param,dispatcher);
        } else {
            let renderWindow = BrowserWindow.getAllWindows().find(i => i.id === param.id);
            renderWindow.webContents.send(e, param,dispatcher);
        }
    })
});


// Event triggers when a new timer is created from the form
ipcMain.on('create-timer', (event, object) => {
    let renderWindow = new BrowserWindow({
        width: 400,
        height: 200,
        show: false,
        title: `${object.title}`
    })
    renderWindow.id = object.id;
    renderWindow.loadURL(path.join('file:///', __dirname, 'ui/timer.html'));
    renderWindow.on('ready-to-show', _ => {
        renderWindow.webContents.send('set-time', object);
    })
    ipcMain.on('timer-set', (e,id) => {
        let renderWindow = BrowserWindow.getAllWindows().find(i=>i.id === id);
        renderWindow.show();
        e.sender.send('start-timer');
        mainWindow.webContents.send('start-timer', object);
    })
    renderWindow.on('close', () => {
        renderWindow.removeAllListeners();
        renderWindow.close();
    })
    renderWindow.on('closed',()=>{
        renderWindow = null;
    })
    dialog.showMessageBox({
        title: 'All windows',
        message: `${BrowserWindow.getAllWindows().map(i=>i.id)}`
    })
});



// IPC Events to sync the timers in the formRenderer and the timerRenderer

ipcMain.on('delete-timer', (event, obj, dispatcher) => {
    Actions.fire(0, 'DELETE_TIMER', obj, dispatcher);
    let renderWindow = BrowserWindow.getAllWindows().find(i => i.id === obj.id);
    if (renderWindow) {
        renderWindow.removeAllListeners();
        renderWindow.close();
        renderWindow = null;
    }
});

ipcMain.on('pause-timer', (event, obj, dispatcher) => {
    Actions.fire(0, 'PAUSE_TIMER', obj, dispatcher);
});

ipcMain.on('play-timer', (event, obj, dispatcher) => {
    Actions.fire(0, 'RUN_TIMER', obj, dispatcher);
})

ipcMain.on('add-timer', (event, obj) => {
    Actions.fire(0, 'ADD_TIMER', obj);
})

ipcMain.on('update-timer', (event, obj) => {
    Actions.fire(0, 'UPDATE_TIMER', obj);
})


//Store timers for resuming on next session when the app is about to quit

app.on('will-quit', () => {
    let timers = Actions.fire(0, 'GET_ALL');
    let file = fs.writeFile('timers.json', JSON.stringify(timers), (err) => {
        if (err) console.log(err);
        else console.log('Written Successfully');
        app.quit();
    });
});