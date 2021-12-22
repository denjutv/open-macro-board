const path = require('path');
const { sassPlugin } = require('esbuild-sass-plugin');
require('dotenv').config();

const getConfig = ( baseDir ) => {
  const mode = process.env.MODE;
  const watch = process.argv.includes('--watch')

  const config = {
    entryPoints: [path.join(baseDir, 'src', 'index.js')],
    bundle: true,
    outfile: path.join(baseDir, 'dist', 'bundle.js'),
    loader: {
      '.js':'jsx'
    },
    watch,
    logLevel: 'info',
    define: {},
    tsconfig: path.join(__dirname, 'jsconfig.json'),
    plugins: [sassPlugin({type:'style'})]
  };

  if( mode == 'production' ) {
    config.minify = true;
    config.define.DEBUG = 'false';
  }
  else {
    config.sourcemap = true;
    config.define.DEBUG = 'true';
  }

  return config;
}



module.exports = getConfig;