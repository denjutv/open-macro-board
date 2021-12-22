import { IPC_CHANNEL } from '@shared/channel';

class IpcService {
  constructor( ) {
  }

  init( storeService ) {
    // set up ipc handler
    // handle ipc message by dispatching them to the store
    window.electron.ipcRenderer.on( IPC_CHANNEL, ( event, message ) => {
      storeService.dispatch( Object.assign( message, {event} ) );
    });
  }

  send( action ) {
    console.log("SEND");
    window.electron.ipcRenderer.send( IPC_CHANNEL, action );
  }
}

export default IpcService;