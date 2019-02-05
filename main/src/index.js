const { app, BrowserWindow } = require( "electron" );

let win = null;

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        transparent: false,
        webPreferences: {
            nodeIntegration: false,
            preload: __dirname + "/preload.js"
        }
    });

    win.loadURL( "http://localhost:8080" );

    win.webContents.openDevTools();

    win.on( "close", () =>
    {
        win = null;
    });
}

app.on( "ready", createWindow );

app.on( "window-all-closed", () =>
{
    if( process.platform !== "darwin" )
    {
        app.quit();
    }
});

app.on( "activate", () => {
    if( win === null ) {
        createWindow();
    }
});