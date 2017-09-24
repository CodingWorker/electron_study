const electron = require('electron');
const app = electron.app;
const windowManager = require('electron-window-manager');

// When the application is ready
app.on('ready', function(){
	//windowManager.init( ... );
	// Open a window
	window=windowManager.open('home', 'Welcome ...', 'http:www.baidu.com');
	
	window.openDevTool();
	
});
