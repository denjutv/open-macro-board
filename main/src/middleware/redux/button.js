const { REQUEST_BUTTON_SETTINGS, BUTTON_PRESSED, deliverButtonSettings } = require( "../../action" );
const { MAIN_RENDER_CHANNEL } = require( "../../../../shared/channel" );
const app = require( "../../app" );

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
                action.event.sender.send( MAIN_RENDER_CHANNEL, deliverButtonSettings( getState().buttons ) );
            break;
            case BUTTON_PRESSED:
                app.connectionManager.broadcast( {type: BUTTON_PRESSED, buttonIndex: action.buttonIndex } );
            break;
            default:
                result = next( action );
        }
        return result;
    };
};

module.exports = buttonMiddleware;