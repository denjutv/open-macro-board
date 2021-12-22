class ForewardBaseService {
  constructor() {
  }

  createSendAction( action ) {
    const sendAction = {...action};
  
    if( !sendAction.origin ) {
      sendAction.origin = this.participantId;
    }
    sendAction.lastHop = this.participantId;
  
    if( sendAction.event ) {
      delete sendAction.event;
    }
  
    return sendAction;
  }
}

module.exports = ForewardBaseService;