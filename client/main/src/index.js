const app = require('./app');

global.DEBUG = process.env.MODE == 'development';

app.init();