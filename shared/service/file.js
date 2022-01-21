const fs = require('fs').promises;

class FileService {
  constructor() {

  }

  init() {

  }

  async createDirIfNotExists( dirPth ) {
    if (!this.checkIfDirectoryExists(dirPth)){
      await this.makeDirectory( dirPth );
    }
  }

  checkIfDirectoryExists( dirPath ) {
    const fs = require('fs');
    return fs.existsSync(dirPath);
  }

  async makeDirectory( dirPth, recursive = true ) {
    fs.mkdir(dirPth, { recursive });
  }
}

module.exports = FileService;