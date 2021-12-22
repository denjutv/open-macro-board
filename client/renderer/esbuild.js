const config = require('../../esbuild.config');

require('esbuild').build( config(__dirname) ).catch(() => process.exit(1))