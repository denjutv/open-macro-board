import { REQUEST_BUTTON_SETTINGS, DELIVER_BUTTON_SETTINGS } from "../../../shared/actionType";
export { REQUEST_BUTTON_SETTINGS };

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