import ForewardBaseService from '@shared/service/forewardBase';
import { CLIENT_RENDERER, CLIENT_MAIN } from '@shared/participantId';

class ForewardService extends ForewardBaseService{
  constructor() {
    super();

    this.ipcService = null;
    this.participantId = CLIENT_RENDERER;
  }

  init( ipcService ) {
    this.ipcService = ipcService;
  }

  foreward( action ) {
    const sendAction = this.createSendAction( action );

    if( action.lastHop != CLIENT_MAIN ) {
      this.ipcService.send( sendAction );
    }
  }
}

export default ForewardService;