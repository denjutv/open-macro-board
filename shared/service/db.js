class DbService {
  constructor() {
    this.loki = require('lokijs');
    this.db = new this.loki();
  }

  init() {
    
  }
}

module.exports = DbService;