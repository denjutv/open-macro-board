import { REQUEST_BUTTON_SETTINGS, BUTTON_PRESSED } from "../action"
import { MAIN_RENDER_CHANNEL } from "../../../shared/channel";

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
            case BUTTON_PRESSED:
                window.electron.ipcRenderer.send( MAIN_RENDER_CHANNEL, action );
            break;
            default:
                result = next( action );
        }
        return result;
    };
};

export default buttonMiddleware;