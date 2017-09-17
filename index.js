const electron = require('electron'),
    path = require('path'),
    app = electron.app,
    BrowserWindow = electron.BrowserWindow,
    dialog = electron.dialog,
    ipc = electron.ipcMain,
    Actions = require('./actions/Actions'),
    TimerStore = require('./store/TimerStore'),
    store = new TimerStore();


app.on('ready', _ => {
    Actions.init();
    Actions.subscribe(store);

    const screen = electron.screen;
    let device_width = screen.getPrimaryDisplay().workAreaSize.width,
        device_height = screen.getPrimaryDisplay().workAreaSize.height;

    window = new BrowserWindow({
        width: 500,
        height: 600,
        x: device_width - this.width,
        y: device_height - this.height,
        resizable: true,
        // fullscreenable : false,
        movable: true,
        backgroundColor: '#008382'
    });
    window.loadURL(path.join('file:///', __dirname, 'ui/index.html'));
    window.show();
    window.webContents.openDevTools();
})

ipc.on('create-timer', (event, obj) => {
    let timer = new BrowserWindow({
        width: 500,
        height: 400,
        // frame : false,
        // resizable : false,
        // movable : true,
        // fullscreenable : false,
        show: false
    })
    timer.loadURL(path.join('file:///', __dirname, 'ui/timer.html'));
    timer.on('ready-to-show', _ => {
        timer.webContents.send('set-time', obj);
    })
    ipc.on('timer-set', _ => {
        timer.show();
    })
})

ipc.on('delete-timer', (e, id) => {
    let t = BrowserWindow.getAllWindows();
    t.map(i => {
        if (i.id === id + 2) {
            i.close();
        }
    })
    e.sender.send('closing');
})

app.on('windows-all-closed', () => { app.quit(); });