class SettingsService {
  constructor() {
    this.settingsCollection = null;
  }

  init( dbService ) {
    this.settingsCollection = dbService.createCollection('settings', { indices: ['id'] });
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
    const {
      BOARD_WEBSERVER_DEFAULT_PORT: port,
      BOARD_ROWS: rows,
      BOARD_COLUMNS: columns,
      PIXEL_PER_MM_WIDTH: pixelPerMmWidth,
      PIXEL_PER_MM_HEIGHT: pixelPerMmHeight,
      BUTTON_WIDTH: buttonWidth,
      BUTTON_HEIGHT: buttonHeight,
      BUTTON_GAP_WIDTH: buttonGapWidth,
      BUTTON_GAP_HEIGHT: buttonGapHeight
    } = require( '#shared/defaults' );
    this.settingsCollection.insert({
      id: 1,
      port,
      board: {
        rows,
        columns
      },
      pixelPerMmWidth,
      pixelPerMmHeight,
      button: {
        width: buttonWidth,
        height: buttonHeight,
        gapWidth: buttonGapWidth,
        gapHeight: buttonGapHeight,
      }
    });
  }

  get( settingsPath, defaultValue = null ) {
    let setting = defaultValue;
    const settings = this.settingsCollection.findOne({id:1});

    try {
      setting = settingsPath.split('.').reduce( (acc, curr) => {
        return acc[curr];
      },
      settings);
    }
    catch( error ) {
      console.error( `settings ${settingsPath} could not be found` );
    }

    return setting;
  }
}

module.exports = SettingsService;