const { app, ipcMain, BrowserWindow, electron } = require('electron');

const path = require('path');

//添加chrome和electron都支持的命令行开关，如：
//--disable-http-cache
//--js-flags=flags
//设置了这些命令行开关之后等同于
//electron --disable-http-cache --js-flags=flags
//app.commandLine.appendSwitch('debug', '--my-debug');


let mainWin = null;

//增加一个最近打开文件列表
//app.addRecentDocument('C:\Users\daiya\Downloads\hello');

app.on('ready', () => {
    mainWin = new BrowserWindow({
        show: false,
        width: 1000,
        height: 800
    });

    //设置缩略图
    mainWin.setThumbarButtons([{
            tooltip: 'button1',
            icon: path.join(__dirname, '/public/images/button1.png'),
            click: () => {
                console.log('button1 clicked');
            }
        },
        {
            tooltip: 'button2',
            icon: path.join(__dirname, '/public/images/button2.png'),
            click: () => {
                console.log('button2 clicked');
            }
        }
    ]);

    //设置窗口的进度条
    mainWin.setProgressBar(0.8);
    mainWin.loadURL('file://' + __dirname + '/html/index.html');
    mainWin.openDevTools();
    mainWin.once('ready-to-show', () => {
        mainWin.show();
    });

    mainWin.on('closed', () => {
        mainWin = null;
    });

    let onLineStatus = new BrowserWindow({
        widht: 0,
        hieght: 0,
        show: false
    });

    //process.hang();//使得当前进程的主线程挂起
    //process.noAsar = true; //设置为true可以使得asar在模块中失效
    onLineStatus.loadURL('file://' + __dirname + './html/online-status.html');

    //main进程和render进程之间通讯
    //onLineStatus.loadURL('file://' + __dirname + './html/online-status2.html');

    let testAsarWin = new BrowserWindow({
        width: 800,
        height: 600,
        backgroundColor: '#eee'
    });

    testAsarWin.loadURL('file://' + __dirname + '/html/test-asar.html');
    testAsarWin.openDevTools();
    testAsarWin.on('closed', () => {
        testAsarWin = null;
    });

});

//代码有问题
// ipc.on('online-status-changed', (event, status) => {
//     console.log(status);
// });

app.on('window-all-closed', () => {
    app.quit();
});

ipcMain.on('async-ping', (event, data) => {
    console.log(data);
    event.sender.send('pong', 'pong');
});

ipcMain.on('sync-ping', (event, data) => {
    console.log(data);
    event.returnValue = 'pong';
});