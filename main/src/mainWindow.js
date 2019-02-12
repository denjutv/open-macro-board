class MainWindow
{
    constructor()
    {
        this.win = null;
    }

    create( isDev )
    {
        const { BrowserWindow } = require( "electron" );

        this.win = new BrowserWindow({
            width: 800,
            height: 600,
            transparent: false,
            webPreferences: {
                nodeIntegration: false,
                preload: __dirname + "/preload.js"
            }
        });
    
        if( !isDev )
        {
            const path = require( "path" );
            this.win.loadFile( path.join( __dirname, "..", "..", "render", "dist", "index.html" ) );
        }
        else
        {
            this.win.loadURL( "http://localhost:8080" );
        }
    
        this.win.webContents.openDevTools();
    
        this.win.on( "close", () =>
        {
            this.win = null;
        });
    }
};

module.exports = new MainWindow();