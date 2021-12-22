const ForewardBaseService = require('#shared/service/forewardBase');
const { CLIENT_RENDERER, CLIENT_MAIN, BOARD_MAIN } = require('#shared/participantId');

class ForewardService extends ForewardBaseService{
  constructor() {
    super();

    this.ipcService = null;
    this.websocketService = null;
    this.participantId = CLIENT_MAIN;
  }

  init( ipcService, websocketService ) {
    this.ipcService = ipcService;
    this.websocketService = websocketService;
  }

  foreward( action ) {
    const sendAction = this.createSendAction( action );

    if( action.lastHop != CLIENT_RENDERER ) {
      this.ipcService.send( sendAction );
    }
    if( action.lastHop != BOARD_MAIN ) {
      // todo
      // this.websocketService.broadcast( sendAction );
    }
  }
}

module.exports = ForewardService;