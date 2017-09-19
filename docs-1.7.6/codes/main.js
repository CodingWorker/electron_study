//使用requir引用模块
const { app, globalShortCut } = require('electron');

app.on('window-all-closed', () => {
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