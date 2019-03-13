const { REQUEST_BUTTON_SETTINGS } = require( "../../../shared/actionType" );

const DELIVER_BUTTON_SETTINGS = "DELIVER_BUTTON_SETTINGS";

module.exports =
{
    REQUEST_BUTTON_SETTINGS,
    DELIVER_BUTTON_SETTINGS,

    deliverButtonSettings: ( buttons ) =>
    {
        return {
            type: DELIVER_BUTTON_SETTINGS,
            buttons
        };
    }
};