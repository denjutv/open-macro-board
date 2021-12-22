import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import StoreService from '@shared/service/store';
import rootReducer from './reducer';
import BoardContainer from './container/board';
import forewardMiddleareCreator from '@shared/middleware/foreward';
import IpcService from '@shared/service/ipcRenderer';
import ForewardService from './service/foreward';
import { CLIENT_RENDERER_CREATED } from '@shared/actionType';

import './app.style.scss';

class App {
  constructor() {
  }

  init( contentElement ) {
    this.initServices();

    render( 
      <Provider store={this.storeService.store}>
        <BoardContainer />
      </Provider>,
      contentElement
    );

    this.storeService.dispatch( {type:CLIENT_RENDERER_CREATED} );
  }

  initServices() {
    this.storeService = new StoreService();
    this.ipcService = new IpcService();
    this.forewardService = new ForewardService();

    this.storeService.init( rootReducer, {}, [forewardMiddleareCreator(this.forewardService)] );
    this.ipcService.init( this.storeService );
    this.forewardService.init( this.ipcService );
  }
}

export default App;