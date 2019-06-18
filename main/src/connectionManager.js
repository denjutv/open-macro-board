class ConnectionManager
{
    constructor()
    {
        this.sockets = [];

        this.expressApp = null;
        this.httpServer = null;
    }

    init( port, dispatch )
    {
        this.expressApp = require( "express" )();
        this.httpServer = require( "http" ).Server( this.expressApp );
        const io = require( "socket.io" )( this.httpServer );

        // test route
        this.expressApp.get( "/", ( req, res ) =>
        {
            res.send( "open macro board" );
        });

        io.on( "connection", (socket) =>
        {
            console.log( "a user connected" );
            this.sockets.push( socket );

            socket.on( "disconnect", () =>
            {
                const index = this.sockets.indexOf( socket );
                console.log( "a user disconnected", index );
                this.sockets.splice( index, 1 );
            });

            socket.on( "action", ( action ) =>
            {
                dispatch( action );
            });
        });

        this.httpServer.listen( port, () =>
        {
            console.log( "server is listening on port " + port );
        });
    }

    // todo: check if io sockets dont create thread unsafety!!!
    broadcast( action )
    {
        const connectionCount = this.sockets.length;

        for( let socketIndex=0; socketIndex < connectionCount; ++socketIndex )
        {
            const socket = this.sockets[socketIndex];
            socket.emit("action", action);
        }
    }
}

module.exports = ConnectionManager;