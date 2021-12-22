const loggerMiddleare = ( {getState, dispatch} ) => {
  return ( next ) => (action) => {
    const state = getState();
    console.log( 'client main action log:' );
    // console.log( action );
    return next( action );
  };
}

module.exports = loggerMiddleare;