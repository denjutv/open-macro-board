const { REQUEST_BUTTON_SETTINGS, BUTTON_PRESSED } = require( "../../../shared/actionType" );

const DELIVER_BUTTON_SETTINGS = "DELIVER_BUTTON_SETTINGS";

module.exports =
{
    REQUEST_BUTTON_SETTINGS,
    BUTTON_PRESSED,
    
    DELIVER_BUTTON_SETTINGS,

    deliverButtonSettings: ( buttons ) =>
    {
        return {
            type: DELIVER_BUTTON_SETTINGS,
            buttons
        };
    }
};