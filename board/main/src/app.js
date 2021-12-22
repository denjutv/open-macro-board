const {app,BrowserWindow} = require('electron' );
const path = require( 'path' );
require('dotenv').config();

class App {
  constructor() {
    this.app = app;
    this.mainWindow = null;

    this.storeService = null;
  }

  async init() {
    await this.waitUntilAppIsReady();

    this.initServices();

    await this.createMainWindow();
    this.registerAllWindwosClodesHandler();

    // setTimeout( () => {
    //   this.ipcService.send({fi:'fu', type:'test', lastHop: 'BOARD_MAIN'});
    // }, 5000);
  }

  waitUntilAppIsReady() {
    return new Promise( (resolve,reject) => {
      this.app.on( 'ready', () => {
        console.log('app is ready');
        resolve();
       });
    });
  }

  initServices() {
    const StoreService = require('#shared/service/store');
    const DbService = require('#shared/service/db');
    const WebserverService = require('#board/service/webserver');
    const IpcService = require( '#shared/service/ipcMain' );
    const ForewardService = require( '#board/service/foreward' );

    this.storeService = new StoreService();
    this.dbService = new DbService();
    this.webserverService = new WebserverService();
    this.ipcService = new IpcService();
    this.forewardService = new ForewardService();
    
    const rootReducer = require( '#board/reducer/root' );
    const forewardMiddleareCreator = require( '#shared/middleware/foreward' );
    this.storeService.init( rootReducer, {}, [forewardMiddleareCreator(this.forewardService)] );
    this.dbService.init();
    this.webserverService.init( '8081', this.storeService );
    this.ipcService.init( this.storeService );
    this.forewardService.init( this.ipcService, this.webserverService );
  }

  createMainWindow() {
    return new Promise( (resolve,reject) => {
      try {
        this.app.on('browser-window-created', () => {
          resolve();
        });

        this.mainWindow = new BrowserWindow({
          fullscreen: true,
          transparent: false,
          webPreferences: {
            nodeIntegration: false,
            contextIsolation: false,
            preload: __dirname + '/preload.js'
          }
        });

        this.mainWindow.loadFile( path.join( __dirname, '..', '..', 'renderer', 'src', 'index.html' ) );

        if( process.env.MODE == 'development' ) {
          this.mainWindow.webContents.openDevTools();
        }

        this.ipcService.mainWindowWebContents = this.mainWindow.webContents;
      }
      catch(error) {
        reject(error);
      }
    });
  }

  registerAllWindwosClodesHandler() {
    this.app.on( 'window-all-closed', () => {
      if( process.platform !== 'darwin' ) {
          this.app.quit();
      }
    });
  }
}

module.exports = new App();