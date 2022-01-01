import { createReducer } from '@reduxjs/toolkit';

const buttonReducer = createReducer(null, (builder) => {
    builder.addCase( 'foo', (state, action) => {

    });
});

export default buttonReducer;