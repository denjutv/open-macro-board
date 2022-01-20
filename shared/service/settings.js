class SettingsService {
  constructor() {
    this.settingsCollection = null;
    this.settings = null;
  }

  init( dbService ) {
    const settingsCollectionName = 'settings';
    this.settingsCollection = dbService.getCollection( settingsCollectionName );
    if( !this.settingsCollection ) {
      console.log('add settings collection');
      this.settingsCollection = dbService.addCollection( settingsCollectionName, { indices: ['id'] }  );
    }
    this.insertDefaultSettingsOnEmptySettings();
  }

  insertDefaultSettingsOnEmptySettings() {
    if( this.isSettingsCollectionEmpty() ) {
      this.insertDefaultSettings();
    }
  }

  isSettingsCollectionEmpty() {
    return this.settingsCollection.find().length == 0;
  }

  insertDefaultSettings() {
    console.log('create default settings');
    const {BOARD_WEBSERVER_DEFAULT_PORT: port} = require( '#shared/defaults' );
    this.settingsCollection.insert({
      id: 1,
      port
    });
  }
}

module.exports = SettingsService;