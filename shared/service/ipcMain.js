const { ipcMain } = require( 'electron' );
const { IPC_CHANNEL } = require( '#shared/channel' );

class IpcService {
  constructor( ) {
    this.mainWindowWebContents = null;
  }

  init( storeService ) {
    // handle ipc message by dispatching them to the store
    ipcMain.on( IPC_CHANNEL, ( event, message ) => {
      console.log("empfangen");
      storeService.dispatch( Object.assign( message, {event} ) );
    });
  }

  send( action ) {
    console.log("SEND");
    this.mainWindowWebContents.send( IPC_CHANNEL, action );
  }
}

module.exports = IpcService;