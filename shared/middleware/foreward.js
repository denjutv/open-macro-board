const forewardMiddleareCreator = (forewardService) => ( {getState, dispatch} ) => {
  return ( next ) => (action) => {
    logAction(action);

    forewardService.foreward( action );
    return next( action );
  };
}

function logAction(action) {
  console.log(DEBUG);
  if( DEBUG ) {
    const logAction = {...action};
  
    if( logAction.event ) {
      logAction.event = "event object";
    }
    console.log( logAction );
  }
}

module.exports = forewardMiddleareCreator;