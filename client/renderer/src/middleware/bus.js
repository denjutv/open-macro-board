import { IPC_CHANNEL } from '@shared/channel';

const busMiddleare = ( {getState, dispatch} ) => {
  return ( next ) => (action) => {
    console.log( 'client renderer:' );
    console.log( action );
    window.electron.ipcRenderer.send( IPC_CHANNEL, action );
    return next( action );
  };
}

module.exports = busMiddleare;