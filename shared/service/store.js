const { createStore, applyMiddleware } = require( 'redux' );

class StoreService {
  constructor() {
  }

  init( rootReducer, initialState, middlewares ) {
    this.store = createStore( rootReducer, initialState, applyMiddleware( ...middlewares ) );
  }

  dispatch( action ) {
    this.store.dispatch( action );
  }
}

module.exports = StoreService;