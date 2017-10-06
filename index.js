// Imports
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

// The Dashboard Window
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
    mainWindow.show();
    
    // Event Listeners for update of timer states
    store.on('UPDATE', (param) => {
        dialog.showMessageBox({
            title : `Checking for`,
            message : `${param}`
        })
        if(typeof param === 'Number') timer = store.state.find(i => i.id === id);
        else timer = param;
        let window = BrowserWindow.getAllWindows();//.find(i=>i.id === id),
        // window.webContents.send('update-timer', timer);
        dialog.showMessageBox({
            title : `Available windows`,
            message : `${window.map(i=>i.id)}`
        })
        mainWindow.webContents.send('update-timer',timer);
    })
    
});

ipcMain.on('create-timer', (event, object) => {
    Actions.fire(0, 'ADD_TIMER', object);
    let window = new BrowserWindow({
        width: 200,
        height: 200,
        show : false,
        title: `${object.title}`
    })
    window.id = object.id;
    window.loadURL(path.join('file:///', __dirname, 'ui/timer.html'));
    window.on('ready-to-show', _ => {
        window.webContents.send('set-time', object);
    })
    ipcMain.on('timer-set', (e,o) => {
        window.show();
        e.sender.send('start-timer',object);
        mainWindow.webContents.send('start-timer',object.id);
    })
    ipcMain.on('abort',(e,o)=>{
        //TODO
    })
    window.on('close',()=>{
        window.removeAllListeners();
        window = null;
    })
});



//Actions fired by timers local stores to update the global store

ipcMain.on('delete-timer', (event, obj) => {
    Actions.fire('DELETE_TIMER', obj.id);
    let window = BrowserWindow.getAllWindows().find(i => i.id === obj.id);
    if(window) window.close();
    window = null;
});

ipcMain.on('pause-timer', (event, obj) => {
    Actions.fire('PAUSE_TIMER', obj);
});

ipcMain.on('play-timer', (event, obj) => {
    Actions.fire('PLAY_TIMER', obj);
})

ipcMain.on('add-timer',(event,obj)=>{
    Actions.fire('ADD_TIMER',obj)
})