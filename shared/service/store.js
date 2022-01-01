const { configureStore } = require( '@reduxjs/toolkit' );

class StoreService {
  constructor() {
  }

  init( rootReducer, middlewares, initialState = {} ) {
    this.store = configureStore({
      reducer: rootReducer,
      middleware: middlewares,
      preloadedState: initialState,
      devTools: DEBUG
    });
  }

  dispatch( action ) {
    this.store.dispatch( action );
  }
}

module.exports = StoreService;