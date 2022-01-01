const { createReducer } = require('@reduxjs/toolkit');

const buttonReducer = createReducer(null, (builder) => {
    builder.addCase( 'foo', (state, action) => {

    });
});

module.exports = buttonReducer;