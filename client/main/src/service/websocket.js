const openSocket = require( 'socket.io-client' );

class WebsocketService {
  constructor( storeService ) {
    this.connections = new Map();
    this.config = null;

    this.storeService = null;
  }

  init( storeService ) {
    this.storeService = storeService;
  }

  getConnectionByName( name )  {
    let connection = null;

    if( this.existsConnectionByName( name ) ) {
      connection = this.connections.get(name);
    }

    return connection;
  }

  existsConnectionBySocket( host, port ) {
    let exists = false;

    for( const [connectionName, connection] of this.connections.entries()) {
      if( connection.connectionData.host.replace('localhost', '127.0.0.1') === host.replace('localhost', '127.0.0.1')
      && connection.connectionData.port === port ) {
        exists = true;
        break;
      }
    }
    
    return exists;
  }

  existsConnectionByName( name ) {
    return this.connections.has( name );
  }

  createConnection( connectionData, buttons, sender ) {
    console.log(connectionData);
    let socket = openSocket( `http://${connectionData.host}:${connectionData.port}` );

    socket.on( 'action', ( action ) => {
      this.storeService.dispatch( Object.assign( action, {connectionName: connectionData.name }) );
    });

    socket.on( 'connect', ( ) => {
      console.log( 'connected' );
      // const { connected, updateButtons } = require( './action/' );

      // // dispatch connection state to the frontend process
      // this.storeService.dispatch( connected( connectionData, sender ) );

      // // after connecting send button config to board
      // this.storeService.dispatch( updateButtons( connectionData.name, buttons ) );
    });

    socket.on( 'disconnect', () => {
      // const { CONNECTION_DISCONNECTED } = require( '../../shared/actionType' );

      // console.log( 'disconnected' );
      // let action = {};
      // action.type = CONNECTION_DISCONNECTED;
      // action.currentConnection = Object.assign( {}, connectionData );
      // action.sender = sender;
      // this.storeService.dispatch( action );
    });

    return socket;
  }
}

module.exports = WebsocketService;