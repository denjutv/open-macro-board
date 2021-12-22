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

    this.websocketService.createConnection( {
      name: 'foo',
      host: '127.0.0.1',
      port: '8081'
    } );

    await this.createMainWindow();
    this.registerAllWindwosClodesHandler();
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
    const StoreService = require( '#shared/service/store' );
    const DbService = require( '#shared/service/db' );
    const IpcService = require( '#shared/service/ipcMain' );
    const WebsocketService = require( '#client/service/websocket' );
    const ForewardService = require( '#client/service/foreward' );

    this.storeService = new StoreService();
    this.dbService = new DbService();
    this.ipcService = new IpcService();
    this.websocketService = new WebsocketService();
    this.forewardService = new ForewardService();
    
    const rootReducer = require( '#client/reducer/root' );
    const forewardMiddleareCreator = require( '#shared/middleware/foreward' );
    this.storeService.init( rootReducer, {}, [forewardMiddleareCreator(this.forewardService)] );
    this.dbService.init();
    this.ipcService.init( this.storeService );
    this.websocketService.init( this.storeService );
    this.forewardService.init( this.ipcService, this.websocketService );
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