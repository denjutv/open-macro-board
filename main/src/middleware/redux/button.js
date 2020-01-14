const { REQUEST_BUTTON_SETTINGS, BUTTON_PRESSED, deliverButtonSettings } = require( "../../action" );
const { MAIN_RENDER_CHANNEL } = require( "../../../../shared/channel" );
const {  BUTTONS_UPDATE } = require( "../../../../shared/actionType" );
const app = require( "../../app" );

/**
 * Middleware that listens for REQUEST_BUTTON_SETTINGS event to pass that event via ipc to the main process.
 */
const buttonMiddleware = ( { getState, dispatch } ) =>
{
    return ( next ) => (action) => 
    {
        let result = null;
        const state = getState();

        switch( action.type )
        {
            case REQUEST_BUTTON_SETTINGS:
                action.event.sender.send( MAIN_RENDER_CHANNEL, deliverButtonSettings( state.buttons ) );
            break;
            case BUTTON_PRESSED:
                if( state.buttons[action.buttonIndex] && state.buttons[action.buttonIndex].macroType === "httpRequest" )
                {
                    sendRequest( state.buttons[action.buttonIndex].macro );
                }
                else {
                    app.connectionManager.broadcast( {type: BUTTON_PRESSED, buttonIndex: action.buttonIndex } );
                }
            break;
            // store button settings in config and send it to the render process
            case BUTTONS_UPDATE:
                app.conf.set( "buttons", action.buttons );
                
                app.mainWindow.getSender().send( MAIN_RENDER_CHANNEL, deliverButtonSettings( action.buttons ) );
            break;
            default:
                result = next( action );
        }
        return result;
    };
};

async function sendRequest( macro )
{
    const axios = require( "axios" );
    let response = null;
    const data = macro.body === "plain" ? macro.plainBody : buildQueryString( macro.argument );
    const config = {};

    console.log(macro);

    if( macro.header && macro.header.length )
    {
        config.headers = buildHeaderObj( macro.header );
    }

    switch( macro.method )
    {
        case "get":
            response = await axios.get( macro.url, config );
            break;
        case "post":
            response = await axios.post( macro.url, data, config );
            break;
        case "put":
            response = await axios.put( macro.url, data, config );
            break;
        case "delete":
            response = await axios.delete( macro.url, config );
            break;
    }

    console.log(response);
}

function buildQueryString( argumentList )
{
    const queryParts = [];

    argumentList.forEach( argument =>
    {
        if( argument.checked )
        {
            queryParts.push( argument.key + "=" + argument.value );
        }
    });

    return "?" + queryParts.join("&");
}

function buildHeaderObj( headerList )
{
    const headerObj = {};

    headerList.forEach( header =>
    {
        if( header.checked )
        {
            headerObj[ header.key ] = header.value;
        }   
    });

    return headerObj;
}

module.exports = buttonMiddleware;