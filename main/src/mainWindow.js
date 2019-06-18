class MainWindow
{
    constructor()
    {
        this.win = null;
    }

    create( displaySettings, isDev )
    {
        const { BrowserWindow } = require( "electron" );

        this.win = new BrowserWindow({
            width: displaySettings.width,
            height: displaySettings.height,
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
            const mainWindow = this;

            // find free port
            const portfinder = require( "portfinder" );
            return portfinder.getPortPromise()
            .then( ( port ) =>
            {
                console.log( "dev server will be startet on port " + port );
                const path = require( "path" );
                const webpackConfig = require( path.join( __dirname, "..", "..", "render", "webpack.config.js" ) );
                webpackConfig.entry.push( "webpack-dev-server/client?http://localhost:" + port );
                
                const webpack = require( "webpack" );
                const compiler = webpack( webpackConfig );

                const WebpackDevServer = require( "webpack-dev-server" );
                const devServerOptions =
                {
                    host: "localhost",
                    publicPath: webpackConfig.output.publicPath,
                    filename: webpackConfig.output.filename,
                    port,
                    inline: true
                };
                const server = new WebpackDevServer( compiler, devServerOptions );

                const util = require( "util" );
                const serverListenAsync = util.promisify( server.listen.bind(server) );

                serverListenAsync( port, "localhost" )
                .then( () =>
                {
                    mainWindow.win.loadURL( "http://localhost:" + port );
                    mainWindow.win.webContents.openDevTools();
                });
            })
            .catch( ( error ) =>
            {
                console.log( "Could not start render", error );
            });
        }
    
        this.win.on( "close", () =>
        {
            this.win = null;
        });
    }

    getSender()
    {
        return this.win.webContents;
    }
};

module.exports = new MainWindow();