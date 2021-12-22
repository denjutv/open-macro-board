const ForewardBaseService = require('#shared/service/forewardBase');
const { BOARD_RENDERER, BOARD_MAIN, CLIENT_MAIN } = require('#shared/participantId');

class ForewardService extends ForewardBaseService{
  constructor() {
    super();

    this.ipcService = null;
    this.webserverService = null;
    this.participantId = BOARD_MAIN;
  }

  init( ipcService, webserverService ) {
    this.ipcService = ipcService;
    this.webserverService = webserverService;
  }

  foreward( action ) {
    const sendAction = this.createSendAction( action );

    if( action.lastHop != BOARD_RENDERER ) {
      this.ipcService.send( sendAction );
    }
    if( action.lastHop != CLIENT_MAIN ) {
      this.webserverService.broadcast( sendAction );
    }
  }
}

module.exports = ForewardService;