import { IPC_CHANNEL } from '@shared/channel';

const busMiddleare = ( {getState, dispatch} ) => {
  return ( next ) => (action) => {
    console.log( 'client renderer:' );
    console.log( action );
    const sendAction = {...action};
    if( sendAction.event ) {
      delete sendAction.event
    }
    window.electron.ipcRenderer.send( IPC_CHANNEL, sendAction );
    return next( action );
  };
}

module.exports = busMiddleare;