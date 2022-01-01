const { createAction } = require('@reduxjs/toolkit');

module.exports = {
  clientRendererCreated: createAction('client/renderer/created')
}