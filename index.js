const electron = require('electron');
const { app, BrowserWindow, dialog, ipcMain, autoUpdater } = electron,
fs = require('fs'),
path = require('path'),
autoLaunch = require('auto-launch'),
ps = require('ps-list'),
TimerStore = require('./store/TimerStore'),
Actions = require('./actions/Actions');

// import 'electron';
// import { app, BrowserWindow, ipcMain, autoUpdater } from 'electron';
// import 'fs';
// import 'path';
// import * as autoLaunch from 'auto-launch';
// import './store/TimerStore';
// import './actions/Actions';

// const screen = electron.screen;

/* Implement code for auto launch on startup  *******************
 *      _______   _____           _____     _____    ************
 ****  |#######| /#####\          |####\   /#####\   ************
 ****     |#|   |#|   |#|  _____  |#| |#| |#|   |#|  ************
 ****     |#|   |#|   |#| |_____| |#|_|#| |#|   |#|  ************
 ****     |#|    \#####/          |####/   \#####/   ************
 ***************************************************************/

//getting apps directory for autoUpdate and also to save timers info 
const appPath = app.getAppPath();

// initializing the store for saving timers.
const store = new TimerStore();

// The main Window
let mainWindow,
checkUpdates;

/**-----------------------------------------------------------------------------------------------|
 *                              The Main Process                                                  |
 **----------------------------------------------------------------------------------------------*/

app.on('ready', _ => {
    const screen = electron.screen;
    let device_width = screen.getPrimaryDisplay().workAreaSize.width,
    device_height = screen.getPrimaryDisplay().workAreaSize.height,
    timersFile;
    
    Actions.init();
    Actions.subscribe(store);
    
    /* Read The timers.json file if exists and load timers **********
     *      _______   _____           _____     _____    ************
     ****  |#######| /#####\          |####\   /#####\   ************
     ****     |#|   |#|   |#|  _____  |#| |#| |#|   |#|  ************
     ****     |#|   |#|   |#| |_____| |#|_|#| |#|   |#|  ************
     ****     |#|    \#####/          |####/   \#####/   ************
     ***************************************************************/

    if(fs.existsSync(path.resolve(appPath,'/timers.json'))){
        checkUpdates = true;
        fs.readFile(path.resolve(appPath,'/timers.json'),(file)=>{
            timersFile = JSON.parse(file);
            // launch the main window with the stored objects.
        });
    }

    mainWindow = new BrowserWindow({
        width: 500,
        height: 650,
        x: device_width,
        y: device_height,
        resizable: true,
        fullscreenable: false,
        movable: false,
        frame: process.env.NODE_ENV === 'production' ? false : true,
    });
    mainWindow.loadURL(path.join('file:///', __dirname, './ui/index.html'));
    mainWindow.show();

    mainWindow.on('close',()=>{
        /* timerActive ? saveTimersAndClose : close          ************
         *      _______   _____           _____     _____    ************
         ****  |#######| /#####\          |####\   /#####\   ************
         ****     |#|   |#|   |#|  _____  |#| |#| |#|   |#|  ************
         ****     |#|   |#|   |#| |_____| |#|_|#| |#|   |#|  ************
         ****     |#|    \#####/          |####/   \#####/   ************
         ***************************************************************/
    })
    
    mainWindow.on('minimize',()=>{
        /* minimize to tray                                  ************
         *      _______   _____           _____     _____    ************
         ****  |#######| /#####\          |####\   /#####\   ************
         ****     |#|   |#|   |#|  _____  |#| |#| |#|   |#|  ************
         ****     |#|   |#|   |#| |_____| |#|_|#| |#|   |#|  ************
         ****     |#|    \#####/          |####/   \#####/   ************
         ***************************************************************/
    })
    
    // Event Listeners for update of timer states
    store.on('UPDATE', (e, param, dispatcher) => {
        if (dispatcher === 'timer') {
            mainWindow.webContents.send(e, param,dispatcher);
        } else {
            let renderWindow = BrowserWindow.getAllWindows().find(i => i.id === param.id);
            renderWindow.webContents.send(e, param,dispatcher);
        }
    })

    if(checkUpdates) autoUpdater.checkForUpdates();
});


// Event triggers when a new timer is created from the form
ipcMain.on('create-timer', (event, object) => {
    let renderWindow = new BrowserWindow({
        width: 400,
        height: 200,
        show: false,
        frame:false,
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
});



/**-----------------------------------------------------------------------------------------------|
 *                              The Event Handling                                                |
 **----------------------------------------------------------------------------------------------*/

// IPC Events to sync the timers in the formRenderer and the timerRenderer

ipcMain.on('delete-timer', (event, obj, dispatcher) => {
    Actions.fire(0, 'DELETE_TIMER', obj, dispatcher);
    if(dispatcher === 'timer') mainWindow.webContents.send('delete-timer',obj);
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
    let file = fs.writeFile('timers.json', JSON.stringify(timers,null,4), (err) => {
        if (err) console.log(err);
        else console.log('Written Successfully');
        app.quit();
    });
});

/**-----------------------------------------------------------------------------------------------|
 *                              Attatching To Processes                                           |                            |
 **----------------------------------------------------------------------------------------------*/


/* Provide an interface to attatch the timer to process *********
 *      _______   _____           _____     _____    ************
 ****  |#######| /#####\          |####\   /#####\   ************
 ****     |#|   |#|   |#|  _____  |#| |#| |#|   |#|  ************
 ****     |#|   |#|   |#| |_____| |#|_|#| |#|   |#|  ************
 ****     |#|    \#####/          |####/   \#####/   ************
 ***************************************************************/

ipcMain.on('get-processes',()=>{
    const procList = ps().then(dat=>{
        console.log(dat);
    })
})


/**-----------------------------------------------------------------------------------------------|
 *                              Update Related Stuff                                              |                            |
 **----------------------------------------------------------------------------------------------*/
autoUpdater.on('update-available',()=>{
    /* Display Alert to update the app                   ************
     *      _______   _____           _____     _____    ************
     ****  |#######| /#####\          |####\   /#####\   ************
     ****     |#|   |#|   |#|  _____  |#| |#| |#|   |#|  ************
     ****     |#|   |#|   |#| |_____| |#|_|#| |#|   |#|  ************
     ****     |#|    \#####/          |####/   \#####/   ************
     ***************************************************************/
})

autoUpdater.on('update-downloaded',()=>{
    /* Pause all timers, save state, quit and install, reload timers
     *      _______   _____           _____     _____    ************
     ****  |#######| /#####\          |####\   /#####\   ************
     ****     |#|   |#|   |#|  _____  |#| |#| |#|   |#|  ************
     ****     |#|   |#|   |#| |_____| |#|_|#| |#|   |#|  ************
     ****     |#|    \#####/          |####/   \#####/   ************
     ***************************************************************/
})
