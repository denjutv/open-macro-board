class App
{
    constructor()
    {
        const { app } = require( "electron" );
        this.app = app;
        this.isDev = false;
    }

    init()
    {
        const mainWindow = require( "./mainWindow" );

        this.parseAguments();

        this.app.on( "ready", () => mainWindow.create( this.isDev ) );

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