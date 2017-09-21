//使用requir引用模块
const { app, BrowserWindow, globalShortCut } = require('electron');

var mainWindow = null; //声明一个全局的mainWindow


//注册监听ready事件
// 初始化并准备创建主窗口
app.on('ready', function() {
    // 创建一个宽800px 高700px的窗口
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 1000,
        show: false,
        backgroundColor: '#2e2c29' //设置背景色
    });

    //使用渲染进程完成渲染后触发ready-to-show事件，可以控制窗口的显示
    // mainWindow = new BrowserWindow({ show: false })
    // win.once('ready-to-show', () => {
    //     win.show()
    // })

    // 载入应用的inde.html
    mainWindow.loadURL('file://' + __dirname + '/html/index.html');
    mainWindow.once('ready-to-show', function() { //once表示仅仅注册一次监听事件
        mainWindow.show(); //如果放在childWin.show一起则会与其一起打开窗口，如果某个页面加载特别耗时的话会出现等待一段时间后打开创窗口
    });

    // 打开开发工具界面
    mainWindow.openDevTools();
    // 窗口关闭时触发
    mainWindow.on('closed', function() {
        // 想要取消窗口对象的引用， 如果你的应用支持多窗口，你需要将所有的窗口对象存储到一个数组中，然后在这里删除相对应的元素
        mainWindow = null;
    });

    /*child window */
    let childWin = new BrowserWindow({
        parent: mainWindow, //设置子窗口所属的父窗口
        show: false,
        backgroundColor: '#acd'
    });
    childWin.loadURL('http://github.com');
    childWin.once('ready-to-show', () => {
        childWin.show();
    });
    // childWin.openDevTools(); //打开开发者工具

    childWin.on('closed', () => {
        childWin = null;
    });

    /**modal窗口 */
    let modalWin = new BrowserWindow({
        parent: mainWindow, //设置父窗口
        modal: true, //设置为modal窗口
        show: false,
        backgroundColor: '#123',
        width: 800,
        height: 500,
    });
    modalWin.loadURL('http://www.baidu.com');
    modalWin.once('ready-to-show', () => {
        modalWin.show();
    });
    modalWin.openDevTools();
    modalWin.on('closed', () => {
        modalWin = null;
    });
});

//注册监听window-all-closed事件
app.on('window-all-closed', () => {
    mainWindow = null;
    app.quit();
});


//注册监听certificate-error事件
app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
    if (url === 'https://github.com') {
        // Verification logic.
        event.preventDefault() //阻止默认行为
        callback(true)
    } else {
        callback(false)
    }
});


//客户端认证事件
app.on('select-client-certificate', (event, webContents, url, list, callback) => {
    event.preventDefault(); //阻止默认行为
    callback(list[0])
});

//登录事件
app.on('login', (event, webContents, request, authInfo, callback) => {
    event.preventDefault(); //阻止默认行为
    callback('username', 'secret')
});