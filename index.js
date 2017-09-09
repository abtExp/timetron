const { app, BrowserWindow, dialog, ipcMain, autoUpdater } = require('electron'),
    TimerStore = require('./store/TimerStore'),
    path = require('path'),
    Actions = require('./actions/Actions');
    // require('electron-reload')(__dirname);
//do stuff for updating and other under the hood stuff.

let store, mainWindow, windows=0;

app.on('ready', () => {
    store = new TimerStore();
    Actions.init();
    Actions.subscribe(store);
    const screen = require('electron').screen;
    let Width = screen.getPrimaryDisplay().workArea.width,
        Height = screen.getPrimaryDisplay().workArea.height;

    mainWindow = new BrowserWindow({
        width: 500,
        height: 800,
        x: Width - 200,
        y: Height - 100
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
    windows++;
    Actions.fire(0, 'ADD_TIMER', object);
    let window = new BrowserWindow({
        width : 200,
        height : 200,
        title : `Timer${store.state.length}`
    })
    dialog.showMessageBox({
        title : 'ids',
        message : `${BrowserWindow.getAllWindows().map(i=>i.id)}`
    })
    window.id = windows;
    window.loadURL(path.join('file:///',__dirname,'./ui/timer.html'));
    window.on('ready-to-show',()=>{
        window.webContents.send('set-time',object);
    })
    ipcMain.on('timer-set',()=>{
        window.show();
    })
});

ipcMain.on('delete-timer', (event, id) => {
    Actions.fire('DELETE_TIMER',id);
    let window = BrowserWindow.getAllWindows().find(i=>i.id === id);
    window.close();
    window = null;
});

ipcMain.on('pause-timer', (event, id) => {
    Actions.fire('PAUSE_TIMER',id);
});

ipcMain.on('play-timer',(event, id)=>{
    Actions.fire('PLAY_TIMER',id);
})