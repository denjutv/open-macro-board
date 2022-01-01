const mainActions = require('./main');
const rendererActions = require('./renderer');

module.exports = {
  ...mainActions,
  ...rendererActions
}