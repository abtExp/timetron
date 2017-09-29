const electron = require('electron'),
    { app, BrowserWindow, dialog, ipcMain, autoUpdater } = electron,
    TimerStore = require('./store/TimerStore'),
    path = require('path'),
    autoLaunch = require('auto-launch'),
    Actions = require('./actions/Actions'),
    store = new TimerStore();


/* Update and other stuff goes here  ***************************
 *       ______  _____           _____     _____    ************
 ****   /#####/ /#####\   _____  |####\   /#####\   ************
 ****     |#|  |##| |##| |_____| |#|_|#| |##| |##|  ************
 ****     |#|   \#####/          |####/   \#####/   ************
 ***************************************************************/


let mainWindow;
app.on('ready', _ => {
    Actions.init();
    Actions.subscribe(store);

    const screen = electron.screen;
    let device_width = screen.getPrimaryDisplay().workAreaSize.width,
        device_height = screen.getPrimaryDisplay().workAreaSize.height;

    mainWindow = new BrowserWindow({
        width: 500,
        height: 600,
        x: device_width - this.width,
        y: device_height - this.height,
        resizable: true,
        // fullscreenable : false,
        movable: true,
        frame: false,
    });
    mainWindow.loadURL(path.join('file:///', __dirname, './ui/index.html'));
    mainWindow.webContents.openDevTools();
    mainWindow.show();

    store.on('UPDATE', (id) => {
        let window = BrowserWindow.getAllWindows().find(i => i.id === id),
            timer = store.state.find(i => i.id === id);
        window.webContents.send('update-timer', timer);
    })
    store.on('UPDATE_ALL', (obj) => {
        mainWindow.webContents.send('update-state', obj);
    })
});

ipcMain.on('create-timer', (event, object) => {
    Actions.fire(0, 'ADD_TIMER', object);
    let window = new BrowserWindow({
        width: 200,
        height: 200,
        title: `Timer${store.state.length}`
    })
    window.loadURL(path.join('file:///', __dirname, 'ui/timer.html'));
    window.on('ready-to-show', _ => {
        window.webContents.send('set-time', obj);
    })
    ipc.on('timer-set', _ => {
        window.show();
    })
});

ipcMain.on('delete-timer', (event, id) => {
    Actions.fire('DELETE_TIMER', id);
    let window = BrowserWindow.getAllWindows().find(i => i.id === id);
    window.close();
    window = null;
});

ipcMain.on('pause-timer', (event, id) => {
    Actions.fire('PAUSE_TIMER', id);
});

ipcMain.on('play-timer', (event, id) => {
    Actions.fire('PLAY_TIMER', id);
})

ipcMain.on('update-timer', (event, id) => {
    Actions.fire('UPDATE_TIMER', id);
})