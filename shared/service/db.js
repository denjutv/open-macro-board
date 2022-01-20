const fs = require( 'fs' );
const path = require( 'path' );

class DbService {
  constructor() {
    this.loki = require('lokijs');
  }

  async init( fileService, dbDirectory ) {
    await fileService.createDirIfNotExists(dbDirectory);
    await new Promise( (resolve,reject) => {
      this.db = new this.loki( path.join(dbDirectory, 'database.json'), {
        autoload: true,
        autoloadCallback: () => resolve(),
        autosave: true, 
        autosaveInterval: 4000
      });
    });
  }

  addCollection( name, options ) {
    return this.db.addCollection(name, options);
  }

  getCollection( name ) {
    return this.db.getCollection( name );
  }
}

module.exports = DbService;