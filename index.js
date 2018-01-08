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
    store.on('UPDATE', (e, param) => {
        let window = BrowserWindow.getAllWindows().find(i => i.id === param.id);
        window.webContents.send(e, param);
        mainWindow.webContents.send(e, param);
    })
});


// Event triggers when a new timer is created from the form
ipcMain.on('create-timer', (event, object) => {
    let window = new BrowserWindow({
        width: 400,
        height: 200,
        show: false,
        title: `${object.title}`
    })
    window.id = object.id;
    window.loadURL(path.join('file:///', __dirname, 'ui/timer.html'));
    window.on('ready-to-show', _ => {
        window.webContents.send('set-time', object);
    })
    ipcMain.on('timer-set', (e) => {
        window.show();
        e.sender.send('start-timer');
        mainWindow.webContents.send('start-timer', object);
    })
    window.on('close', () => {
        window.removeAllListeners();
        window = null;
    })
});



// IPC Events to sync the timers in the formRenderer and the timerRenderer

ipcMain.on('delete-timer', (event, obj) => {
    Actions.fire(0, 'DELETE_TIMER', obj);
    let window = BrowserWindow.getAllWindows().find(i => i.id === obj.id);
    if (window) {
        window.close();
        window.removeAllListeners();
        window = null;
    }
});

ipcMain.on('pause-timer', (event, obj) => {
    Actions.fire(0, 'PAUSE_TIMER', obj);
});

ipcMain.on('run-timer', (event, obj) => {
    Actions.fire(0, 'RUN_TIMER', obj);
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