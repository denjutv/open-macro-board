import { REQUEST_BUTTON_SETTINGS } from "../action"

/**
 * Middleware that listens for REQUEST_BUTTON_SETTINGS event to pass that event via ipc to the main process.
 */
const buttonMiddleware = ( { getState, dispatch } ) =>
{
    return ( next ) => (action) => 
    {
        let result = null;

        switch( action.type )
        {
            case REQUEST_BUTTON_SETTINGS:
                window.electron.ipcRenderer.send( REQUEST_BUTTON_SETTINGS );
            break;
            default:
                result = next( action );
        }
        return result;
    };
};

export default buttonMiddleware;