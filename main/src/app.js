class App
{
    constructor()
    {
        const { app } = require( "electron" );
        this.app = app;
        this.isDev = false;
        this.conf = null;
        this.store = null;
    }

    init()
    {
        // init config
        const defaultConfig = require( "./defaultConfig" );
        const Configstore = require( "configstore" );
 
        // create a Configstore instance with an unique ID and default values
        this.conf = new Configstore( "open-macro-board", defaultConfig);

        // init redux store
        const { createStore, applyMiddleware } = require( "redux" );
        const rootReducer = require( "./reducer" );
        const buttonMiddleare = require( "./middleware/redux/button" );
        const initialState = {buttons: this.conf.get("buttons")};
        this.store = createStore( rootReducer, initialState, applyMiddleware( buttonMiddleare ) );


        // create window
        const mainWindow = require( "./mainWindow" );

        this.parseAguments();

        this.app.on( "ready", () => mainWindow.create( this.conf.get("display"), this.isDev ) );

        this.app.on( "window-all-closed", () =>
        {
            if( process.platform !== "darwin" )
            {
                this.app.quit();
            }
        });

        this.app.on( "activate", () => {
            if( mainWindow.win === null ) {
                createWindow();
            }
        });

        // ipc
        const { ipcMain } = require( "electron" );
        const { MAIN_RENDER_CHANNEL } = require( "../../shared/channel" );
        const { REQUEST_BUTTON_SETTINGS } = require( "../../shared/actionType" );

        // handle ipc message by dispatching them to the store
        ipcMain.on( MAIN_RENDER_CHANNEL, ( event, message ) =>
        {
            this.store.dispatch( Object.assign( message, {event} ) );
        });
    }

    parseAguments()
    {
        if( process.argv.includes( "-dev" ) )
        {
            this.isDev = true;
            console.log( "run in dev mode" );
        }
    }
};

module.exports = new App();