const boardActions = require('./board');
const clientActions = require('./client');

module.exports = {
  ...boardActions,
  ...clientActions
}