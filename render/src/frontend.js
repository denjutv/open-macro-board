import React from "react";
import { render } from "react-dom";
import Test from "./test";
import { requestButtonSettings } from "./action";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducer";
import buttonMiddleare from "./middleware/button";

/**
 * Main frontend class, that creates and holds the store, requests the button settings from the main process and starts the rendering.
 */
class Frontend
{
    constructor()
    {
        this.store = null;
    }

    /**
     * Initializes the frontend, by creating the store and start rendering.
     * 
     * @param {Object} contentElement - DOM element in which the frontend is rendered.
     */
    init( contentElement )
    {
        // create store
        this.store = createStore( rootReducer, applyMiddleware( buttonMiddleare ) );

        // request button settings
        this.store.dispatch( requestButtonSettings() );

        render( <Test />, contentElement );
    }
};

export default new Frontend();