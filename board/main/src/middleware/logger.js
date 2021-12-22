const loggerMiddleare = ( {getState, dispatch} ) => {
  return ( next ) => (action) => {
    const state = getState();
    console.log( 'board main action log:' );
    logAction( action );
    return next( action );
  };
}

function logAction(action) {
  const logAction = {...action};

  if( logAction.event ) {
    logAction.event = 'event object';
  }
  console.log( logAction );
}

module.exports = loggerMiddleare;