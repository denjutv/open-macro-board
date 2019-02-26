import { REQUEST_BUTTON_SETTINGS } from "../action";

/**
 * Handles all events, that change the buttons.
 * 
 * @param {Object} state Current state passed by the redux store
 * @param {Object} action Current action object
 */
const buttonReducer = ( state = null, action ) =>
{
    switch( action.type )
    {
        case REQUEST_BUTTON_SETTINGS:
        break;
    }

    return state;
};

export default buttonReducer;