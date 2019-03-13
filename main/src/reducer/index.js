const { combineReducers } = require( "redux" );
const buttonReducer = require( "./button" );

module.exports = combineReducers(
{
    buttons: buttonReducer
});