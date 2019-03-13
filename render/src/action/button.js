import { REQUEST_BUTTON_SETTINGS, DELIVER_BUTTON_SETTINGS, BUTTON_PRESSED } from "../../../shared/actionType";
export { REQUEST_BUTTON_SETTINGS, DELIVER_BUTTON_SETTINGS, BUTTON_PRESSED };

/**
 * Action creator method for the REQUEST_BUTTON_SETTINGS action. This action is used to tell the main process, via
 * the {@link buttonMiddleware}, to send the button setings to the render process.
 */
export const requestButtonSettings = () =>
{
    return {
        type: REQUEST_BUTTON_SETTINGS
    };
};


export const buttonPressed = buttonIndex =>
{
    return {
        type: BUTTON_PRESSED,
        buttonIndex
    }
}