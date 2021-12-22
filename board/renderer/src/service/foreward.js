import ForewardBaseService from '@shared/service/forewardBase';
import { BOARD_RENDERER, BOARD_MAIN } from '@shared/participantId';

class ForewardService extends ForewardBaseService{
  constructor() {
    super();

    this.ipcService = null;
    this.participantId = BOARD_RENDERER;
  }

  init( ipcService ) {
    this.ipcService = ipcService;
  }

  foreward( action ) {
    const sendAction = this.createSendAction( action );

    if( action.lastHop != BOARD_MAIN ) {
      this.ipcService.send( sendAction );
    }
  }
}

export default ForewardService;