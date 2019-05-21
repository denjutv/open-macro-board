class App
{
    constructor()
    {
        const { app } = require( "electron" );
        this.app = app;
        this.isDev = false;
        this.conf = null;
        this.store = null;

        this.mainWindow = null;

        const ConnectionManager = require( "./connectionManager" );
        this.connectionManager = new ConnectionManager();
    }

    init()
    {
        this.parseAguments();

        // init config
        this.initConfig();

        // init redux store
        this.initStore();

        // create window
        this.initMainWindow();

        this.app.on( "window-all-closed", () =>
        {
            if( process.platform !== "darwin" )
            {
                this.app.quit();
            }
        });

        // init websockets
        this.initWebsockets();

        // ipc
        this.initIpc();
    }
    
    parseAguments()
    {
        if( process.argv.includes( "-dev" ) )
        {
            this.isDev = true;
            console.log( "run in dev mode" );
        }
    }

    initConfig()
    {
        const defaultConfig = require( "./defaultConfig" );
        const Configstore = require( "configstore" );
 
        // create a Configstore instance with an unique ID and default values
        this.conf = new Configstore( "open-macro-board", defaultConfig);
    }

    initStore()
    {
        const { createStore, applyMiddleware } = require( "redux" );
        const rootReducer = require( "./reducer" );
        const buttonMiddleare = require( "./middleware/redux/button" );
        const initialState = {buttons: this.conf.get("buttons")};
        this.store = createStore( rootReducer, initialState, applyMiddleware( buttonMiddleare ) );
    }

    initMainWindow()
    {
        this.mainWindow = require( "./mainWindow" );

        this.app.on( "ready", () => this.mainWindow.create( this.conf.get("display"), this.isDev ) );

        this.app.on( "activate", () => {
            if( this.mainWindow.win === null ) {
                // createWindow();
                this.mainWindow.create( this.conf.get("display"), this.isDev );
            }
        });
    }

    initIpc()
    {
        const { ipcMain } = require( "electron" );
        const { MAIN_RENDER_CHANNEL } = require( "../../shared/channel" );

        // handle ipc message by dispatching them to the store
        ipcMain.on( MAIN_RENDER_CHANNEL, ( event, message ) =>
        {
            this.store.dispatch( Object.assign( message, {event} ) );
        });
    }

    initWebsockets()
    {
        const port = this.conf.get("port");
        this.connectionManager.init( port );
    }
};

module.exports = new App();